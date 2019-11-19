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

var firestore = firebase.firestore()



firebase.auth().onAuthStateChanged(function(user){
    if(user){
        userEmail = user.email
        
        
        var payButton = $("#payment-pay-button")
        payButton.unbind("click")

        var mobilePayButton = $("#mobile-pay-now")
        mobilePayButton.unbind("click")

        if(getParameterByName("purchaseType") === "upgradeToPlus"){
            $("#purchased-info-package-title").text("Plus package")
            $("#purchased-info-value").text("9.99 / month")
            $("#purchased-info-quantity").text("x1")
            $("#purchased-info-total-value").text("9.99 / month")

            $("#mobile-purchased-info-package-title").text("Plus package")
            $("#mobile-purchased-info-value").text("9.99 / month")
            $("#mobile-purchased-info-quantity").text("x1")
            $("#mobile-purchased-info-total-value").text("9.99 / month")

            $("#success-info-package-title").text("Plus package")
            $("#success-info-package-value").text("9.99 / month x1")
            $("#success-info-total-value-text").text("9.99 / month")
        }

        else if(getParameterByName("purchaseType") === "upgradeToPremium"){
            $("#purchased-info-package-title").text("Premium package")
            $("#purchased-info-value").text("12.99 / month")
            $("#purchased-info-quantity").text("x1")
            $("#purchased-info-total-value").text("12.99 / month")

            $("#mobile-purchased-info-package-title").text("Premium package")
            $("#mobile-purchased-info-value").text("12.99 / month")
            $("#mobile-purchased-info-quantity").text("x1")
            $("#mobile-purchased-info-total-value").text("12.99 / month")

            $("#success-info-package-title").text("Premium package")
            $("#success-info-package-value").text("12.99 / month x1")
            $("#success-info-total-value-text").text("12.99 / month")
        }

        // else if(getParameterByName("plan") === "free" && getParameterByName("purchaseType") === "newPost"){
        // }

        // else if(getParameterByName("plan") === "free" && getParameterByName("purchaseType") === "extendPost"){
        // }

        // else if(getParameterByName("plan") === "free" && getParameterByName("purchaseType") === "unlimitPost"){
        // }

        

        //Check if we already have the client's customer object, if yes, we use the default card so the client doesnt need to type again their info
        CheckIfCustomerObjectExists(userEmail).then(function(res) {
            var isExist = false,    
                existCustomerId,
                defaultSourceCard,
                existSubscriptions,
                hasDefaultCard,
                customerMetaData

            res.data.data.every(function(customer){
                //second verification of customer's email
                if(customer.email === userEmail){
                    isExist = true
                    existCustomerId = customer.id
                    defaultSourceCard = customer.sources.data[0]
                    existSubscriptions = customer.subscriptions.data
                    hasDefaultCard = customer.metadata.hasDefaultCard
                    customerMetaData = customer.metadata
                    return false
                }

                return true
            })
            

            //Make payment based on the existing card if the customer did save a default source
            if(isExist && hasDefaultCard){
                $("#default-card").css("display", "flex")
                $("#new-card").css("display", "none")

                $("#personal-full-name").val(customerMetaData.fullName)
                $("#personal-address").val(customerMetaData.address)
                $("#personal-vat-number").val(customerMetaData.vatNumber)
                $("#personal-card-holder").val(customerMetaData.cardHolder)


                $("#default-card > p").text(defaultSourceCard.brand + ' - ' + 
                defaultSourceCard.last4 + ' - ' + defaultSourceCard["exp_month"] + "/" + defaultSourceCard["exp_year"])

                payButton.click({plan: getParameterByName("plan"), 
                                purchaseType: getParameterByName("purchaseType"), 
                                userEmail: userEmail, 
                                postId: getParameterByName("postId"),
                                sourceId: defaultSourceCard.id,
                                existCustomerId: existCustomerId,
                                existSubscriptions: existSubscriptions}, MakePaymentBasedOnExistingCard)

                mobilePayButton.click({plan: getParameterByName("plan"), 
                    purchaseType: getParameterByName("purchaseType"), 
                    userEmail: userEmail, 
                    postId: getParameterByName("postId"),
                    sourceId: defaultSourceCard.id,
                    existCustomerId: existCustomerId,
                    existSubscriptions: existSubscriptions}, MakePaymentBasedOnExistingCard)
            }

            //We tokenize the customer's input card infor
            else{
                $("#default-card").css("display", "none")
                $("#new-card").css("display", "flex")

                payButton.click({plan: getParameterByName("plan"), 
                                purchaseType: getParameterByName("purchaseType"), 
                                userEmail: userEmail, 
                                postId: getParameterByName("postId")}, HandleTokenization)


                mobilePayButton.click({plan: getParameterByName("plan"), 
                    purchaseType: getParameterByName("purchaseType"), 
                    userEmail: userEmail, 
                    postId: getParameterByName("postId")}, HandleTokenization)
            }
        })
        .catch(function(err){
            console.log(err)
        })

        
    }
    else{
        window.location = '/company-login/c-sign-in-up.html'
    }
})

