var firestore = firebase.firestore();
var form = document.createJobForm;
var randomId = '';

createJobForm.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log(currentUser);
  var now = new Date();
  var str = now.getUTCFullYear().toString() + "/" +
    (now.getUTCMonth() + 1).toString() +
    "/" + now.getUTCDate() + " " + now.getUTCHours() +
    ":" + now.getUTCMinutes() + ":" + now.getUTCSeconds();
  var job = {
    title: e.target.title.value,
    category: e.target.position.value,
    city: e.target.location.value,
    position: e.target.category.value,
    description: e.target.description.value,
    company: currentUser.company,
    companyId: currentUser.uid,
    createdAt: str,
    companyMail: currentUser.email
  };
  console.log(job);
  var imageFile = e.target.image.files.item(0);
  addToStorage(imageFile)
    .then(function(url) {

      addToDatabase(job, url)
        .then(function() {
          console.log("success");
        });
    })
    .catch(function(err) {
      console.log(err);
    });
});

function addToStorage(file) {
  var storage = firebase.storage();
  randomId = new Date().getTime().toString();
  var storageRef = storage.ref(currentUser.country + '/' + randomId);
  return storageRef.put(file)
    .then(function(snapshot) {
      return snapshot.ref.getDownloadURL();
    });
}

function addToDatabase(job, url) {
  job['image'] = url;
  var jobs = {};
  jobs[randomId] = job;
  return firestore.collection(currentUser.country).doc('jobs').set(jobs, {merge: true});
}