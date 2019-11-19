var cname = ''

var firebaseCurrentUser

firebase.auth().onAuthStateChanged(function(user) {
    if(user){
        if(user.email && user.email !== "admin@globuzzer.com"){

        }
    }
})

var leftOverlay = document.querySelector("#left-overlay"),
    rightOverlay = document.querySelector("#right-overlay"),

    leftBanner = document.querySelector("#left-banner"),
    rightBanner = document.querySelector("#right-banner"),

    leftInfoHolder = document.querySelector("#left-info-holder"),
    rightInfoHolder = document.querySelector("#right-info-holder"),

    leftInfo = document.querySelector("#left-info"),
    rightInfo = document.querySelector("#right-info"),

    registerButton = $("#register-button"),
    rightOverlayMainContext = document.querySelector("#right-overlay-main-context"),
    rightDarkenLayer = document.querySelector("#right-darken-layer")


registerButton.on("click", function(){
    rightOverlay.classList.remove("right-overlay-translateX")
    rightOverlay.classList.remove("right-overlay-shrink")

    rightOverlay.classList.add("right-overlay-translateX")

    rightBanner.classList.remove("banner-hidden")
    rightBanner.classList.add("banner-hidden")
    leftBanner.classList.remove("banner-hidden")
    leftBanner.classList.add("banner-hidden")

    rightOverlayMainContext.classList.remove("show-right-main-context")
    rightOverlayMainContext.classList.add("show-right-main-context")

    rightDarkenLayer.classList.remove("right-darken-layer-turn-blue")
    rightDarkenLayer.classList.add("right-darken-layer-turn-blue")

    leftOverlay.classList.remove("left-overlay-translateX")
    leftOverlay.classList.add("left-overlay-translateX")
})

leftOverlay.addEventListener("click", function(){
    rightOverlay.classList.remove("right-overlay-translateX")
    rightOverlayMainContext.classList.remove("show-right-main-context")
    rightBanner.classList.remove("banner-hidden")
    leftBanner.classList.remove("banner-hidden")
    rightDarkenLayer.classList.remove("right-darken-layer-turn-blue")
    leftOverlay.classList.remove("left-overlay-translateX")
})

var firestore = firebase.firestore()

var comdb = firestore.collection("companies"),
    job_offers_db = firestore.collection("job_offers"),
    cemail = ''


var navIcon1 = $("#nav-icon-outline-1"),
    navIcon2 = $("#nav-icon-outline-2"),
    navIcon3 = $("#nav-icon-outline-3"),
    clayer1 = $("#cmain-layer-1"),
    clayer2 = $("#cmain-layer-2"),
    clayer3 = $("#cmain-layer-3") 

var companiesButton = $("#for-companies-button"),
    companiesButtonLater = $("#for-companies-button-later"),
    signInRef = $("#sign-in-ref")
// companiesButton.prop("disabled", true)

var allChecked = false

function ScrollToViewJobs(){
    $('html, body').animate({
        scrollTop: $("#job-post-container").offset().top -60
    }, 500)
}

function ScrollToViewArticles(){
    $('html, body').animate({
        scrollTop: $("#new-article-content-holder").offset().top - 160
    }, 500)
}

function CheckIfEmptySignIn(e){
    if(e.value.length > 0){
        e.classList.remove("warning-empty-field")
    }

    if(e.id === "su-re-password"){
        CheckIfIdentical(e.value)
    }

    if(e.id === "su-password"){
        CheckPasswordIfValid()
    }
}

function limitCharacter(element){
    var max_char = 25;

    if(element.value.length > max_char)
        element.value = element.value.substring(0, max_char)
    
    if(element.value.length === 0)
        $("#password-evaluation").css({'display': 'none'})
    else
        $("#password-evaluation").css({'display': 'block'})
}