function CheckIfFullyFilled(){
    var allFilled = true
    if($("#personal-full-name").val() === ""){
        $("#warning-empty-payment-full-name").removeClass("show-warning-empty-field")
        $("#warning-empty-payment-full-name").addClass("show-warning-empty-field")
        allFilled = false
    }

    if($("#personal-address").val() === ""){
        $("#warning-empty-payment-address").removeClass("show-warning-empty-field")
        $("#warning-empty-payment-address").addClass("show-warning-empty-field")
        allFilled = false
    }

    if($("#personal-card-holder").val() === ""){
        $("#warning-empty-payment-card-holder").removeClass("show-warning-empty-field")
        $("#warning-empty-payment-card-holder").addClass("show-warning-empty-field")
        allFilled = false
    }

    return allFilled
}


function ChooseAnotherCard(){

    $("#default-card").css("display", "none")
    $("#new-card").css("display", "flex")

    var payButton = $("#payment-pay-button")
    payButton.unbind("click")
    payButton.click({plan: getParameterByName("plan"), 
                                        purchaseType: getParameterByName("purchaseType"), 
                                        userEmail: userEmail, 
                                        postId: getParameterByName("postId")}, HandleTokenization)

    var mobilePayButton = $("#mobile-pay-now")
    mobilePayButton.unbind("click")
    mobilePayButton.click({plan: getParameterByName("plan"), 
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
      fontSize: '14px',
      lineHeight: '18px',
      textTransform: 'uppercase',
      fontWeight: 600,
      fontStyle: 'normal',
      color: "#5A5A5A",
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
    if(CheckIfFullyFilled()){
        if(event.data.purchaseType==="upgradeToPlus")
            SubscribeCustomer(event.data.existSubscriptions, event.data.existCustomerId, 
                event.data.purchaseType, event.data.userEmail)

        else if(event.data.purchaseType==="upgradeToPremium")
            SubscribeCustomer(event.data.existSubscriptions, event.data.existCustomerId,
                event.data.purchaseType, event.data.userEmail)
    }
    // else if(event.data.plan === "free" && event.data.purchaseType==="newPost")
    //     ChargeCustomer(event.data.existSubscriptions, event.data.existCustomerId, event.sourceId, event.data.purchaseType, event.data.userEmail, event.data.postId)

    // else if(event.data.plan === "free" && event.data.purchaseType==="extendPost")
    //     ChargeCustomer(event.data.existSubscriptions, event.data.existCustomerId, event.sourceId, event.data.purchaseType, event.data.userEmail, event.data.postId)

    // else if(event.data.plan === "free" && event.data.purchaseType==="unlimitPost")
    //     ChargeCustomer(event.data.existSubscriptions, event.data.existCustomerId, event.sourceId, event.data.purchaseType, event.data.userEmail, event.data.postId)
    
    // else if(event.data.purchaseType === "cancelSubscription"){

    // }
}


//we get the tokenization from sensitive input card from user and make payment
function HandleTokenization(event){

    // $("#absolute-success-holder").removeClass("show-absolute-success-holder")
    // $("#absolute-success-holder").addClass("show-absolute-success-holder")

    if(CheckIfFullyFilled()){
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
                        //If the user chooses to save the card
                        if($("#save-card-button>div").hasClass("active-save-card-button")){
                            AddNewCardAndUpdateItAsDefault(existSubscriptions, result.token.id, event.data.plan, 
                                event.data.purchaseType, event.data.userEmail, existCustomerId)
                        }
                            
                        
                        //If not then subscribe as normal
                        else{
                            SubscribeCustomer(existSubscriptions, existCustomerId, event.data.purchaseType, event.data.userEmail)
                        }

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

                    //If we dont find any, we create a new one and subscribe to the chosen plan
                    else if(!isExist){
                        CreateCustomerObject("", result.token.id, event.data.purchaseType,
                        event.data.userEmail)
                    }
                })
                .catch(function(err){
                    console.log(err)
                })
                
            }
        });
    }
}

//Retrieve the list of customer object
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

