function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var apiKey = 'sk_test_gB30dUn4Pt400rUS5kUZdmIe', //dmc
// var apiKey = 'sk_test_xaZRvEHFCl281amx2IVUXprw00b75WdJFD', //ss
// var apiKey = 'sk_live_jUNPotGvf3V1nrSNaRhCkAF300Zoo1Ck8f', //ss
    userEmail,
    baseUrl = "https://api.stripe.com",
    addNewCard = false


firebase.auth().onAuthStateChanged(function(user){
    if(user){
        userEmail = user.email
        
        
        var payButton = $("#submit-payment-button")
        payButton.unbind("click")

        if(getParameterByName("purchaseType") === "upgradeToPlus"){
            payButton.text("Pay 9.99€/month")
        }

        else if(getParameterByName("purchaseType") === "upgradeToPremium"){
            payButton.text("Pay 12.99€/month")
        }

        else if(getParameterByName("plan") === "free" && getParameterByName("purchaseType") === "newPost"){
            payButton.text("Pay 5€/post")
        }

        else if(getParameterByName("plan") === "free" && getParameterByName("purchaseType") === "extendPost"){
            payButton.text("Pay 5€/ext 1w")
        }

        else if(getParameterByName("plan") === "free" && getParameterByName("purchaseType") === "unlimitPost"){
            payButton.text("Pay 25€/unlimit")
        }

        

        //Check if we already have the client's customer object, if yes, we use the default card so the client doesnt need to type again their info
        CheckIfCustomerObjectExists(userEmail).then(function(res) {
            var isExist = false,    
                existCustomerId,
                defaultSourceCard,
                existSubscriptions
            res.data.data.every(function(customer){
                if(customer.email === userEmail){

                    isExist = true
                    existCustomerId = customer.id
                    defaultSourceCard = customer.sources.data[0]
                    existSubscriptions = customer.subscriptions.data
                    return false
                }

                return true
            })

            if(isExist){
                $("#billing-information").removeClass("billing-information-disable")
                $("#billing-information").addClass("billing-information-disable")

                $("#client-old-billing-information").removeClass("client-old-billing-information-disable")

                $("#card-type").text(defaultSourceCard.brand)
                $("#4-end-digits").text(defaultSourceCard.last4)
                $("#exp-date").text(defaultSourceCard["exp_month"] + "/" + defaultSourceCard["exp_year"])

                payButton.click({plan: getParameterByName("plan"), 
                                purchaseType: getParameterByName("purchaseType"), 
                                userEmail: userEmail, 
                                postId: getParameterByName("postId"),
                                sourceId: defaultSourceCard.id,
                                existCustomerId: existCustomerId,
                                existSubscriptions: existSubscriptions}, MakePaymentBasedOnExistingCard)
            }

            else{
                payButton.click({plan: getParameterByName("plan"), 
                                purchaseType: getParameterByName("purchaseType"), 
                                userEmail: userEmail, 
                                postId: getParameterByName("postId")}, HandleTokenization)
            }
        })


        
    }
    else{
        window.location = '/company-login/c-sign-in-up.html'
    }
})


function ChooseOtherCard(){

    $("#billing-information").removeClass("billing-information-disable")

    $("#client-old-billing-information").removeClass("client-old-billing-information-disable")
    $("#client-old-billing-information").addClass("client-old-billing-information-disable")

    $("#submit-payment-button").unbind("click")
    $("#submit-payment-button").click({plan: getParameterByName("plan"), 
                                        purchaseType: getParameterByName("purchaseType"), 
                                        userEmail: userEmail, 
                                        postId: getParameterByName("postId")}, HandleTokenization)
}

//Create a Stripe client
var stripe = Stripe("pk_test_UQjzREIEOo5SRHBuU4I50ndd")

// Create an instance of Elements.
var elements = stripe.elements();

// Custom styling can be passed to options when creating an Element.
var style = {
    base: {
      // Add your base input styles here. For example:
      fontSize: '16px',
      color: "#32325d",
    }
  };
  
  // Create an instance of the card Element.
var card = elements.create('card', {style: style});

// Add an instance of the card Element into the `card-element` <div>.
card.mount('#card-element');

