var firestore = firebase.firestore()

var settings = { timestampsInSnapshots: true};

// firestore.settings(settings);

var userEmail,
    companyName,
    plan


firebase.auth().onAuthStateChanged(function(user) {
    if(user){
        window.localStorage.setItem('companyEmail', user.email)

        userEmail = user.email

        $("#preview-publish-job-post").unbind("click")

        firestore.collection('companies').doc(userEmail).onSnapshot(function(doc){
            companyName = doc.data()["company_name"]

            window.localStorage.setItem('companyName', companyName)

            plan = doc.data()["plan"]

            init(plan)
        })
    }

    else{
        window.location = "/company-login/c-sign-in-up.html"
    }
})

function init(plan){
    $("#my-plan-current-plan-holder").empty()
    $("#my-plan-upgrade-card-1").empty()
    $("#my-plan-upgrade-card-2").empty()

    var $myPlanCurrentNode,
        $myPlanUpgrade1,
        $myPlanUpgrade2

    if(plan.toLowerCase().indexOf("free") > -1){
        $("#upgrade-now-text").text("Upgrade now!")

        //Free background-color: #F26678;
        $myPlanCurrentNode = 
            '<div class="my-plan-current-plan-banner" style="background-color: #F26678;">\n' +
            ' <p>FREE</p>\n' +
            '</div>\n' +
            '<div class="my-plan-current-plan-options">\n' +
            ' <div class="my-plan-current-plan-option-holder">\n'+
            '  <p>Limited job offers</p>\n' +
            '  <div class="my-plan-current-plan-option-underline"></div>\n' +
            ' </div>\n' +
            ' <div class="my-plan-current-plan-option-holder">\n'+
            '  <p>Access to dashboard</p>\n' +
            '  <div class="my-plan-current-plan-option-underline"></div>\n' +
            ' </div>\n' +
            ' <div class="my-plan-current-plan-option-holder">\n'+
            '  <p>The lifespans of job offers are limited</p>\n' +
            '  <div class="my-plan-current-plan-option-underline"></div>\n' +
            ' </div>\n' +
            '</div>\n'

        //Plus background-color: #4BC4BE
        $myPlanUpgrade1 = 
            '<div class="my-plan-upgrade-card-top-line-for-plus" style="background-color: #4BC4BE;"></div>\n' +
            '<div class="my-plan-upgrade-card-content">\n' +
            ' <p class="my-plan-upgrade-card-content-package-title">PLUS</p>\n' +
            ' <div class="value-holder">\n' +
            '  <p class="value">9.99</p>\n' +
            '  <p class="unit">€/month</p>\n' +
            ' </div>\n' +
            ' <div class="option-description">\n' +
            '  <p>Unlimited job offers</p>\n' +
            ' </div>\n' +
            ' <div class="option-description">\n' +
            '  <p>Access to dashboard</p>\n' +
            ' </div>\n' +
            ' <div class="option-description">\n' +
            '  <p>The lifespans of job offers are unlimited</p>\n' +
            ' </div>\n' +
            ' <div class="upgrade-button-for-plus" style="background-color: #4BC4BE;" onclick="window.location = \'/html/company-payment.html?plan=free&purchaseType=upgradeToPlus\'">\n' +
            '  <p>Upgrade</p>\n' +
            ' </div>\n' +
            '</div>\n'

        //Premium background-color: rgba(237, 179, 76, 0.9)
        $myPlanUpgrade2 = 
            '<div class="my-plan-upgrade-card-top-line-for-plus" style="background-color: rgba(237, 179, 76, 0.9);"></div>\n' +
            '<div class="my-plan-upgrade-card-content">\n' +
            ' <p class="my-plan-upgrade-card-content-package-title">Premium</p>\n' +
            ' <div class="value-holder">\n' +
            '  <p class="value">12.99</p>\n' +
            '  <p class="unit">€/month</p>\n' +
            ' </div>\n' +
            ' <div class="option-description">\n' +
            '  <p>Unlimited job offers</p>\n' +
            ' </div>\n' +
            ' <div class="option-description">\n' +
            '  <p>Access to dashboard</p>\n' +
            ' </div>\n' +
            ' <div class="option-description">\n' +
            '  <p>The lifespans of job offers are unlimited</p>\n' +
            ' </div>\n' +
            ' <div class="option-description">\n' +
            '  <p>Analytics of job offers provided</p>\n' +
            ' </div>\n' +
            ' <div class="upgrade-button-for-plus" style="background-color: rgba(237, 179, 76, 0.9);" onclick="window.location = \'/html/company-payment.html?plan=free&purchaseType=upgradeToPremium\'">\n' +
            '  <p>Upgrade</p>\n' +
            ' </div>\n' +
            '</div>\n'

        if(window.innerWidth > 1400)
            $("#my-plan-upgrade-card-1").css({"margin-right": 55})
        
        $("#my-plan-upgrade-card-2").css({"display": "block"})
    }

    else if(plan.toLowerCase().indexOf("plus") > -1){
        $("#upgrade-now-text").text("Upgrade now!")

        //Plus
        $myPlanCurrentNode = 
            '<div class="my-plan-current-plan-banner" style="background-color: #4BC4BE">\n' +
            ' <p>Plus</p>\n' +
            '</div>\n' +
            '<div class="my-plan-current-plan-options">\n' +
            ' <div class="my-plan-current-plan-option-holder">\n'+
            '  <p>Unlimited job offers</p>\n' +
            '  <div class="my-plan-current-plan-option-underline"></div>\n' +
            ' </div>\n' +
            ' <div class="my-plan-current-plan-option-holder">\n'+
            '  <p>Access to dashboard</p>\n' +
            '  <div class="my-plan-current-plan-option-underline"></div>\n' +
            ' </div>\n' +
            ' <div class="my-plan-current-plan-option-holder">\n'+
            '  <p>The lifespans of job offers are unlimited</p>\n' +
            '  <div class="my-plan-current-plan-option-underline"></div>\n' +
            ' </div>\n' +
            '</div>\n'

        //Premium background-color: rgba(237, 179, 76, 0.9)
        $myPlanUpgrade1 = 
            '<div class="my-plan-upgrade-card-top-line-for-plus" style="background-color: rgba(237, 179, 76, 0.9);"></div>\n' +
            '<div class="my-plan-upgrade-card-content">\n' +
            ' <p class="my-plan-upgrade-card-content-package-title">Premium</p>\n' +
            ' <div class="value-holder">\n' +
            '  <p class="value">12.99</p>\n' +
            '  <p class="unit">€/month</p>\n' +
            ' </div>\n' +
            ' <div class="option-description">\n' +
            '  <p>Unlimited job offers</p>\n' +
            ' </div>\n' +
            ' <div class="option-description">\n' +
            '  <p>Access to dashboard</p>\n' +
            ' </div>\n' +
            ' <div class="option-description">\n' +
            '  <p>The lifespans of job offers are unlimited</p>\n' +
            ' </div>\n' +
            ' <div class="option-description">\n' +
            '  <p>Analytics of job offers provided</p>\n' +
            ' </div>\n' +
            ' <div class="upgrade-button-for-plus" style="background-color: rgba(237, 179, 76, 0.9);" onclick="window.location = \'/html/company-payment.html?plan=free&purchaseType=upgradeToPremium\'">\n' +
            '  <p>Upgrade</p>\n' +
            ' </div>\n' +
            '</div>\n'

        $("#my-plan-upgrade-card-1").css({"margin-right": 0})
        $("#my-plan-upgrade-card-2").css({"display": "none"})
    }

    else if (plan.toLowerCase().indexOf("premium") > -1){
        $("#upgrade-now-text").text("There are no upgrading options left")
        //Premium
        $myPlanCurrentNode = 
            '<div class="my-plan-current-plan-banner" style="background-color: rgba(237, 179, 76, 0.9);">\n' +
            ' <p>Premium</p>\n' +
            '</div>\n' +
            '<div class="my-plan-current-plan-options">\n' +
            ' <div class="my-plan-current-plan-option-holder">\n'+
            '  <p>Unlimited job offers</p>\n' +
            '  <div class="my-plan-current-plan-option-underline"></div>\n' +
            ' </div>\n' +
            ' <div class="my-plan-current-plan-option-holder">\n'+
            '  <p>Access to dashboard</p>\n' +
            '  <div class="my-plan-current-plan-option-underline"></div>\n' +
            ' </div>\n' +
            ' <div class="my-plan-current-plan-option-holder">\n'+
            '  <p>The lifespans of job offers are unlimited</p>\n' +
            '  <div class="my-plan-current-plan-option-underline"></div>\n' +
            ' </div>\n' +
            ' <div class="my-plan-current-plan-option-holder">\n'+
            '  <p>Analytics of job offers provided</p>\n' +
            '  <div class="my-plan-current-plan-option-underline"></div>\n' +
            ' </div>\n' +
            '</div>\n'

    }

    $("#my-plan-current-plan-holder").append($myPlanCurrentNode)
    $("#my-plan-upgrade-card-1").append($myPlanUpgrade1)
    $("#my-plan-upgrade-card-2").append($myPlanUpgrade2)
}