var logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", logout);

function logout() {
  firebase.auth().signOut()
    .catch(function() {
      console.log('sign out error');
    });
}

firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
    window.location = "/company-login/c-sign-in-up.html"; // change links accordingly!!!
  }

  else{
    console.log(user.uid)
  }
});