card.addEventListener('change', function(event) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
        displayError.textContent = event.error.message;
    } else {
        displayError.textContent = '';
    }
});


function MakePaymentBasedOnExistingCard(event){
    if(event.data.purchaseType==="upgradeToPlus")
        SubscribeCustomer(event.data.existSubscriptions, event.data.existCustomerId, event.data.purchaseType, event.data.userEmail)

    else if(event.data.purchaseType==="upgradeToPremium")
        SubscribeCustomer(event.data.existSubscriptions, event.data.existCustomerId, event.data.purchaseType, event.data.userEmail)

    else if(event.data.plan === "free" && event.data.purchaseType==="newPost")
        ChargeCustomer(event.data.existSubscriptions, event.data.existCustomerId, event.sourceId, event.data.purchaseType, event.data.userEmail, event.data.postId)

    else if(event.data.plan === "free" && event.data.purchaseType==="extendPost")
        ChargeCustomer(event.data.existSubscriptions, event.data.existCustomerId, event.sourceId, event.data.purchaseType, event.data.userEmail, event.data.postId)

    else if(event.data.plan === "free" && event.data.purchaseType==="unlimitPost")
        ChargeCustomer(event.data.existSubscriptions, event.data.existCustomerId, event.sourceId, event.data.purchaseType, event.data.userEmail, event.data.postId)
    
    else if(event.data.purchaseType === "cancelSubscription"){

    }
}


//we get the tokenization from sensitive input card from user and make payment
function HandleTokenization(event){
    stripe.createToken(card).then(function(result) {
        if (result.error) {
            // Inform the customer that there was an error.
            var errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
        } 
        else {
            //Check if we already have an existing customer object whose email is the user's email.
            CheckIfCustomerObjectExists(event.data.userEmail).then(function(res){

                var isExist = false,    
                    existCustomerId,
                    existSubscriptions

                res.data.data.every(function(customer){
                    if(customer.email === event.data.userEmail){

                        isExist = true
                        existCustomerId = customer.id
                        existSubscriptions = customer.subscriptions.data
                        return false
                    }

                    return true
                })

                //if the customer object is already exist, then we use its existed customer ID
                if(isExist){
                    AddNewCardAndUpdateItAsDefault(existSubscriptions, result.token.id, event.data.plan, event.data.purchaseType, event.data.userEmail, event.data.postId, existCustomerId)

                    // if(event.data.purchaseType==="upgradeToPlus")
                    //     SubscribeCustomer(existSubscriptions, existCustomerId, event.data.purchaseType, event.data.userEmail)
                
                    // else if(event.data.purchaseType==="upgradeToPremium")
                    //     SubscribeCustomer(existSubscriptions, existCustomerId, event.data.purchaseType, event.data.userEmail)

                    // else if(event.data.plan === "free" && event.data.purchaseType==="newPost")
                    //     ChargeCustomer(existSubscriptions, existCustomerId, result.token.id, event.data.purchaseType, event.data.userEmail, event.data.postId)

                    // else if(event.data.plan === "free" && event.data.purchaseType==="extendPost")
                    //     ChargeCustomer(existSubscriptions,existCustomerId, result.token.id, event.data.purchaseType, event.data.userEmail, event.data.postId)

                    // else if(event.data.plan === "free" && event.data.purchaseType==="unlimitPost")
                    //     ChargeCustomer(existSubscriptions, existCustomerId, result.token.id, event.data.purchaseType, event.data.userEmail, event.data.postId)
                    
                    // else if(event.data.purchaseType === "cancelSubscription"){

                    // }
                }

                //If we dont find any, we create a new one
                else{
                    if(existSubscriptions){
                        CreateCustomerObject(existSubscriptions, result.token.id, event.data.plan, event.data.purchaseType, event.data.userEmail, event.data.postId)
                    }

                    else{
                        CreateCustomerObject("", result.token.id, event.data.plan, event.data.purchaseType, event.data.userEmail, event.data.postId)
                    }
                }
            })
            .catch(function(err){
                console.log(err)
            })
            
        }
    });
}