function CheckPasswordIfValid(){
    $('#company-pass-validation').removeClass('show-warning-incorrect-input')
    var password = $("#crf-company-password").val()

    let strongPassRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,25})"),
        adequatePassRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,25})"),
        weakPassRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])||(?=.*[0-9])(?=.{6,25})")

    if(password.length < 6){
        $("#password-security-warning").text("Too Short")
        return false
    }

    if(password.match(strongPassRegex)){
        $("#password-security-warning").text("Strong")
        return true
    }

    else if(password.match(adequatePassRegex)){
        $("#password-security-warning").text("Adequate")

        return true
    }

    else if(password.match(weakPassRegex)){
        $("#password-security-warning").text("Weak")
        return true
    }

    
    return false
}

function CheckIfIdentical(){
    if($("#su-re-password").val() !== $("#su-password").val()){
        $("#su-re-password").removeClass("warning-empty-field")
        
        $("#su-re-password").addClass("warning-empty-field")

        return false
    }

    else{
        $("#su-re-password").removeClass("warning-empty-field")

        return true
    }
}

function ValidationEmail(value){
    var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return value.match(pattern)

}

$("#company-country-register-button").click(function(){
    $("#company-country-register-content").slideToggle(250)

})

$("#company-country-register-content").hide()

function ChooseCountryRegister(countryName){
    if(countryName === 'sweden'){
        $("#company-country-register-button > p").text("Sweden")
        $("#company-country-register-button").removeClass("warning-empty-field")

        autocomplete.setComponentRestrictions(
            {'country': 'se'}
        )
    }

    else if(countryName === 'finland'){
        $("#company-country-register-button > p").text("Finland")
        $("#company-country-register-button").removeClass("warning-empty-field")

        autocomplete.setComponentRestrictions(
            {'country': 'fi'}
        )
    }

    else if(countryName === 'norway'){
        $("#company-country-register-button > p").text("Norway")
        $("#company-country-register-button").removeClass("warning-empty-field")

        autocomplete.setComponentRestrictions(
            {'country': 'no'}
        )
    }

    else if(countryName === 'denmark'){
        $("#company-country-register-button > p").text("Denmark")
        $("#company-country-register-button").removeClass("warning-empty-field")

        autocomplete.setComponentRestrictions(
            {'country': 'dk'}
        )
    }

    $("#company-country-register-content").slideUp(250)

}


function ChooseCountryCreateFirstJob(countryName){
    if(countryName === 'sweden'){
        $("#create-first-job-country-select-button > p").text("Sweden")
        $("#create-first-job-country-select-button").removeClass("warning-empty-field")
    }

    else if(countryName === 'finland'){
        $("#create-first-job-country-select-button > p").text("Finland")
        $("#create-first-job-country-select-button").removeClass("warning-empty-field")
    }

    else if(countryName === 'norway'){
        $("#create-first-job-country-select-button > p").text("Norway")
        $("#create-first-job-country-select-button").removeClass("warning-empty-field")
    }

    else if(countryName === 'denmark'){
        $("#create-first-job-country-select-button > p").text("Denmark")
        $("#create-first-job-country-select-button").removeClass("warning-empty-field")
    }

    $("#create-first-job-country-select-content").slideUp(250)

}

$("#create-first-job-country-select-button").click(function(){
    $("#create-first-job-country-select-content").slideToggle(250)
})

$("#create-first-job-country-select-content").hide()


function ChooseCategoryCreateFirstJob(category){
    $("#create-first-job-category-select-button > p").text(category)
    $("#create-first-job-category-select-button").removeClass("warning-empty-field")

    $("#create-first-job-category-select-content").slideUp(250)
}

$("#create-first-job-category-select-button").click(function(){
    $("#create-first-job-category-select-content").slideToggle(250)
})

$("#create-first-job-category-select-content").hide()

