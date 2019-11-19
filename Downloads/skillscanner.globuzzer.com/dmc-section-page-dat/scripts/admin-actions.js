var form = document.adminForm;

var logoutBtn = document.getElementById("logout");

var randomId = '';

var successMsg = document.getElementById("success");

var errorMsg = document.getElementById("error");


//Function applied to onclick event of country-section-dropdown-content options (source file is navbar.php)
function DropdownSelectCountry(countryIndex){
  var countryFlag = document.getElementById("country-flag"),
      countryName = document.getElementById("country-name")
  

  switch (countryIndex){
    case 0:
      countryName.innerText = "Sweden"
      countryFlag.src = "images/SE.png"
      document.getElementById("redirect").href= "http://staging1.globuzzer.com/SkillScanner-remake/index.html?country=SE"
      break

    case 1:
      countryName.innerText = "Finland"
      countryFlag.src = "images/FI.png"
      document.getElementById("redirect").href= "http://staging1.globuzzer.com/SkillScanner-remake/index.html?country=FI"
      break

    case 2:
      countryName.innerText = "Norway"
      countryFlag.src = "images/NO.png"
      document.getElementById("redirect").href= "http://staging1.globuzzer.com/SkillScanner-remake/index.html?country=NO"
      break

    case 3:
      countryName.innerText = "Denmark"
      countryFlag.src = "images/DK.png"
      document.getElementById("redirect").href= "http://staging1.globuzzer.com/SkillScanner-remake/index.html?country=DK"
      break
  }

}
//end of DropdownSelectCountry



firebase.auth().onAuthStateChanged(function(user) {

  if (!user) {

    //window.location = "admin-login.php";

  }

});



form.addEventListener("submit", addArticle);

logoutBtn.addEventListener("click", logout);



function logout() {

  firebase.auth().signOut()

    .catch(function() {

      console.log('sign out error');

    });

}



function addArticle(e) {

  e.preventDefault();

  var target = e.target

  let isEmpty= true;

  Array.from(target.querySelectorAll('input, textarea')).forEach(input=>{

    if (input.value===""&& input.parentNode.parentNode.style.display!=="none"){

      isEmpty=false;

    } 

  })

if( isEmpty===false) {

  alert("fields are empty!!")

  return;

}



  successMsg.style.display = "none";

  var now = new Date();

  var str = now.getUTCFullYear().toString() + "/" +

          (now.getUTCMonth() + 1).toString() +

          "/" + now.getUTCDate() + " " + now.getUTCHours() +

          ":" + now.getUTCMinutes() + ":" + now.getUTCSeconds();


  var dateStr = new Date().toUTCString(),
    oneWeekDataStr = new Date((new Date(dateStr).getTime() + 7 * 24 * 60 * 60 * 1000)).toUTCString()


  target.submitArticle.value = 'Loading...';

  target.submitArticle.disabled = true;

  target.submitArticle.classList.add("disabled");
  
  var currentCountry = document.getElementById("country-name")

  var section

  if(currentCountry.innerText === "Sweden"){
    section = "SE"
  }

  else if(currentCountry.innerText === "Finland"){
    section = "FI"
  }

  else if(currentCountry.innerText === "Norway"){
    section = "NO"
  }
  
  else if(currentCountry.innerText === "Denmark"){
    section = "DK"
  }


  var category = target.category.value;

  console.log (category)

  var article = {

    createdAt: dateStr,

    title: target.querySelector('input[name="atitle"]').value,

    description: target.querySelector('textarea[name="adescription"]').value,

    author: target.querySelector('input[name="aauthor"]').value,

    link: target.querySelector('input[name="alink"]').value,

    miliCreateAt: new Date(dateStr).getTime(),

    category: target.category.value

  };

  var feed = {

    createdAt: dateStr,

    title: target.querySelector('input[name="ftitle"]').value,

    category: target.querySelector('input[name="fcategory"]').value,

    location: target.querySelector('input[name="flocation"]').value,

    description: target.querySelector('textarea[name="fdescription"]').value,

    link: target.querySelector('input[name="flink"]').value

  };

  var job = {

    createdAt: dateStr,

    title: target.querySelector('input[name="j-title"]').value,

    category: document.getElementsByName("j-category")[0].value,

    description: target.querySelector('textarea[name="j-description"]').value,

    position: document.getElementsByName("j-position")[0].value,

    city: document.getElementsByName("j-city")[0].value,

    country: document.getElementsByName("j-country")[0].value,

    salary: document.getElementsByName("j-salary")[0].value,

    link: target.querySelector('input[name="j-link"]').value,

    expiredAt: oneWeekDataStr,

    companyName: "Globuzzer",

    companyId: "admin@skillscanner.com"
  };


  var event = {

    createdAt: dateStr,

    title: target.querySelector('input[name="etitle"]').value,

    category: target.querySelector('input[name="ecategory"]').value,

    description: target.querySelector('textarea[name="edescription"]').value,

    location: target.querySelector('input[name="elocation"]').value,

    date: target.querySelector('input[name="edate"]').value,

    link: target.querySelector('input[name="elink"]').value,

    miliCreateAt: new Date(dateStr).getTime()

  };

  

  let tag1 = document.getElementsByClassName("etag");

  Array.from(tag1).forEach((tag,index) => {

    event["tag"+(index+1)]= tag.value

  });

  console.log(event);

  var team = {

    createdAt: str,

    title: target.querySelector('input[name="ttitle"]').value,

    description: target.querySelector('textarea[name="tdescription"]').value,

    link: target.querySelector('input[name="tlink"]').value,

    position: target.querySelector('input[name="tposition"]').value,

    city: target.querySelector('input[name="tcity"]').value,

    category: target.querySelector('input[name="tcategory"]').value

  };

  // console.log(team);

  // if (category==="Articles"){
  //   article=feed

  //   category = "articles"
  // } 

  if (category==="events"){
    article=event
    
    category = "events"
  } 

  if (category==="jobs") {
    article = job

    category = "job_offers"
  }

  if (category==="team"){
    article=team

    category = "team"
  } 

  var imageFile = target.image.files.item(0);

  if(target.image.files[0].size > 2621440){

    alert("File is too big!");

    target.submitArticle.value = 'Submit';

    target.submitArticle.disabled = false;

    target.submitArticle.classList.remove("disabled");

    return;

  }

  var fullPath

  randomId = new Date().getTime().toString();

  var articleId = "Globuzzer-" + category + "-" + randomId

  addToStorage(section, imageFile, articleId)

    .then(function(url) {

      addToDatabase(articleId, category, article, url)

        .then(function() {

          target.submitArticle.value = 'Submit';

          target.submitArticle.disabled = false;

          target.submitArticle.classList.remove("disabled");

          errorMsg.style.display = "none";

          successMsg.style.display = "block";

        });

    })

    .catch(function(err) {

      console.log(err);

      errorMsg.innerHTML = "Error! Please contact IT.";

      errorMsg.style.display = "block";

    })

}



function addToStorage(section, file, articleId) {

  var storage = firebase.storage();

  var storageRef = storage.ref(section + '/' + articleId);

  fullPath = section + '/' + articleId

  return storageRef.put(file)

    .then(function(snapshot) {

      return snapshot.ref.getDownloadURL();

    });

}



function addToDatabase(articleId, category, article, url) {

  var firestore = firebase.firestore();

  var settings = { timestampsInSnapshots: true};

  firestore.settings(settings);

  article.image = url;

  article.fullPath = fullPath

  
  return firestore.collection(category).doc(articleId).set(article, {merge: true});

}