function AddNewCardAndUpdateItAsDefault(subscriptions, sourceTokenId, plan, purchaseType, userEmail, customerId){
    
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
        var cardHolder = $("#personal-card-holder").val(),
            fullName = $("#personal-full-name").val(),
            address = $("#personal-address").val(),
            vatNumber = $("#personal-vat-numer").val(),
            phoneNumber = $("#personal-country-code").val() + $("#personal-phone").val(),
            description = "uniqe generated " + new Date().getTime()

        var metadata = {
            cardHolder: cardHolder,
            phoneNumber: phoneNumber,
            address: address,
            vatNumber: vatNumber,
            fullName: fullName,
            hasDefaultCard: true
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

        // else if(plan === "free" && purchaseType==="newPost")
        //     ChargeCustomer(subscriptions, res.data.id, sourceTokenId, purchaseType, userEmail, postId)

        // else if(plan === "free" && purchaseType==="extendPost")
        //     ChargeCustomer(subscriptions, res.data.id, sourceTokenId, purchaseType, userEmail, postId)

        // else if(plan === "free" && purchaseType==="unlimitPost")
        //     ChargeCustomer(subscriptions, res.data.id, sourceTokenId, purchaseType, userEmail, postId)
    })
    .catch(function(err){
        console.log(err)
    })
}

//save a customer object for future purposes
function CreateCustomerObject(subscriptions, sourceTokenId, purchaseType, userEmail){
    var cardHolder = $("#personal-card-holder").val(),
        fullName = $("#personal-full-name").val(),
        address = $("#personal-address").val(),
        vatNumber = $("#personal-vat-numer").val(),
        phoneNumber = $("#personal-country-code").val() + $("#personal-phone").val(),
        description = "uniqe generated " + new Date().getTime(),
        hasDefaultCard = $("#save-card-button>div").hasClass("active-save-card-button") ? true: false

    var metadata = {
        cardHolder: cardHolder,
        phoneNumber: phoneNumber,
        address: address,
        vatNumber: vatNumber,
        fullName: fullName,
        hasDefaultCard: hasDefaultCard
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

        // else if(plan === "free" && purchaseType==="newPost")
        //     ChargeCustomer(subscriptions, res.data.id, sourceTokenId, purchaseType, userEmail, postId)

        // else if(plan === "free" && purchaseType==="extendPost")
        //     ChargeCustomer(subscriptions, res.data.id, sourceTokenId, purchaseType, userEmail, postId)

        // else if(plan === "free" && purchaseType==="unlimitPost")
        //     ChargeCustomer(subscriptions, res.data.id, sourceTokenId, purchaseType, userEmail, postId)
    })
    .catch(function(err){
        console.log(err)
    })
}

//Charge purchase fee from customer's default source (card)
// function ChargeCustomer(subscriptions, customerId, sourceTokenId, purchaseType, userEmail, postId){
//     var data

//     if(purchaseType === "newPost"){
//         data = {
//             amount: 500,
//             currency: "eur",
//             // source: sourceTokenId,
//             description: "Fee for creating new post",
//             customer: customerId,
//             receipt_email: userEmail,
//             metadata: {
//                 newPost: true,
//                 extendPost: false,
//                 unlimitPost: false
//             }
//         }
//     }

//     else if(purchaseType === "extendPost"){
//         data = {
//             amount: 500,
//             currency: "eur",
//             // source: sourceTokenId,
//             description: "Fee for extending post",
//             customer: customerId,
//             receipt_email: userEmail,
//             metadata: {
//                 newPost: false,
//                 extendPost: true,
//                 unlimitPost: false
//             }
//         }
//     }

//     else{
//         data = {
//             amount: 2500,
//             currency: "eur",
//             // source: sourceTokenId,
//             description: "Fee for unlimiting post",
//             customer: customerId,
//             receipt_email: userEmail,
//             metadata: {
//                 newPost: false,
//                 extendPost: false,
//                 unlimitPost: true
//             }
//         }
//     }

//     axios({
//         method: 'post',
//         url: baseUrl + "/v1/charges",
//         headers: {
//             'Authorization' : 'Bearer ' + apiKey
//         },
//         data: Qs.stringify(data)
//     })
//     .then(function(res){
//         var metadata = res.data.metadata
        
//         //If the purchase was for getting one extra post in the week
//         if(metadata.newPost === "true" && metadata.extendPost === "false" && metadata.unlimitPost === "false"){
//             var firestore = firebase.firestore()

//             //Increment the numberOfJobsThisWeek field in "companies" collection by 1
//             firestore.runTransaction(function(transaction){
//                 return transaction.get(firestore.collection("companies").doc(userEmail)).then(function(doc){
//                     if(!doc.exists)
//                         throw ("Document does not exist")
                    
//                     var newNumberOfJobsThisWeek = doc.data().numberOfJobsThisWeek + 1
//                     transaction.update(firestore.collection("companies").doc(userEmail), {numberOfJobsThisWeek: newNumberOfJobsThisWeek})
//                 })
//             })
//             .then(function(){
//                 window.location = "/company-dashboard/"
//             })
//             .catch(function(err){
//                 console.log(err)
//             })
//         }

