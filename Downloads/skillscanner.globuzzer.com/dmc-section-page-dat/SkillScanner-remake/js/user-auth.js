var logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", logout);

var currentUser = null;

function logout() {
  firebase.auth().signOut()
    .catch(function() {
      console.log('sign out error');
    });
}

firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
    window.location = "company-dashboard-sign-in.html"; // change links accordingly!!!
    currentUser = null;
  } else {
    var firestore = firebase.firestore();
    var settings = {/* your settings... */ timestampsInSnapshots: true};
    firestore.settings(settings);
    firestore.collection('companyUsers').doc(user.uid).get().then(function (snapshot) {
      currentUser = snapshot.data();
      currentUser['uid'] = user.uid;
      console.log(currentUser);
      fetchCompanyJobs(currentUser.country);
    });
  }
});