var email = $("#su-email")

var comdb = firestore.collection("companies")

var signUp = $("#su")
    
signUp.on("click", SignUp)

var autocompleteCityId = $("#location")

autocompleteCityId.focus(function(){
  $(this).attr('autocomplete', 'new-password')
})

var cityInput = document.getElementById("location")

var autocompleteCompanyCityAPI = new google.maps.places.Autocomplete(cityInput)


function ValidationEmail(value){
    var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return value.match(pattern)

}

function CheckPasswordIfValid(password){

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

function SignUp(e){
    e.preventDefault()
    // $("#su-complete-panel-holder").removeClass("show-su-complete-panel-holder")
    // $("#su-complete-panel-holder").addClass("show-su-complete-panel-holder")
    var companyName = $("#company-name"),
        comlocation = $("#location"),
        email = $("#su-email"),
        password = $("#password"),
        country = $("#su-country"),
        repassword = $("#repassword")

    var allFilled = true


    if(companyName.val() === ""){
        $("#warning-incorrect-input-for-su-name").removeClass("show-warning-incorrect-input")
        $("#warning-incorrect-input-for-su-name").addClass("show-warning-incorrect-input")

        allFilled = false
    }

    if(email.val().toLowerCase() === "" || !ValidationEmail(email.val().toLowerCase())){
        $("#warning-incorrect-input-for-su-email").removeClass("show-warning-incorrect-input")
        $("#warning-incorrect-input-for-su-email").addClass("show-warning-incorrect-input")

        allFilled = false
    }

    if(country.text() === "Select country *"){
        $("#warning-incorrect-input-for-su-country").removeClass("show-warning-incorrect-input")
        $("#warning-incorrect-input-for-su-country").addClass("show-warning-incorrect-input")

        allFilled = false
    }

    if(comlocation.val() === ""){
        $("#warning-incorrect-input-for-su-location").removeClass("show-warning-incorrect-input")
        $("#warning-incorrect-input-for-su-location").addClass("show-warning-incorrect-input")

        allFilled = false
    }


    if(password.val() === "" || !CheckPasswordIfValid(password.val())){
        $("#warning-incorrect-input-for-su-password").removeClass("show-warning-incorrect-input")
        $("#warning-incorrect-input-for-su-password").addClass("show-warning-incorrect-input")

        allFilled = false
    }

    if(repassword.val() === ""){
        $("#warning-incorrect-input-for-su-repass").removeClass("show-warning-incorrect-input")
        $("#warning-incorrect-input-for-su-repass").addClass("show-warning-incorrect-input")

        allFilled = false
    }

    else if (repassword.val() !== password.val()){
        $("#warning-incorrect-input-for-su-repass").removeClass("show-warning-incorrect-input")
        $("#warning-incorrect-input-for-su-repass").addClass("show-warning-incorrect-input")
        $("#warning-incorrect-input-for-su-repass>p").text("Does not match")
        allFilled = false
    }

    if(allFilled){
        //Update the registered company into database
        comdb.doc(email.val().toLowerCase()).get().then(function(doc){
            if(doc.exists){
                console.log("This email has been registered!")
            }

            else{
                comdb.doc(email.val().toLowerCase()).set({
                    company_name: companyName.val(),
                    location: comlocation.val(),
                    country: country.text(),
                    email: email.val().toLowerCase(),
                    createdAt: new Date().toUTCString(),
                    plan: 'free_package',
                    numberOfJobsThisWeek: 1
                })
                .then(function(){
                    firebase.auth().createUserWithEmailAndPassword(email.val().toLowerCase(), password.val())
                    .then(function(userCre){
                        window.localStorage.setItem('companyEmail', email.val().toLowerCase())

                        $("#su-complete-panel-holder").removeClass("show-su-complete-panel-holder")
                        $("#su-complete-panel-holder").addClass("show-su-complete-panel-holder")
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


function ChooseSuCountry(country){
    $("#su-country").text(country)
    $('#warning-incorrect-input-for-su-country').removeClass('show-warning-incorrect-input')

    if(country === 'Sweden'){
        autocompleteCompanyCityAPI.setComponentRestrictions({
          'country': 'se'
        })
      }
    
      else if (country === 'Finland'){
        autocompleteCompanyCityAPI.setComponentRestrictions({
          'country': 'fi'
        })
      }
    
      else if (country === 'Norway'){
        autocompleteCompanyCityAPI.setComponentRestrictions({
          'country': 'no'
        })
      }
    
      else if (country === 'Denmark'){
        autocompleteCompanyCityAPI.setComponentRestrictions({
          'country': 'dk'
        })
      }
}