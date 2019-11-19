var loginForm = document.userLogin;

firebase.auth().onAuthStateChanged(function(user) {
  if (user && user.uid === "trj4gducovfjXGBRjtbGI2LlSg83") {
     window.location = "section-admin.php";
  }

});

loginForm.addEventListener("submit", signInUser);

function signInUser(e) {
  e.preventDefault();
  firebase.auth().signInWithEmailAndPassword(e.target.email.value, e.target.password.value)
    .then(function() {
      console.log("success!");
    })
    .catch(function(err) {
      console.log(err);
    });
}