function ChoosePositionCreateFirstJob(position){
    if(position === 'intern'){
        $("#create-first-job-position-select-button > p").text("Intern")
        $("#create-first-job-position-select-button").removeClass("warning-empty-field")
    }

    else if (position === 'trainee'){
        $("#create-first-job-position-select-button > p").text("Trainee")
        $("#create-first-job-position-select-button").removeClass("warning-empty-field")
    }

    else if (position === 'fullTime'){
        $("#create-first-job-position-select-button > p").text("Full-time")
        $("#create-first-job-position-select-button").removeClass("warning-empty-field")
    }

    else if (position === 'partTime'){
        $("#create-first-job-position-select-button > p").text("Part-time")
        $("#create-first-job-position-select-button").removeClass("warning-empty-field")
    }

    $("#create-first-job-position-select-content").slideUp(250)
}

$("#create-first-job-position-select-button").click(function(){
    $("#create-first-job-position-select-content").slideToggle(250)
})

$("#create-first-job-position-select-content").hide()

$("#create-first-job-salary-select-content").hide()

function ChooseSalaryCreateFirstJob(salary){
    if(salary === 'paid'){
        $("#create-first-job-salary-select-button > p").text("Paid")
        
        $("#create-first-job-salary-select-button").removeClass('warning-empty-field')
    }

    else if (salary === 'unpaid'){
        $("#create-first-job-salary-select-button > p").text("Unpaid")
        $("#create-first-job-salary-select-button").removeClass('warning-empty-field')
    }

    $("#create-first-job-salary-select-content").slideUp(250)
}

$("#create-first-job-salary-select-button").click(function(){
    $("#create-first-job-salary-select-content").slideToggle(250)
})


