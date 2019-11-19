function SendResetPasswordEmail(){
    firebase.auth().sendPasswordResetEmail($("#email").val()).then(function(){
        console.log("sent")
    })
    .catch(function(err){
        console.log(err)
    })
}