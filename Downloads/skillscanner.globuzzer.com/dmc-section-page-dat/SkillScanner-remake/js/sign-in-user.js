var form = document.signIn;

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var email = e.target.email.value;
  var password = e.target.password.value;
  console.log(password);

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    // ...
  });
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.location = "company-dashboard.html"; // change links accordingly!!!
  }
});