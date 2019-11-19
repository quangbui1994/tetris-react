const firestore = firebase.firestore();

function ClickSignUp(){
    $("#su-panel-holder").removeClass("show-su-panel-holder")
    $("#su-panel-holder").addClass("show-su-panel-holder")

    $("#si-panel-holder").removeClass("hide-si-panel-holder")
    $("#si-panel-holder").addClass("hide-si-panel-holder")
}

function ClickSignIn(){
    $("#su-panel-holder").removeClass("show-su-panel-holder")
    $("#si-panel-holder").removeClass("hide-si-panel-holder")
}


var signIn = $("#si")

signIn.on("click", SignIn)

function SignIn(e){
    e.preventDefault()
   
    var allFilled = true,
        email = $("#si-email").val(),
        password = $("#si-password").val(),
        errorDisplay = $("#error-display")
    
    if(email === ""){
        $("#warning-incorrect-input-for-si-email").removeClass("show-warning-incorrect-input")
        $("#warning-incorrect-input-for-si-email").addClass("show-warning-incorrect-input")

        allFilled = false
    }

    if(password === ""){
        $("#warning-incorrect-input-for-si-password").removeClass("show-warning-incorrect-input")
        $("#warning-incorrect-input-for-si-password").addClass("show-warning-incorrect-input")

        allFilled = false
    }

    errorDisplay.empty()

    if(allFilled){
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(userCre) {
         
            if(userCre.user.uid !== "trj4gducovfjXGBRjtbGI2LlSg83"){
                window.location = "/company-dashboard/"
            }

            else if(userCre.user.uid === "trj4gducovfjXGBRjtbGI2LlSg83"){
                window.location = "/admin-dashboard/"
            }
            
        })
        .catch(function(err) {
            console.log(err);
    
            if(err.code === "auth/wrong-password"){
                errorDisplay.text("your email and password do not match")
            }
            
            if(err.code === "auth/invalid-email"){
                $("#warning-incorrect-input-for-si-email").removeClass("show-warning-incorrect-input")
                $("#warning-incorrect-input-for-si-email").addClass("show-warning-incorrect-input")
            }
    
            if(err.code === "auth/user-not-found"){
                errorDisplay.text("User Not Found!")
            }
        });
    }
}

$("#su-country-content-holder").hide()

$("#su-country-button").on("click", function(){
    $("#su-country-content-holder").slideToggle(250)
})