//         //If the purchase was for extending the post's life
//         if(metadata.extendPost === "true" && metadata.newPost === "false" && metadata.unlimitPost === "false"){
//             var firestore = firebase.firestore()

//             //Update the new expiredAt with one more week duration since the last one.
//             firestore.runTransaction(function(transaction){
//                 return transaction.get(firestore.collection("job_offers").doc(postId)).then(function(doc){
//                     if(!doc.exists)
//                         throw ("Document does not exist")
                    
//                     var newExpiredAt = new Date(new Date(doc.data().expiredAt).getTime() + 7 * 24 * 60 * 60 * 1000).toUTCString()

//                     transaction.update(firestore.collection("job_offers").doc(postId), {expiredAt: newExpiredAt})
//                 })
//             })
//             .then(function(){
//                 window.location = "/company-dashboard/"
//             })
//             .catch(function(err){
//                 console.log(err)
//             })
//         }

//         //If the purchase was for unblocking the post's life
//         if(metadata.unlimitPost === "true" && metadata.extendPost === "false" && metadata.newPost === "false"){
//             var firestore = firebase.firestore()

//             //Update the new expiredAt with a very long duration.
//             firestore.runTransaction(function(transaction){
//                 return transaction.get(firestore.collection("job_offers").doc(postId)).then(function(doc){
//                     if(!doc.exists)
//                         throw ("Document does not exist")
                    
//                     var newExpiredAt = new Date(new Date(doc.data().expiredAt).getTime() + 100 * 365 * 24 * 60 * 60 * 1000).toUTCString()

//                     transaction.update(firestore.collection("job_offers").doc(postId), {expiredAt: newExpiredAt})
//                 })
//             })
//             .then(function(){
//                 window.location = "/company-dashboard/"
//             })
//             .catch(function(err){
//                 console.log(err)
//             })
//         }
//     })
//     .catch(function(err){
//         console.log(err)
//     })
// }

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
    
                firestore.collection("companies").doc(userEmail).update({plan: 'plus_package', numberOfJobsThisWeek: 99999}).then(function(){
                    $("#main-holder").removeClass("hide-payment-main-holder")
                    $("#main-holder").addClass("hide-payment-main-holder")
                    
                    $("#absolute-success-holder").removeClass("show-absolute-success-holder")
                    $("#absolute-success-holder").addClass("show-absolute-success-holder")
                })
                .catch(function(err){
                    console.log(err)
                })
            }
    
            else if (res.data.metadata.plus === "false" && res.data.metadata.premium === "true" && res.data.metadata.golden === "false"){
    
                firestore.collection("companies").doc(userEmail).update({plan: 'premium_package', numberOfJobsThisWeek: 99999}).then(function(){
                    $("#main-holder").removeClass("hide-payment-main-holder")
                    $("#main-holder").addClass("hide-payment-main-holder")
                    
                    $("#absolute-success-holder").removeClass("show-absolute-success-holder")
                    $("#absolute-success-holder").addClass("show-absolute-success-holder")
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
                    $("#main-holder").removeClass("hide-payment-main-holder")
                    $("#main-holder").addClass("hide-payment-main-holder")
                    
                    $("#absolute-success-holder").removeClass("show-absolute-success-holder")
                    $("#absolute-success-holder").addClass("show-absolute-success-holder")

                    
                })
                .catch(function(err){
                    console.log(err)
                })
            }
            
            else if (res.data.metadata.plus === "false" && res.data.metadata.premium === "true" && res.data.metadata.golden === "false"){
                var firestore = firebase.firestore()
    
                firestore.collection("companies").doc(userEmail).update({plan: 'premium_package', numberOfJobsThisWeek: 99999}).then(function(){
                    $("#main-holder").removeClass("hide-payment-main-holder")
                    $("#main-holder").addClass("hide-payment-main-holder")

                    $("#absolute-success-holder").removeClass("show-absolute-success-holder")
                    $("#absolute-success-holder").addClass("show-absolute-success-holder")
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


function ToggleSaveCardButton(){
    if($("#save-card-button > div").hasClass("active-save-card-button")){
        $("#save-card-button > div").removeClass("active-save-card-button")
    }

    else{
        $("#save-card-button > div").addClass("active-save-card-button")
    }
}


function NotAllowWord(element){
    element.value = element.value.replace(/([a-zA-Z])/gi, "")
}

function LimitPhoneNumberDigits(element){
    
    if(element.value.length > 12){
        element.value = element.value.substring(0, 12)
    }
    
}