function CreateAccount(){
    // $("#right-overlay").removeClass("mobile-step-2-right-overlay-translate")
    // $("#right-overlay").addClass("mobile-step-2-right-overlay-translate")

    // $("#company-registration-holder").removeClass("hide-company-registration-holder")
    // $("#company-registration-holder").addClass("hide-company-registration-holder")

    // $("#company-post-first-job-holder").removeClass("show-company-post-first-job-holder")
    // $("#company-post-first-job-holder").addClass("show-company-post-first-job-holder")

    // $("#step-nav-point-1").removeClass("choose-step-nav-point")
    // $("#step-nav-point-2").removeClass("choose-step-nav-point")
    // $("#step-nav-point-3").removeClass("choose-step-nav-point")
    // $("#step-nav-point-2").addClass("choose-step-nav-point")

    // $("#mobile-step-nav-point-1").removeClass("choose-step-nav-point")
    // $("#mobile-step-nav-point-2").removeClass("choose-step-nav-point")
    // $("#mobile-step-nav-point-3").removeClass("choose-step-nav-point")
    // $("#mobile-step-nav-point-2").addClass("choose-step-nav-point")


    var companyName = $("#crf-company-name"),
        companyEmail = $("#crf-company-email"),
        companyCountry = $("#company-regist-select-country>p"),
        companyCity = $("#crf-company-city"),
        companyPassword = $("#crf-company-password"),
        companyRepassword = $("#crf-company-repassword")

    var allFilled = true
    if(companyName.val() === ""){
        $("#company-name-validation").removeClass("show-warning-incorrect-input")
        $("#company-name-validation").addClass("show-warning-incorrect-input")
        allFilled = false
    }

    if(!ValidationEmail(companyEmail.val().toLowerCase()) || companyEmail.val().toLowerCase() === ""){
        $("#company-email-validation").removeClass("show-warning-incorrect-input")
        $("#company-email-validation").addClass("show-warning-incorrect-input")
        $("#company-email-validation>p").text("Wrong format")
        allFilled = false
    }

    if(companyCountry.text() === "Select country *"){
        $("#company-country-validation").removeClass("show-warning-incorrect-input")
        $("#company-country-validation").addClass("show-warning-incorrect-input")
        allFilled = false
    }

    if(companyCity.val() === ""){
        $("#company-city-validation").removeClass("show-warning-incorrect-input")
        $("#company-city-validation").addClass("show-warning-incorrect-input")
        allFilled = false
    }

    if(companyPassword.val() === "" || !CheckPasswordIfValid()){
        $("#company-pass-validation").removeClass("show-warning-incorrect-input")
        $("#company-pass-validation").addClass("show-warning-incorrect-input")
        allFilled = false
    }

    if(companyRepassword.val() === "" || companyRepassword.val() !== companyPassword.val()){
        $("#company-repass-validation").removeClass("show-warning-incorrect-input")
        $("#company-repass-validation").addClass("show-warning-incorrect-input")
        $("#company-repass-validation>p").text("Doesn't match")
        allFilled = false
    }

    if(allFilled){
        //Update the registered company into database
        comdb.doc(companyEmail.val().toLowerCase()).get().then(function(doc){
            if(doc.exists){
                $("#company-email-validation").removeClass("show-warning-incorrect-input")
                $("#company-email-validation").addClass("show-warning-incorrect-input")
                $("#company-email-validation>p").text("Email exists")
            }

            else{
                comdb.doc(companyEmail.val().toLowerCase()).set({
                    company_name: companyName.val(),
                    location: companyCity.val(),
                    country: companyCountry.text(),
                    email: companyEmail.val().toLowerCase(),
                    createdAt: new Date().toUTCString(),
                    plan: 'free_package',
                    numberOfJobsThisWeek: 1
                })
                .then(function(){
                    firebase.auth().createUserWithEmailAndPassword(companyEmail.val().toLowerCase(), companyPassword.val())
                    .then(function(userCre){
                        $("#right-overlay").removeClass("mobile-step-2-right-overlay-translate")
                        $("#right-overlay").addClass("mobile-step-2-right-overlay-translate")
                    
                        $("#company-registration-holder").removeClass("hide-company-registration-holder")
                        $("#company-registration-holder").addClass("hide-company-registration-holder")
                    
                        $("#company-post-first-job-holder").removeClass("show-company-post-first-job-holder")
                        $("#company-post-first-job-holder").addClass("show-company-post-first-job-holder")
                    
                        $("#step-nav-point-1").removeClass("choose-step-nav-point")
                        $("#step-nav-point-2").removeClass("choose-step-nav-point")
                        $("#step-nav-point-3").removeClass("choose-step-nav-point")
                        $("#step-nav-point-2").addClass("choose-step-nav-point")
                    
                        $("#mobile-step-nav-point-1").removeClass("choose-step-nav-point")
                        $("#mobile-step-nav-point-2").removeClass("choose-step-nav-point")
                        $("#mobile-step-nav-point-3").removeClass("choose-step-nav-point")
                        $("#mobile-step-nav-point-2").addClass("choose-step-nav-point")

                        $("#mobile-our-packages-holder").animate({
                            scrollLeft: $("#mobile-package-holder-free").position().left
                        })
    
                        window.localStorage.setItem("companyEmail", companyEmail.val().toLowerCase())
    
                        window.localStorage.setItem("companyName", companyName.val())
                    })
                    .catch(function(err){
                        console.log(err)

                        alert(err.message)
                    })

                    
                    
                })
                .catch(function(err){
                    console.log(err)
                })
            }
        })
    }
}