//Retrieve the list of 
function CheckIfCustomerObjectExists(userEmail){
    return axios({
        method: 'get',
        url: baseUrl + "/v1/customers?email=" + userEmail,
        headers: {
            'Authorization' : 'Bearer ' + apiKey,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

function AddNewCardAndUpdateItAsDefault(subscriptions, sourceTokenId, plan, purchaseType, userEmail, postId, customerId){
    
    var data = {
        source : sourceTokenId
    }

    //Create a card
    axios({
        method: 'post',
        url: baseUrl + '/v1/customers/' + customerId + '/sources',
        headers: {
            'Authorization' : 'Bearer ' + apiKey
        },
        data: Qs.stringify(data)
    })
    .then(function(res) {
        var cardHolder = $("#card-holder").val(),
        address = $("#address").val(),
        vatNumber = $("#vat-number").val(),
        phoneNumber = $("#phone-number").val(),
        description = "uniqe generated " + new Date().getTime()

        var metadata = {
            cardHolder: cardHolder,
            phoneNumber: phoneNumber,
            address: address,
            vatNumber: vatNumber
        }

        var data = {
            description: description,
            default_source: res.data.id,
            metadata: metadata,
            email: userEmail
        }
        
        //Update the card to be customer's default source
        return axios({
            method: 'post',
            url: baseUrl + '/v1/customers/' + customerId,
            headers: {
                'Authorization' : 'Bearer ' + apiKey
            },
            data: Qs.stringify(data)
        })
    })
    .then(function(res){
        
        if(purchaseType==="upgradeToPlus")
            SubscribeCustomer(subscriptions, res.data.id, purchaseType, userEmail)
        
        else if(purchaseType==="upgradeToPremium")
            SubscribeCustomer(subscriptions, res.data.id, purchaseType, userEmail)

        else if(plan === "free" && purchaseType==="newPost")
            ChargeCustomer(subscriptions, res.data.id, sourceTokenId, purchaseType, userEmail, postId)

        else if(plan === "free" && purchaseType==="extendPost")
            ChargeCustomer(subscriptions, res.data.id, sourceTokenId, purchaseType, userEmail, postId)

        else if(plan === "free" && purchaseType==="unlimitPost")
            ChargeCustomer(subscriptions, res.data.id, sourceTokenId, purchaseType, userEmail, postId)
    })
    .catch(function(err){
        console.log(err)
    })
}

//save a customer object for future purposes
function CreateCustomerObject(subscriptions, sourceTokenId, plan, purchaseType, userEmail, postId){
    var cardHolder = $("#card-holder").val(),
        address = $("#address").val(),
        vatNumber = $("#vat-number").val(),
        phoneNumber = $("#phone-number").val(),
        description = "uniqe generated " + new Date().getTime()

    var metadata = {
        cardHolder: cardHolder,
        phoneNumber: phoneNumber,
        address: address,
        vatNumber: vatNumber
    }

    var data = {
        description: description,
        source: sourceTokenId,
        metadata: metadata,
        email: userEmail
    }

    axios({
        method: 'post',
        url: baseUrl + "/v1/customers",
        headers: {
            'Authorization' : 'Bearer ' + apiKey
        },
        data: Qs.stringify(data) //need to Qs.stringigy meaning encode Object data into a URL query params to be able to transfer as x-www-form-urlencoded
    })
    .then(function(res) {
        //After successfully create Customer object, subscribe it to the chosen plan (package)
        if(purchaseType==="upgradeToPlus")
            SubscribeCustomer(subscriptions, res.data.id, purchaseType, userEmail)
        
        else if(purchaseType==="upgradeToPremium")
            SubscribeCustomer(subscriptions, res.data.id, purchaseType, userEmail)

        else if(plan === "free" && purchaseType==="newPost")
            ChargeCustomer(subscriptions, res.data.id, sourceTokenId, purchaseType, userEmail, postId)

        else if(plan === "free" && purchaseType==="extendPost")
            ChargeCustomer(subscriptions, res.data.id, sourceTokenId, purchaseType, userEmail, postId)

        else if(plan === "free" && purchaseType==="unlimitPost")
            ChargeCustomer(subscriptions, res.data.id, sourceTokenId, purchaseType, userEmail, postId)
    })
    .catch(function(err){
        console.log(err)
    })
}

//Charge purchase fee from customer's default source (card)
function ChargeCustomer(subscriptions, customerId, sourceTokenId, purchaseType, userEmail, postId){
    var data

    if(purchaseType === "newPost"){
        data = {
            amount: 500,
            currency: "eur",
            // source: sourceTokenId,
            description: "Fee for creating new post",
            customer: customerId,
            receipt_email: userEmail,
            metadata: {
                newPost: true,
                extendPost: false,
                unlimitPost: false
            }
        }
    }

    else if(purchaseType === "extendPost"){
        data = {
            amount: 500,
            currency: "eur",
            // source: sourceTokenId,
            description: "Fee for extending post",
            customer: customerId,
            receipt_email: userEmail,
            metadata: {
                newPost: false,
                extendPost: true,
                unlimitPost: false
            }
        }
    }

    else{
        data = {
            amount: 2500,
            currency: "eur",
            // source: sourceTokenId,
            description: "Fee for unlimiting post",
            customer: customerId,
            receipt_email: userEmail,
            metadata: {
                newPost: false,
                extendPost: false,
                unlimitPost: true
            }
        }
    }

    axios({
        method: 'post',
        url: baseUrl + "/v1/charges",
        headers: {
            'Authorization' : 'Bearer ' + apiKey
        },
        data: Qs.stringify(data)
    })
    .then(function(res){
        var metadata = res.data.metadata
        
        //If the purchase was for getting one extra post in the week
        if(metadata.newPost === "true" && metadata.extendPost === "false" && metadata.unlimitPost === "false"){
            var firestore = firebase.firestore()

            //Increment the numberOfJobsThisWeek field in "companies" collection by 1
            firestore.runTransaction(function(transaction){
                return transaction.get(firestore.collection("companies").doc(userEmail)).then(function(doc){
                    if(!doc.exists)
                        throw ("Document does not exist")
                    
                    var newNumberOfJobsThisWeek = doc.data().numberOfJobsThisWeek + 1
                    transaction.update(firestore.collection("companies").doc(userEmail), {numberOfJobsThisWeek: newNumberOfJobsThisWeek})
                })
            })
            .then(function(){
                window.location = "/company-dashboard/"
            })
            .catch(function(err){
                console.log(err)
            })
        }

        //If the purchase was for extending the post's life
        if(metadata.extendPost === "true" && metadata.newPost === "false" && metadata.unlimitPost === "false"){
            var firestore = firebase.firestore()

            //Update the new expiredAt with one more week duration since the last one.
            firestore.runTransaction(function(transaction){
                return transaction.get(firestore.collection("job_offers").doc(postId)).then(function(doc){
                    if(!doc.exists)
                        throw ("Document does not exist")
                    
                    var newExpiredAt = new Date(new Date(doc.data().expiredAt).getTime() + 7 * 24 * 60 * 60 * 1000).toUTCString()

                    transaction.update(firestore.collection("job_offers").doc(postId), {expiredAt: newExpiredAt})
                })
            })
            .then(function(){
                window.location = "/company-dashboard/"
            })
            .catch(function(err){
                console.log(err)
            })
        }

        //If the purchase was for unblocking the post's life
        if(metadata.unlimitPost === "true" && metadata.extendPost === "false" && metadata.newPost === "false"){
            var firestore = firebase.firestore()

            //Update the new expiredAt with a very long duration.
            firestore.runTransaction(function(transaction){
                return transaction.get(firestore.collection("job_offers").doc(postId)).then(function(doc){
                    if(!doc.exists)
                        throw ("Document does not exist")
                    
                    var newExpiredAt = new Date(new Date(doc.data().expiredAt).getTime() + 100 * 365 * 24 * 60 * 60 * 1000).toUTCString()

                    transaction.update(firestore.collection("job_offers").doc(postId), {expiredAt: newExpiredAt})
                })
            })
            .then(function(){
                window.location = "/company-dashboard/"
            })
            .catch(function(err){
                console.log(err)
            })
        }
    })
    .catch(function(err){
        console.log(err)
    })
}

//Subscribe customer to regarding plan (plus, premium)
function SubscribeCustomer(subscriptions, customerId, purchaseType, userEmail){

    //If there is no existing subscription yet, create one
    if(subscriptions.length === 0){
        var data
        if(purchaseType === "upgradeToPlus"){
            data = {
                customer: customerId,
                "items[0][plan]" : 'plan_EgV5SiMtzS8a3z', //The items are belonging to the customer's object, meaning this subscription will bind 
                                                          //the plan to the customer's items indexes - planId of Plus plan
                metadata: {
                    plus: true,
                    premium: false,
                    golden: false
                }
            }
        }
    
        else if (purchaseType === "upgradeToPremium"){
            data = {
                customer: customerId,
                "items[0][plan]" : 'plan_Egrcb662lTDpPC', //planId of Premium plan
                metadata: {
                    plus: false,
                    premium: true,
                    golden: false
                }
            }
        }
    
        axios({
            method: 'post',
            url: baseUrl + "/v1/subscriptions",
            headers: {
                'Authorization' : 'Bearer ' + apiKey
            },
            data: Qs.stringify(data)
        })
        .then(function(res){
            if(res.data.metadata.plus === "true" && res.data.metadata.premium === "false" && res.data.metadata.golden === "false"){
                var firestore = firebase.firestore()
    
                firestore.collection("companies").doc(userEmail).update({plan: 'plus_package', numberOfJobsThisWeek: 99999}).then(function(){
                    window.location = "/company-dashboard/"
                })
                .catch(function(err){
                    console.log(err)
                })
            }
    
            else if (res.data.metadata.plus === "false" && res.data.metadata.premium === "true" && res.data.metadata.golden === "false"){
                var firestore = firebase.firestore()
    
                firestore.collection("companies").doc(userEmail).update({plan: 'premium_package', numberOfJobsThisWeek: 99999}).then(function(){
                    window.location = "/company-dashboard/"
                })
                .catch(function(err){
                    console.log(err)
                })
            }
        })
        .catch(function(err){
            console.log(err)
        })
    }

    //If the client has already subscribed to a plan, upgrade the current plan or downgrade it
    else{
        var data
        
        if(purchaseType === "upgradeToPlus"){
            data = {
                "items[0][plan]" : 'plan_EgV5SiMtzS8a3z', //The items are belonging to the customer's object, meaning this subscription will bind 
                                                          //the plan to the customer's items indexes - planId of Plus plan
                
                "items[0][id]" : subscriptions[0].items.data[0].id,
                metadata: {
                    plus: true,
                    premium: false,
                    golden: false
                }
            }
        }
    
        else if (purchaseType === "upgradeToPremium"){
            data = {
                "items[0][plan]" : 'plan_Egrcb662lTDpPC', //planId of Premium plan
                "items[0][id]" : subscriptions[0].items.data[0].id,
                metadata: {
                    plus: false,
                    premium: true,
                    golden: false
                }
            }
        }

        axios({
            method: 'post',
            url: baseUrl + "/v1/subscriptions/" + subscriptions[0].id,
            headers: {
                'Authorization' : 'Bearer ' + apiKey
            },
            data: Qs.stringify(data)
        })
        .then(function(res){
            if(res.data.metadata.plus === "true" && res.data.metadata.premium === "false" && res.data.metadata.golden === "false"){
                var firestore = firebase.firestore()
    
                firestore.collection("companies").doc(userEmail).update({plan: 'plus_package', numberOfJobsThisWeek: 99999}).then(function(){
                    window.location = "/company-dashboard/"
                })
                .catch(function(err){
                    console.log(err)
                })
            }
            
            else if (res.data.metadata.plus === "false" && res.data.metadata.premium === "true" && res.data.metadata.golden === "false"){
                var firestore = firebase.firestore()
    
                firestore.collection("companies").doc(userEmail).update({plan: 'premium_package', numberOfJobsThisWeek: 99999}).then(function(){
                    window.location = "/company-dashboard/"
                })
                .catch(function(err){
                    console.log(err)
                })
            }
        })
        .catch(function(err){
            console.log(err)
        })
    }
    
}