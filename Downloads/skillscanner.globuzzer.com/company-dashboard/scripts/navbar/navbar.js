firebase.auth().onAuthStateChanged(function(user) {
    if(!user || (user.uid === "trj4gducovfjXGBRjtbGI2LlSg83")){
        window.location = "/company-login/c-sign-in-up.html"
    }
})


function openAccountSettingsMobile(){
    
    
    // $("#mobile-categories-holder").slideUp(250, function(){
    //     $("#mobile-account-settings-holder").slideToggle(250)
    // })
}


function openCategoriesMobile(){
    console.log('hello')
    $("#mobile-account-settings-holder").slideUp(250, function(){
        $("#mobile-categories-holder").slideToggle(250)
    })

}


function Logout(){
    firebase.auth().signOut()
    .catch(function() {
      console.log('sign out error');
    });
}