function PublishFirstJob(){
    var title = $("#pfj-job-title"),
        category = $("#pfj-category-button>p"),
        country = $("#pfj-country-button>p"),
        city = $("#pfj-job-city"),
        position = $("#pfj-type-button>p"),
        salary = $("#pfj-salary-button>p"),
        image = $("#company-pfj-add-image"),
        deadline = $("#pfj-choose-deadline"),
        description = $("#pfj-job-description"),
        requirement = $("#pfj-job-requirement")

    var allFilled = true

    if(title.val() === ""){
        $("#first-job-title-validation").removeClass("show-warning-incorrect-input")
        $("#first-job-title-validation").addClass("show-warning-incorrect-input")
        allFilled = false
    }

    if(category.text() === "Category *"){
        $("#first-job-category-validation").removeClass("show-warning-incorrect-input")
        $("#first-job-category-validation").addClass("show-warning-incorrect-input")
        allFilled = false
    }

    if(country.text() === "Country *"){
        $("#first-job-country-validation").removeClass("show-warning-incorrect-input")
        $("#first-job-country-validation").addClass("show-warning-incorrect-input")
        allFilled = false
    }

    if(city.val() === ""){
        $("#first-job-city-validation").removeClass("show-warning-incorrect-input")
        $("#first-job-city-validation").addClass("show-warning-incorrect-input")
        allFilled = false
    }

    if(position.text() === "Position *"){
        $("#first-job-type-validation").removeClass("show-warning-incorrect-input")
        $("#first-job-type-validation").addClass("show-warning-incorrect-input")
        allFilled = false
    }

    if(salary.text() === "Salary *"){
        $("#first-job-salary-validation").removeClass("show-warning-incorrect-input")
        $("#first-job-salary-validation").addClass("show-warning-incorrect-input")
        allFilled = false
    }

    if(!companyFirstJobImage){
        $("#first-job-image-validation").removeClass("show-warning-incorrect-input")
        $("#first-job-image-validation").addClass("show-warning-incorrect-input")
        allFilled = false
    }

    if(deadline.val() === ""){
        $("#first-job-deadline-validation").removeClass("show-warning-incorrect-input")
        $("#first-job-deadline-validation").addClass("show-warning-incorrect-input")
        allFilled = false
    }

    if(description.val() === ""){
        $("#first-job-description-validation").removeClass("show-warning-incorrect-input")
        $("#first-job-description-validation").addClass("show-warning-incorrect-input")
        allFilled = false
    }

    if(requirement.val() === ""){
        $("#first-job-requirements-validation").removeClass("show-warning-incorrect-input")
        $("#first-job-requirements-validation").addClass("show-warning-incorrect-input")
        allFilled = false
    }

    if(allFilled){
        var dateStr = new Date().toUTCString(),
            oneWeekDataStr = new Date((new Date(dateStr).getTime() + 7 * 24 * 60 * 60 * 1000)).toUTCString()

        var job = {
            createdAt: dateStr,

            createdMili: new Date(dateStr).getTime(),

            title: title.val(),

            description: description.val(),

            position: position.text(),

            city: city.val(),

            country: country.text(),

            category: category.text(),

            salary: salary.text(),

            expiredAt: oneWeekDataStr,

            expiredMili: new Date(oneWeekDataStr).getTime(),

            companyId: window.localStorage.getItem("companyEmail"),

            companyName: window.localStorage.getItem("companyName"),

            requirement: requirement.val(),
        }

        decreaseNumberOfJobsThisWeek(window.localStorage.getItem("companyEmail")).then(function(){
            var randomId = new Date().getTime().toString();
            
            var jobId = job.category + "-" + randomId;

            var fullPath = userEmail + "/" + jobId

            addToStorage(companyFirstJobImage, fullPath)

            .then(function(url) {

                addToDatabase(job, url, jobId, fullPath)

                .then(function() {

                    GoToFinalStep()
                })

            })
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

function GoToFinalStep(){
    $("#right-overlay").removeClass("mobile-step-3-right-overlay-translate")
    $("#right-overlay").addClass("mobile-step-3-right-overlay-translate")

    $("#right-overlay").removeClass("mobile-step-2-right-overlay-translate")

    $("#company-access-dashboard").removeClass("show-company-access-dashboard")
    $("#company-access-dashboard").addClass("show-company-access-dashboard")

    $("#company-post-first-job-holder").removeClass("show-company-post-first-job-holder")

    $("#step-nav-point-1").removeClass("choose-step-nav-point")
    $("#step-nav-point-2").removeClass("choose-step-nav-point")
    $("#step-nav-point-3").removeClass("choose-step-nav-point")
    $("#step-nav-point-3").addClass("choose-step-nav-point")

    $("#mobile-step-nav-point-1").removeClass("choose-step-nav-point")
    $("#mobile-step-nav-point-2").removeClass("choose-step-nav-point")
    $("#mobile-step-nav-point-3").removeClass("choose-step-nav-point")
    $("#mobile-step-nav-point-3").addClass("choose-step-nav-point")
}


var autocompleteCityId = $("#crf-company-city")

autocompleteCityId.focus(function(){
  $(this).attr('autocomplete', 'new-password')
})

var autocompleteJobCityId = $("#pfj-job-city")

autocompleteJobCityId.focus(function(){
    $(this).attr('autocomplete', 'new-password')
  })
  

function decreaseNumberOfJobsThisWeek(userEmail){
    
    var firestore = firebase.firestore()
  
    // var settings = { timestampsInSnapshots: true};
  
    // firestore.settings(settings);
    
    return firestore.runTransaction(transaction => {
        return transaction.get(firestore.collection('companies').doc(userEmail)).then(function(doc){
            if(!doc.exists){
                throw "document doesn't exist"
            }

            var newNumberOfJobsThisWeek = doc.data().numberOfJobsThisWeek - 1

            transaction.update(firestore.collection('companies').doc(userEmail), {numberOfJobsThisWeek: newNumberOfJobsThisWeek})
        })
    })
}



function addToStorage(file, fullPath) {
    var storage = firebase.storage();
    
    var storageRef = storage.ref(fullPath);
  
    return storageRef.put(file)
  
      .then(function(snapshot) {
  
        return snapshot.ref.getDownloadURL();
  
      });
  
}
  

function addToDatabase(job, url, jobId, fullPath) {

    job.image = url;

    job.fullPath = fullPath

    return job_offers_db.doc(jobId).set(job, {merge: true});
}

function GoToDashboard(){
    window.location = "/"
}


function ChooseCompanyRegistSelectCountry(){
    $("#company-regist-select-country-dropdown").slideToggle(250)
    $("#jp-fb-location-holder").slideUp(250)
    $("#jp-fb-category-holder").slideUp(250)
    $("#jp-fb-country-holder").slideUp(250)
}

function ChoosePfjCategoryButton(){
    $("#pfj-category-holder").slideToggle(250)
    $("#pfj-country-holder").slideUp(250)
    $("#pfj-type-holder").slideUp(250)
    $("#pfj-salary-holder").slideUp(250)
}

function ChoosePfjCountryButton(){
    $("#pfj-country-holder").slideToggle(250)
    $("#pfj-category-holder").slideUp(250)
    $("#pfj-type-holder").slideUp(250)
    $("#pfj-salary-holder").slideUp(250)
}

function ChoosePfjTypeButton(){
    $("#pfj-type-holder").slideToggle(250)
    $("#pfj-category-holder").slideUp(250)
    $("#pfj-country-holder").slideUp(250)
    $("#pfj-salary-holder").slideUp(250)
}

function ChoosePfjSalaryButton(){
    $("#pfj-salary-holder").slideToggle(250)
    $("#pfj-category-holder").slideUp(250)
    $("#pfj-type-holder").slideUp(250)
    $("#pfj-country-holder").slideUp(250)
}

function SlideToLeft(){
    if ($("#mobile-our-packages-holder").scrollLeft() <= 325){
        $("#mobile-our-packages-holder").animate({
            scrollLeft: $("#mobile-package-holder-free").position().left
        }, 500)
    }

    else if ($("#mobile-our-packages-holder").scrollLeft() > 325){
        $("#mobile-our-packages-holder").animate({
            scrollLeft: 325
        }, 500)
    }
}

function SlideToRight(){
    if ($("#mobile-our-packages-holder").scrollLeft() < 325){
        $("#mobile-our-packages-holder").animate({
            scrollLeft: 325
        }, 500)
    }

    else if ($("#mobile-our-packages-holder").scrollLeft() >= 325){
        $("#mobile-our-packages-holder").animate({
            scrollLeft: 650
        }, 500)
    }
}