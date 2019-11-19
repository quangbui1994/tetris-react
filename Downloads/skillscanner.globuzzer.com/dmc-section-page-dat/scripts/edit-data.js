var firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);
var storage = firebase.storage();

var params = getQueryParams(location.search);
var section = params.section;
var category = params.category;
var articleId = params.article;
var form = document.editForm;
var currentImage;
var successField = document.getElementById("success");
var errorField = document.getElementById("error");

form.addEventListener("submit", updateArticle);

firestore.collection(section).doc(category).onSnapshot(function (snapshot) {
  var article = snapshot.data()[articleId];
  if (category === "events") {
    let text = "";

    //document.getElementsByClassName("Events")[0].innerHTML += text
  }
  adjustFieldValues(article);
});


/**
 * Updates current article in the database.
 * @param e
 */
function updateArticle(e) {
  e.preventDefault();
  let target = e.target;
  setLoadingState();
  var article = {
    title: target.querySelector('input[name="atitle"]').value,
    description: target.querySelector('textarea[name="adescription"]').value,
    author: target.querySelector('input[name="aauthor"]').value,
    link: target.querySelector('input[name="alink"]').value
  };
  var feed = {
    title: target.querySelector('input[name="ftitle"]').value,
    category: target.querySelector('input[name="fcategory"]').value,
    location: target.querySelector('input[name="flocation"]').value,
    description: target.querySelector('textarea[name="fdescription"]').value,
    link: target.querySelector('input[name="flink"]').value
  };
  var job = {
    title: target.querySelector('input[name="jtitle"]').value,
    category: target.querySelector('input[name="jcategory"]').value,
    description: target.querySelector('textarea[name="jdescription"]').value,
    company: target.querySelector('input[name="jcompany"]').value,
    position: target.querySelector('input[name="jposition"]').value,
    city: target.querySelector('input[name="jcity"]').value,
    link: target.querySelector('input[name="jlink"]').value
  };
  var event = {
    title: target.querySelector('input[name="etitle"]').value,
    category: target.querySelector('input[name="ecategory"]').value,
    description: target.querySelector('textarea[name="edescription"]').value,
    location: target.querySelector('input[name="elocation"]').value,
    date: target.querySelector('input[name="edate"]').value,
    link: target.querySelector('input[name="elink"]').value
  };
  let count = 1;
  while (target.querySelector('input[name="etag' + count + '"]')) {
    event["tag" + count] = target.querySelector('input[name="etag' + count + '"]').value;
    count++;
  }


  var team = {
    title: target.querySelector('input[name="ttitle"]').value,
    description: target.querySelector('textarea[name="tdescription"]').value,
    link: target.querySelector('input[name="alink"]').value
  };
  if (category === "feeds") article = feed;
  if (category === "events") article = event;
  if (category === "jobs") article = job;
  if (category === "team") article = team;
  var image = form.image.files.item(0);
  if (form.image.files[0].size > 1048576) {
    alert("File is too big!");
    target.submitArticle.value = 'Submit';
    target.submitArticle.disabled = false;
    target.submitArticle.classList.remove("disabled");
    return;
  }
  if (!image) {
    article['image'] = currentImage;
    addToDataBase(article);
  } else {
    addToStorage(image).then(function (url) {
      article['image'] = url;
      addToDataBase(article);
    })
  }
}

/**
 * Adds image to Storage.
 *
 * @param image
 * @returns {*}
 */
function addToStorage(image) {
  var storageRef = storage.ref(section + '/' + articleId);
  return storageRef.put(image)
    .then(function (snapshot) {
      return snapshot.ref.getDownloadURL();
    }).catch(function (err) {
      console.log(err);
      hideSuccess();
      showError("Error with file upload! Please contact IT.");
      errorMsg.innerHTML = "Error! Please contact IT.";
      errorMsg.style.display = "block";
    })
}

/**
 * Update whole database entry.
 *
 * @param article
 */
