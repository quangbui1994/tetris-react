var firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

var articlesToShow = [];
var section = document.getElementById("section-title").innerText.toLowerCase();
var currentCategory = document.getElementById("category-title");
//var sectionId = document.getElementById("section-id").innerText;

var showMoreBtn = document.getElementById("show-more");
var categoryBtn = document.getElementsByClassName('gb-category');

showMoreBtn.addEventListener("click", toggleItems);

for (var i = 0; i < categoryBtn.length; i++) {
  categoryBtn[i].addEventListener("click", setActiveCategory);
}

fetchData(section, "hot");

/**
 * Fetches articles from section and certain category.
 *
 * @param country
 * @param category
 */
function fetchData(country, category) {
  firestore.collection(country).doc(category).onSnapshot(function (snapshot) {
    articlesToShow = Object.values(snapshot.data() || {});
    showData(articlesToShow);
  });
}

/**
 * Renders fetched data into the DOM.
 *
 * @param articles
 */
function showData(articles) {
  var articleContainer = document.getElementById("article-container");
  articleContainer.innerHTML = "";
  var contentArray = [];
  for (var i = 0; i < articles.length; i++) {
    var gbCard50 = "<div class=\"gb-card-50\">\n" +
      "        <div class=\"gb-card-50-bg\" style='background-image: url(" + articles[i].image + ")'></div>\n" +
      "        <div class=\"gb-card-50-overlay\"></div>\n" +
      "        <h2 class=\"gb-card-50-title\">" + articles[i].title + "</h2>\n" +
      "        <div class=\"gb-black-popup\">\n" +
      "            <div class=\"gb-details gb-fade-in-bottom\">\n" +
      "                <p>" + articles[i].description + "</p>\n" +
      "                <a class=\"gb-btn gb-btn-small gb-btn-white\" target=\"_blank\" href=\"" + articles[i].link + "\">View article</a>\n" +
      "            </div>\n" +
      "        </div>\n" +
      "    </div>";
    contentArray.push(gbCard50);
  }
  articleContainer.innerHTML = contentArray.join(" ");
}

/**
 * Show or hide additional categories.
 */
function toggleItems() {
  var hiddenItems = document.getElementsByClassName("show-more");
  if (this.classList.contains("turned")) {
    this.classList.remove("turned");
    for (var i = 0; i < hiddenItems.length; i++) {
      hiddenItems[i].classList.add("hidden");
    }
  } else {
    this.classList.add("turned");
    for (var j = 0; j < hiddenItems.length; j++) {
      hiddenItems[j].classList.remove("hidden");
    }
  }
}

/**
 * Sets active category and fetches the data.
 */
function setActiveCategory() {
  removeClasses();
  this.classList.add("active");
  fetchData(section, this.id);
  currentCategory.innerText = this.childNodes[3].innerText;
}

/**
 * Removes active class from all categories.
 */
function removeClasses() {
  for (var i = 0; i < categoryBtn.length; i++) {
    categoryBtn[i].classList.remove("active")
  }
}