function addToDataBase(article) {
  firestore.collection(section).doc(category).update({
    [articleId]: article
  }).then(function () {
    showSuccess();
    hideError();
  }).catch(function (err) {

    console.log(err);
    errorMsg.innerHTML = "Error! Please contact IT.";
    errorMsg.style.display = "block";
  })
}

/**
 * Update database entry without image.
 * @param article
 */
function addToDataBaseWithoutImage(article) {
  firestore.collection(section).doc(category).update({
    [articleId + '.title']: article.title,
    [articleId + '.description']: article.description,
    [articleId + '.link']: article.link
  }).then(function () {
    showSuccess();
    hideError();
  }).catch(function (err) {
    console.log(err);
    errorMsg.innerHTML = "Error! Please contact IT.";
    errorMsg.style.display = "block";
  })
}

/**
 * Sets submit button into loading state
 */
function setLoadingState() {
  form.submitArticle.value = 'Loading...';
  form.submitArticle.disabled = true;
  form.submitArticle.classList.add("disabled");
}

/**
 * Resets submit button.
 */
function resetState() {
  form.submitArticle.value = 'Save Article';
  form.submitArticle.disabled = false;
  form.submitArticle.classList.remove("disabled");
}

/**
 * Hides error field.
 */
function hideError() {
  errorField.style.display = "none";
}

/**
 * Shows error field with message.
 *
 * @param message
 */
function showError(message) {
  errorField.style.display = "block";
  errorField.innerText = message;
  resetState();
}

/**
 * Hides success field.
 */
function hideSuccess() {
  successField.style.display = "none";
}

/**
 * Shows success field.
 */
function showSuccess() {
  successField.style.display = "block";
  successField.innerText = "Updated successfully!";
  resetState();
}

/**
 * Fills out field values.
 *
 * @param article
 */

function adjustFieldValues(article) {
  currentImage = article.image;
  if (category === "articles") {

    form.querySelector('input[name="atitle"]').value = article.title;
    form.querySelector('textarea[name="adescription"]').value = article.description;
    form.querySelector('input[name="aauthor"]').value = article.author;
    form.querySelector('input[name="alink"]').value = article.link;
  }


  if (category === "events") {
    console.log(article);
    for (let key in article) {
      if (key !== "description" && key !== "image") {
        try {
          form.querySelector('input[name="e' + key + '"]').value = article[key]
        }
        catch (err) {
        }
      }


      else
        form.querySelector('textarea[name="edescription"]').value = article.description;
    }
  }


  if (category === "jobs") {

    form.querySelector('input[name="jtitle"]').value = article.title;
    form.querySelector('input[name="jcategory"]').value = article.category;
    form.querySelector('textarea[name="jdescription"]').value = article.description;
    form.querySelector('input[name="jcompany"]').value = article.company;
    form.querySelector('input[name="jposition"]').value = article.position;
    form.querySelector('input[name="jcity"]').value = article.city;
    form.querySelector('input[name="jlink"]').value = article.link;
  }
  if (category === "team") {
    form.querySelector('input[name="ttitle"]').value = article.title;
    form.querySelector('textarea[name="tdescription"]').value = article.description;
    form.querySelector('input[name="alink"]').value = article.link;
  }
  if (category === "feeds") {
    console.log(article)
    form.querySelector('input[name="ftitle"]').value = article.title;
    form.querySelector('input[name="fcategory"]').value = article.category;
    form.querySelector('input[name="flocation"]').value = article.location;
    form.querySelector('textarea[name="fdescription"]').value = article.description;
    form.querySelector('input[name="flink"]').value = article.link;
  }

}

/**
 * Extracts query params of URL.
 *
 * @param qs
 * @returns {{}}
 */
function getQueryParams(qs) {
  qs = qs.split('+').join(' ');

  var params = {},
    tokens,
    re = /[?&]?([^=]+)=([^&]*)/g;

  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }

  return params;
}