var firestore = firebase.firestore();

const settings = {timestampsInSnapshots: true};

firestore.settings(settings);

var currentSection = "SE";

var currentCategory = "jobs";

var categorySelect = document.chooseSection.category;

var sortObj = {
  categoryFilter: [],
  countryFilter: []
}

var jobData

//Function applied to onclick event of country-section-dropdown-content options (source file is navbar.php)
function DropdownSelectCountry(countryIndex){
  var countryFlag = document.getElementById("country-flag"),
      countryName = document.getElementById("country-name")
  

  switch (countryIndex){
    case 0:
      countryName.innerText = "Sweden"
      countryFlag.src = "images/SE.png"
      document.getElementById("redirect").href= "http://staging1.globuzzer.com/SkillScanner-remake/index.html?country=SE"
      adjustData("section", "SE");
      break

    case 1:
      countryName.innerText = "Finland"
      countryFlag.src = "images/FI.png"
      document.getElementById("redirect").href= "http://staging1.globuzzer.com/SkillScanner-remake/index.html?country=FI"
      adjustData("section", "FI");
      break

    case 2:
      countryName.innerText = "Norway"
      countryFlag.src = "images/NO.png"
      document.getElementById("redirect").href= "http://staging1.globuzzer.com/SkillScanner-remake/index.html?country=NO"
      adjustData("section", "NO");
      break

    case 3:
      countryName.innerText = "Denmark"
      countryFlag.src = "images/DK.png"
      document.getElementById("redirect").href= "http://staging1.globuzzer.com/SkillScanner-remake/index.html?country=DK"
      adjustData("section", "DK");
      break
  }

}
//end of DropdownSelectCountry


categorySelect.addEventListener("change", function () {

  adjustData("category", this.value);

});



fetchData(currentCategory);



let keyword = () => {

  fetchData(currentCategory, document.getElementsByName("search")[0].value, document.getElementsByName("filter")[0].value);

};

document.getElementsByName("search")[0].addEventListener("keydown", keyword, false);

document.getElementsByName("search-btn")[0].addEventListener("click", keyword);

// document.getElementsByName("filter")[0].addEventListener("change", keyword);

document.getElementById("category-filter").addEventListener("change", function(e){
  sortObj.categoryFilter.length = 0

  if(!sortObj.categoryFilter.includes(e.target.value)){
    sortObj.categoryFilter.push(e.target.value)
  }

  if(e.target.value === "default"){
    sortObj.categoryFilter.length = 0
  }

  showJobs(jobData, document.getElementsByName("search")[0].value, sortObj)
})

document.getElementById("country-filter").addEventListener("change", function(e){
  sortObj.countryFilter.length = 0

  if(!sortObj.countryFilter.includes(e.target.value)){
    sortObj.countryFilter.push(e.target.value)
  }

  if(e.target.value === "default"){
    sortObj.countryFilter.length = 0
  }

  showJobs(jobData, document.getElementsByName("search")[0].value, sortObj)
})


/**

 * Updates current section and category.

 *

 * @param type

 * @param value

 */

function adjustData(type, value) {

  if (type === "section") {

    document.getElementById("redirect").href = "http://staging1.globuzzer.com/SkillScanner-remake/index.html?country=" + value

    document.getElementById("country-flag").src = "images/" + value + ".png"

    currentSection = value;

  } else {

    currentCategory = value;

  }



  fetchData(currentCategory, document.getElementsByName("search")[0].value);

}



/**

 * Fetches data of current section and category.

 *

 * @param section

 * @param category

 */

function fetchData(category, keyword = null, sort) {
  if(category === "jobs")
    category = "job_offers"

  firestore.collection(category).get().then(function (querySnapshop) {

    var articlesToShow = []

    jobData = []

    if(category !== "job_offers")
      querySnapshop.forEach(function(doc) {
          articlesToShow.push({id: doc.id, data: doc.data()})
      })

    else
      querySnapshop.forEach(function(doc) {
        if(doc.data().companyId === "admin@globuzzer.com")
          jobData.push({id: doc.id, data: doc.data()})
      })

    
    if (category === "articles") showArticles(articlesToShow, keyword, sort);

    if (category === "job_offers") showJobs(jobData, keyword, sortObj);

    if (category === "feeds") showFeeds(articlesToShow, keyword, sort);

    if (category === "events") showEvents(articlesToShow, keyword, sort);

    if (category === "team") showTeam(articlesToShow, keyword, sort);

  });

}



/**

 * Inserts articles into the DOM.

 *

 * @param articles

 */

function showArticles(articles, keyword = null, sort = null) {
  if (!sort) {
    var articleContainer = document.getElementById("article-list");

    articleContainer.innerHTML = "";

    var contentArray = [];

    for (var i = 0; i < articles.length; i++) {
      var gbCard50 = "<li class=\"article-li\">\n" +

        "                    <img src=\"" + articles[i].data.image + "\">\n" +

        "                    <div>\n" +

        "                        <h3>" + articles[i].data.title + "</h3>\n" +

        "                         <p class='small-grey-caption'>Created at: " + articles[i].data.createdAt + "</p>" +

        "<p>" + articles[i].data.author + "</p>" +

        "                        <p>" + articles[i].data.description + "</p>\n" +

        "                        <a href='" + articles[i].data.link + "'>" + articles[i].data.link + "</a>\n" +

        "                        <div class=\"button-container\">\n" +

        "                            <button onclick='deleteArticle(\"" + articles[i].id + "\", \"" + articles[i].data.fullPath + "\")' class=\"button\">Delete</button>\n" +

        "                            <button class=\"button\" onclick='showArticleEdittingTab(\"" + articles[i].id + "\", \"" + articles[i].data.title + "\", \"" + articles[i].data.author +
        "\", \"" + articles[i].data.description + "\", \"" + articles[i].data.link + "\", \"" + articles[i].data.fullPath + "\")'>Edit</button>\n" +

        "                        </div>\n" +

        "                    </div>\n" +

        "                </li>";

      if (keyword === null) contentArray.push(gbCard50);

      else {

        if (gbCard50.indexOf(keyword) > -1) {

          contentArray.push(gbCard50)

        }

      }

    }

    articleContainer.innerHTML = contentArray.join(" ");

  }

  if (sort === "date") {

    var articleContainer = document.getElementById("article-list");

    articleContainer.innerHTML = "";

    var contentArray = [];

    for (var i = 0; i < articles.length; i++) {



      var gbCard50 = articles[i].data.createdAt + "<li class=\"article-li\">\n" +

        "                    <img src=\"" + articles[i].data.image + "\">\n" +

        "                    <div>\n" +

        "                        <h3>" + articles[i].data.title + "</h3>\n" +

        "                         <p class='small-grey-caption'>Created at: " + articles[i].data.createdAt + "</p>" +

        "<p>" + articles[i].data.author + "</p>" +

        "                        <p>" + articles[i].data.description + "</p>\n" +

        "                        <a href='" + articles[i].data.link + "'>" + articles[i].data.link + "</a>\n" +

        "                        <div class=\"button-container\">\n" +

        "                            <button onclick='deleteArticle(\"" + articles[i].id + "\", \"" + articles[i].data.fullPath + "\")' class=\"button\">Delete</button>\n" +

        "                            <button class=\"button\" onclick='showArticleEdittingTab(\"" + articles[i].id + "\", \"" + articles[i].data.title + "\", \"" + articles[i].data.author +
        "\", \"" + articles[i].data.description + "\", \"" + articles[i].data.link + "\", \"" + articles[i].data.fullPath +"\")'>Edit</button>\n" +

        "                        </div>\n" +

        "                    </div>\n" +

        "                </li>";

      if (keyword === null) contentArray.push(gbCard50);

      else {

        if (gbCard50.indexOf(keyword) > -1) {



          contentArray.push(gbCard50)

        }

      }

    }

    articleContainer.innerHTML = contentArray.sort().map(e => e.slice(e.indexOf("<li class=\"article-li\">\n"))

    ).join(" ");

  }



  if (sort = "title") {

    var articleContainer = document.getElementById("article-list");

    articleContainer.innerHTML = "";

    var contentArray = [];

    for (var i = 0; i < articles.length; i++) {



      var gbCard50 = articles[i].data.title + "<li class=\"article-li\">\n" +

        "                    <img src=\"" + articles[i].data.image + "\">\n" +

        "                    <div>\n" +

        "                        <h3>" + articles[i].data.title + "</h3>\n" +

        "                         <p class='small-grey-caption'>Created at: " + articles[i].data.createdAt + "</p>" +

        "<p>" + articles[i].data.author + "</p>" +

        "                        <p>" + articles[i].data.description + "</p>\n" +

        "                        <a href='" + articles[i].data.link + "'>" + articles[i].data.link + "</a>\n" +

        "                        <div class=\"button-container\">\n" +

        "                            <button onclick='deleteArticle(\"" + articles[i].id + "\", \"" + articles[i].data.fullPath + "\")' class=\"button\">Delete</button>\n" +

        "                            <button class=\"button\" onclick='showArticleEdittingTab(\"" + articles[i].id + "\", \"" + articles[i].data.title + "\", \"" + articles[i].data.author +
        "\", \"" + articles[i].data.description + "\", \"" + articles[i].data.link + "\", \"" + articles[i].data.fullPath +"\")'>Edit</button>\n" +

        "                        </div>\n" +

        "                    </div>\n" +

        "                </li>";

      if (keyword === null) contentArray.push(gbCard50);

      else {

        if (gbCard50.indexOf(keyword) > -1) {



          contentArray.push(gbCard50)

        }

      }

    }

    articleContainer.innerHTML = contentArray.sort().map(e => e.slice(e.indexOf("<li class=\"article-li\">\n"))

    ).join(" ");

  }

}


function showArticleEdittingTab(id, title, author, description, link, fullPath){
  //invisible job-edit-tab
  $("#job-edit-tab").removeClass("job-post-edit-container-visible")
  $("#job-edit-tab").removeClass("job-post-edit-container-invisible")
  $("#job-edit-tab").addClass("job-post-edit-container-invisible")

  //invisible event-edit-tab
  $("#event-edit-tab").removeClass("job-post-edit-container-visible")
  $("#event-edit-tab").removeClass("job-post-edit-container-invisible")
  $("#event-edit-tab").addClass("job-post-edit-container-invisible")

  //visible article-edit-tab
  $("#article-edit-tab").removeClass("job-post-edit-container-visible")
  $("#article-edit-tab").removeClass("job-post-edit-container-invisible")
  $("#article-edit-tab").addClass("job-post-edit-container-visible")


  var eTitleNode = $("#e-article-title"),
      eAuthorNode = $('#e-article-author'),
      eDescriptionNode = $("#e-article-description"),
      eLinkNode = $("#e-article-link")

  eTitleNode.val(title)
  eAuthorNode.val(author)
  eDescriptionNode.val(description)
  eLinkNode.val(link)


  $("#edit-article-submit").unbind("click")

  $("#edit-article-submit").click({fullPath: fullPath}, function(e){
    var isEmpty = false
    Array.from(document.querySelector("#edit-article-form").querySelectorAll('input, textarea')).forEach(input=>{
        if (input.value===""){
    
          isEmpty=true;
    
        } 
    
    })

    if( isEmpty ) {

        alert("fields are empty!!")
    
        return;
    
    }

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

    var files = document.getElementById("e-article-image").files
    var dateStr = new Date().toUTCString(),
        oneWeekDataStr = new Date((new Date(dateStr).getTime() + 7 * 24 * 60 * 60 * 1000)).toUTCString()

    var article = {
      title: eTitleNode.val(),

      description: eDescriptionNode.val(),

      author: eAuthorNode.val(),

      link: eLinkNode.val(),
    };

    if(files[0].size > 1048576){

      alert("File is too big!");
  
      return;
  
    }
    else{
      var newPath = ""
      addToStorage(section, files[0], id)
      .then(function(url){
        updateToDatabase(id, article, url, currentCategory)
        .then(function(){
            document.querySelector("#article-success").style.display = "block"
            document.querySelector("#article-error").style.display = "none"

            fetchData(currentCategory)
        })
      })
      
      .catch(function(err) {
  
          console.log(err);
  
          document.querySelector("#error").text = "Error! Please contact IT.";
  
          document.querySelector("#error").style.display = "block";
  
      })
    }
  })
}


function showFeeds(articles, keyword = null, sort = null) {

  var articleContainer = document.getElementById("article-list");

  articleContainer.innerHTML = "";

  var contentArray = [];

  if (sort === null) {

    for (var i = 0; i < articles.length; i++) {

      var gbCard50 = "<li class=\"article-li\">\n" +

        "                    <img src=\"" + articles[i].data.image + "\">\n" +

        "                    <div>\n" +

        "                        <h3>" + articles[i].data.title + "</h3>\n" +

        "                         <p class='small-grey-caption'>Created at: " + articles[i].data.createdAt + "</p>" +

        "<p>" + articles[i].data.location + "</p>" +

        "<p>" + articles[i].data.category + "</p>" +

        "                        <p>" + articles[i].data.description + "</p>\n" +

        "                        <a href='" + articles[i].data.link + "'>" + articles[i].data.link + "</a>\n" +

        "                        <div class=\"button-container\">\n" +

        "                            <button onclick='deleteArticle(" + articles[i].id + ")' class=\"button\">Delete</button>\n" +

        "                            <a class=\"button\" href=\"section-admin-edit.php?article=" + articles[i].id + "&section=" + currentSection + "&category=" + currentCategory + "\">Edit</a>\n" +

        "                        </div>\n" +

        "                    </div>\n" +

        "                </li>";



      if (keyword === null) contentArray.push(gbCard50);

      else {

        if (gbCard50.indexOf(keyword) > -1) {



          contentArray.push(gbCard50)

        }

      }

    }

    articleContainer.innerHTML = contentArray.join(" ");

  }

  if (sort === "title") {

    for (var i = 0; i < articles.length; i++) {

      var gbCard50 = articles[i].data.title + "<li class=\"article-li\">\n" +

        "                    <img src=\"" + articles[i].data.image + "\">\n" +

        "                    <div>\n" +

        "                        <h3>" + articles[i].data.title + "</h3>\n" +

        "                         <p class='small-grey-caption'>Created at: " + articles[i].data.createdAt + "</p>" +

        "<p>" + articles[i].data.location + "</p>" +

        "<p>" + articles[i].data.category + "</p>" +

        "                        <p>" + articles[i].data.description + "</p>\n" +

        "                        <a href='" + articles[i].data.link + "'>" + articles[i].data.link + "</a>\n" +

        "                        <div class=\"button-container\">\n" +

        "                            <button onclick='deleteArticle(" + articles[i].id + ")' class=\"button\">Delete</button>\n" +

        "                            <a class=\"button\" href=\"section-admin-edit.php?article=" + articles[i].id + "&section=" + currentSection + "&category=" + currentCategory + "\">Edit</a>\n" +

        "                        </div>\n" +

        "                    </div>\n" +

        "                </li>";



      if (keyword === null) contentArray.push(gbCard50);

      else {

        if (gbCard50.indexOf(keyword) > -1) {



          contentArray.push(gbCard50)

        }

      }

    }

    articleContainer.innerHTML = contentArray.sort().map(e => e.slice(e.indexOf("<li class=\"article-li\">\n"))

    ).join(" ");



  }

  if (sort === "date") {

    for (var i = 0; i < articles.length; i++) {

      var gbCard50 = articles[i].data.createdAt + "<li class=\"article-li\">\n" +

        "                    <img src=\"" + articles[i].data.image + "\">\n" +

        "                    <div>\n" +

        "                        <h3>" + articles[i].data.title + "</h3>\n" +

        "                         <p class='small-grey-caption'>Created at: " + articles[i].data.createdAt + "</p>" +

        "<p>" + articles[i].data.location + "</p>" +

        "<p>" + articles[i].data.category + "</p>" +

        "                        <p>" + articles[i].data.description + "</p>\n" +

        "                        <a href='" + articles[i].data.link + "'>" + articles[i].data.link + "</a>\n" +

        "                        <div class=\"button-container\">\n" +

        "                            <button onclick='deleteArticle(" + articles[i].id + ")' class=\"button\">Delete</button>\n" +

        "                            <a class=\"button\" href=\"section-admin-edit.php?article=" + articles[i].id + "&section=" + currentSection + "&category=" + currentCategory + "\">Edit</a>\n" +

        "                        </div>\n" +

        "                    </div>\n" +

        "                </li>";



      if (keyword === null) contentArray.push(gbCard50);

      else {

        if (gbCard50.indexOf(keyword) > -1) {



          contentArray.push(gbCard50)

        }

      }

    }

    articleContainer.innerHTML = contentArray.sort().map(e => e.slice(e.indexOf("<li class=\"article-li\">\n"))

    ).join(" ");
  }
}



function showJobs(articles, keyword = null, sortObj) {

  var articleContainer = document.getElementById("article-list");

  articleContainer.innerHTML = "";

  var contentArray = [];

  for (var i = 0; i < articles.length; i++) {

    var jobCountry = articles[i].data.country
    var capitalizedJobCountry = jobCountry.charAt(0).toUpperCase() + jobCountry.slice(1)

    var jobPosition = articles[i].data.position
    var capitalizedJobPosition = jobPosition.charAt(0).toUpperCase() + jobPosition.slice(1)

    var gbCard50 = "<li class=\"article-li\">\n" +

      "                    <img src=\"" + articles[i].data.image + "\">\n" +

      "                    <div>\n" +

      "                        <h3>" + articles[i].data.title + "</h3>\n" +

      "                         <p class='small-grey-caption'>Created at: " + articles[i].data.createdAt + "</p>" +

      "<p>" + articles[i].data.companyName + "</p>" +

      "<p>" + capitalizedJobPosition + "</p>" +

      "<p>" + articles[i].data.salary + "</p>" +

      "<p>" + articles[i].data.city + ", " + capitalizedJobCountry + "</p>" +

      "<p>" + articles[i].data.category + "</p>" +

      "                        <p>" + articles[i].data.description + "</p>\n" +

      "                        <a href='" + articles[i].data.link + "'>" + articles[i].data.link + "</a>\n" +

      "                        <div class=\"button-container\">\n" +

      "                            <button onclick='deleteArticle(\"" + articles[i].id + "\", \"" + articles[i].data.fullPath + "\")' class=\"button\">Delete</button>\n" +

      "                            <button class=\"button\" onclick='showJobEdittingTab(\"" + articles[i].id + "\", \"" + articles[i].data.title + "\", \"" + articles[i].data.city +
      "\", \"" + articles[i].data.country + "\", \"" + articles[i].data.position + "\", \"" + articles[i].data.salary + "\", \"" + articles[i].data.description.replace("\"", "$escape").replace(/(\r\n|\n|\r)/gm,"<br>").trim() + 
      "\", \"" + articles[i].data.link + "\", \"" + articles[i].data.companyName + "\", \"" + articles[i].data.fullPath + "\", \"" + articles[i].data.category +"\")'>Edit</button>\n" +

      "                        </div>\n" +

      "                    </div>\n" +

      "                </li>";

    contentArray.push({
      gbCard50: gbCard50,
      category: articles[i].data.category,
      country: articles[i].data.country
    });
  }

  var categorySortedArr = [],
      countrySortedArr = []

  if(sortObj.categoryFilter.length > 0){
    categorySortedArr = contentArray.filter(content => sortObj.categoryFilter.includes(content.category))
  }

  else{
    categorySortedArr = contentArray.map(content => {return content})
  }

  if(sortObj.countryFilter.length > 0){
    countrySortedArr = categorySortedArr.filter(content => sortObj.countryFilter.includes(content.country.toLowerCase()))
  }

  else{
    countrySortedArr = categorySortedArr.map(content => {return content})
  }

  var renderedArray = countrySortedArr.map(content => {return content.gbCard50})

  articleContainer.innerHTML = renderedArray.join(" ");

  // if (sort === "title") {
  //   for (var i = 0; i < articles.length; i++) {
  //     var jobCountry = articles[i].data.country
  //     var capitalizedJobCountry = jobCountry.charAt(0).toUpperCase() + jobCountry.slice(1)

  //     var jobPosition = articles[i].data.position
  //     var capitalizedJobPosition = jobPosition.charAt(0).toUpperCase() + jobPosition.slice(1)


  //     var gbCard50 = articles[i].data.title + "<li class=\"article-li\">\n" +

  //       "                    <img src=\"" + articles[i].data.image + "\">\n" +

  //       "                    <div>\n" +

  //       "                        <h3>" + articles[i].data.title + "</h3>\n" +

  //       "                         <p class='small-grey-caption'>Created at: " + articles[i].data.createdAt + "</p>" +

  //       "<p>" + articles[i].data.companyName + "</p>" +

  //       "<p>" + capitalizedJobPosition + "</p>" +

  //       "<p>" + articles[i].data.salary + "</p>" +

  //       "<p>" + articles[i].data.city + ", " + capitalizedJobCountry + "</p>" +

  //       "<p>" + articles[i].data.category + "</p>" +

  //       "                        <p>" + articles[i].data.description + "</p>\n" +

  //       "                        <a href='" + articles[i].data.link + "'>" + articles[i].data.link + "</a>\n" +

  //       "                        <div class=\"button-container\">\n" +

  //       "                            <button onclick='deleteArticle(\"" + articles[i].id + "\", \"" + articles[i].data.fullPath + "\")' class=\"button\">Delete</button>\n" +

  //       "                            <button class=\"button\" onclick='showJobEdittingTab(\"" + articles[i].id + "\", \"" + articles[i].data.title + "\", \"" + articles[i].data.city +
  //       "\", \"" + articles[i].data.country + "\", \"" + articles[i].data.position + "\", \"" + articles[i].data.salary + "\", \"" + articles[i].data.description.replace("\"", "$escape").replace(/(\r\n|\n|\r)/gm,"<br>").trim() + 
  //       "\", \"" + articles[i].data.link + "\", \"" + articles[i].data.companyName + "\", \"" + articles[i].data.fullPath + "\", \"" + articles[i].data.category +"\")'>Edit</button>\n" +

  //       "                        </div>\n" +

  //       "                    </div>\n" +

  //       "                </li>";

  //     if (keyword === null) contentArray.push(gbCard50);

  //     else {

  //       if (gbCard50.indexOf(keyword) > -1) {



  //         contentArray.push(gbCard50)

  //       }

  //     }

  //   }

  //   articleContainer.innerHTML = contentArray.sort().map(e => e.slice(e.indexOf("<li class=\"article-li\">\n"))).join(" ");



  // }

  // if (sort === "date") {

  //   for (var i = 0; i < articles.length; i++) {
  //     var jobCountry = articles[i].data.country
  //     var capitalizedJobCountry = jobCountry.charAt(0).toUpperCase() + jobCountry.slice(1)

  //     var jobPosition = articles[i].data.position
  //     var capitalizedJobPosition = jobPosition.charAt(0).toUpperCase() + jobPosition.slice(1)


  //     var gbCard50 = articles[i].data.createdAt + "<li class=\"article-li\">\n" +

  //       "                    <img src=\"" + articles[i].data.image + "\">\n" +

  //       "                    <div>\n" +

  //       "                        <h3>" + articles[i].data.title + "</h3>\n" +

  //       "                         <p class='small-grey-caption'>Created at: " + articles[i].data.createdAt + "</p>" +

  //       "<p>" + articles[i].data.companyName + "</p>" +

  //       "<p>" + capitalizedJobPosition + "</p>" +

  //       "<p>" + articles[i].data.salary + "</p>" +

  //       "<p>" + articles[i].data.city + ", " + capitalizedJobCountry + "</p>" +

  //       "<p>" + articles[i].data.category + "</p>" +

  //       "                        <p>" + articles[i].data.description + "</p>\n" +

  //       "                        <a href='" + articles[i].data.link + "'>" + articles[i].data.link + "</a>\n" +

  //       "                        <div class=\"button-container\">\n" +

  //       "                            <button onclick='deleteArticle(\"" + articles[i].id + "\", \"" + articles[i].data.fullPath + "\")' class=\"button\">Delete</button>\n" +

  //       "                            <button class=\"button\" onclick='showJobEdittingTab(\"" + articles[i].id + "\", \"" + articles[i].data.title + "\", \"" + articles[i].data.city +
  //       "\", \"" + articles[i].data.country + "\", \"" + articles[i].data.position + "\", \"" + articles[i].data.salary + "\", \"" + articles[i].data.description.replace("\"", "$escape").replace(/(\r\n|\n|\r)/gm,"<br>").trim() + 
  //       "\", \"" + articles[i].data.link + "\", \"" + articles[i].data.companyName + "\", \"" + articles[i].data.fullPath + "\", \"" + articles[i].data.category +"\")'>Edit</button>\n" +

  //       "                        </div>\n" +

  //       "                    </div>\n" +

  //       "                </li>";

  //     if (keyword === null) contentArray.push(gbCard50);

  //     else {

  //       if (gbCard50.indexOf(keyword) > -1) {



  //         contentArray.push(gbCard50)

  //       }

  //     }

  //   }

  //   articleContainer.innerHTML = contentArray.sort().map(e => e.slice(e.indexOf("<li class=\"article-li\">\n"))

  //   ).join(" ");

  // }



}

$("button.edit-cancel").click(function(){
  $("#job-edit-tab").removeClass("job-post-edit-container-visible")
  $("#job-edit-tab").removeClass("job-post-edit-container-invisible")
  $("#job-edit-tab").addClass("job-post-edit-container-invisible")

  $("#article-edit-tab").removeClass("job-post-edit-container-visible")
  $("#article-edit-tab").removeClass("job-post-edit-container-invisible")
  $("#article-edit-tab").addClass("job-post-edit-container-invisible")

  $("#event-edit-tab").removeClass("job-post-edit-container-visible")
  $("#event-edit-tab").removeClass("job-post-edit-container-invisible")
  $("#event-edit-tab").addClass("job-post-edit-container-invisible")
})

function showJobEdittingTab(id, title, city, country, position, salary, description, link, companyName, fullPath, category){
  $("#job-edit-tab").removeClass("job-post-edit-container-visible")
  $("#job-edit-tab").removeClass("job-post-edit-container-invisible")

  $("#job-edit-tab").addClass("job-post-edit-container-visible")

  var eid = $("#edit-id"),
        etitle = $("#e-job-title"),
        eposition = $("#e-job-position"),
        ecity = $("#e-job-city"),
        ecategory = $("#e-job-category"),
        edescription = $("#e-job-description"),
        elink = $("#e-job-link"),
        esalary = $("#e-job-salary"),
        ecountry = $("#e-job-country")

  eid.text(id)
  etitle.val(title)
  eposition.val(position)
  ecity.val(city)
  ecategory.val(category)
  edescription.empty()
  edescription.append(description.replace("$escape", "\""))
  elink.val(link)
  esalary.val(salary)
  ecountry.val(country)

  $("#edit-job-submit").unbind("click")

  $("#edit-job-submit").click({fullPath: fullPath}, function(e){
    var isEmpty = false

    Array.from(document.querySelector("#edit-job-form").querySelectorAll('input, textarea')).forEach(input=>{

        if (input.value===""){
    
          isEmpty=true;
    
        } 
    
    })

    if( isEmpty ) {

        alert("fields are empty!!")
    
        return;
    
    }

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

    var files = document.getElementById("e-job-image").files
    var dateStr = new Date().toUTCString(),
        oneWeekDataStr = new Date((new Date(dateStr).getTime() + 7 * 24 * 60 * 60 * 1000)).toUTCString()

    var job = {

      createdAt: dateStr,
  
      title: etitle.val(),
  
      description: edescription.val(),
  
      link: elink.val(),
  
      position: eposition.val(),
  
      city: ecity.val(),

      country: ecountry.val(),
  
      category: ecategory.val(),
      
      expiredAt: oneWeekDataStr,

      companyId: "admin@globuzzer.com",

      companyName: companyName,

      salary: esalary.val()
    };

    if(files[0].size > 1048576){

      alert("File is too big!");
  
      return;
  
    }
    else{
      var newPath = ""
      addToStorage(section, files[0], id)
      .then(function(url){
          updateToDatabase(id, job, url, currentCategory)
          .then(function(){
              document.querySelector("#success").style.display = "block"
              document.querySelector("#error").style.display = "none"

              fetchData(currentCategory)

          })
      })
      
      .catch(function(err) {
  
          console.log(err);
  
          document.querySelector("#error").text = "Error! Please contact IT.";
  
          document.querySelector("#error").style.display = "block";
  
      })
    }
  })
}


function showEvents(articles, keyword = null, sort = null) {

  if(!sort){

    var articleContainer = document.getElementById("article-list");

    articleContainer.innerHTML = "";

    var contentArray = [];

    for (var i = 0; i < articles.length; i++) {

      var gbCard50 = articles[i].data.date + "<li class=\"article-li\">\n" +

        "                    <img src=\"" + articles[i].data.image + "\">\n" +

        "                    <div>\n" +

        "                        <h3>" + articles[i].data.title + "</h3>\n" +

        "                         <p class='small-grey-caption'>Created at: " + articles[i].data.createdAt + "</p>" +

        "<p>" + articles[i].data.location + "</p>" +

        "<p>" + articles[i].data.date + "</p>" +

        "<p>" + articles[i].data.category + "</p>";

      gbCard50 += "                        <p>" + articles[i].data.description + "</p>\n" +

        "                        <a href='" + articles[i].data.link + "'>" + articles[i].data.link + "</a>\n" +

        "                        <div class=\"button-container\">\n" +

        "                            <button onclick='deleteArticle(\"" + articles[i].id + "\", \"" + articles[i].data.fullPath + "\")' class=\"button\">Delete</button>\n" +

        "                            <button class=\"button\" onclick='showEventEditingTab(\"" + articles[i].id + "\", \"" + articles[i].data.title + "\", \"" + articles[i].data.location +
        "\", \"" + articles[i].data.date + "\", \"" + articles[i].data.category + "\", \"" + articles[i].data.description.replace("\"", "$escape").replace(/(\r\n|\n|\r)/gm,"<br>").trim() + 
        "\", \"" + articles[i].data.link + "\", \"" + articles[i].data.fullPath + "\")'>Edit</button>\n" +

        "                        </div>\n" +

        "                    </div>\n" +

        "                </li>";

      if (keyword === null) contentArray.push(gbCard50);

      else {

        if (gbCard50.indexOf(keyword) > -1) {



          contentArray.push(gbCard50)

        }

      }

    }

    articleContainer.innerHTML = contentArray.sort().map(e => e.slice(e.indexOf("<li class=\"article-li\">\n"))).join(" ");

  }

}

function showEventEditingTab(id, title, location, date, category, description, link, fullPath){
  $("#event-edit-tab").removeClass("job-post-edit-container-visible")
  $("#event-edit-tab").removeClass("job-post-edit-container-invisible")

  $("#event-edit-tab").addClass("job-post-edit-container-visible")

  var eTitleNode = $("#e-event-title"),
      eLocationNode = $("#e-event-location"),
      eDateNode = $("#e-event-date"),
      eCategoryNode = $("#e-event-category"),
      eDescriptionNode = $("#e-event-description"),
      eLinkNode = $("#e-event-link")

  eTitleNode.val(title)
  eLocationNode.val(location)
  eDateNode.val(date)
  eCategoryNode.val(category)
  eDescriptionNode.empty()
  eDescriptionNode.append(description.replace("$escape", "\""))
  eLinkNode.val(link)

  $("#edit-event-submit").unbind("click")

  $("#edit-event-submit").click({fullPath: fullPath}, function(e){
    var isEmpty = false

    Array.from(document.querySelector("#edit-event-form").querySelectorAll('input, textarea')).forEach(input=>{

        if (input.value===""){
    
          isEmpty=true;
    
        } 
    
    })

    if( isEmpty ) {

        alert("fields are empty!!")
    
        return;
    
    }

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

    var files = document.getElementById("e-event-image").files
    var dateStr = new Date().toUTCString(),
        oneWeekDataStr = new Date((new Date(dateStr).getTime() + 7 * 24 * 60 * 60 * 1000)).toUTCString()

    var job = {

      title: eTitleNode.val(),

      location: eLocationNode.val(),

      date: eDateNode.val(),

      category: eCategoryNode.val(),

      description: eDescriptionNode.val(),

      link: eLinkNode.val()
      
    };

    if(files[0].size > 1048576){

      alert("File is too big!");
  
      return;
  
    }
    else{
      var newPath = ""
      addToStorage(section, files[0], id)
      .then(function(url){
          updateToDatabase(id, job, url, currentCategory)
          .then(function(){
              document.querySelector("#event-success").style.display = "block"
              document.querySelector("#event-error").style.display = "none"

              fetchData(currentCategory)

          })
      })
      
      .catch(function(err) {
  
          console.log(err);
  
          document.querySelector("#event-error").text = "Error! Please contact IT.";
  
          document.querySelector("#event-error").style.display = "block";
  
      })
    }
  })
}

function showTeam(articles, keyword = null, sort = null) {

  console.log(articles);

  var articleContainer = document.getElementById("article-list");

  articleContainer.innerHTML = "";

  var contentArray = [];

  if (sort === null) {

    for (var i = 0; i < articles.length; i++) {

      var gbCard50 = "<li class=\"article-li\">\n" +

        "                    <img src=\"" + articles[i].data.image + "\">\n" +

        "                    <div>\n" +

        "                        <h3>" + articles[i].data.title + "</h3>\n" +

        "                         <p class='small-grey-caption'>Created at: " + articles[i].data.createdAt + "</p>" +

        "                        <p><b>City: </b>" + articles[i].data.city + "</p>\n" +

        "                        <p><b>Category: </b>" + articles[i].data.category + "</p>\n" +

        "                        <p><b>Position: </b>" + articles[i].data.position + "</p>\n" +

        "                        <p>" + articles[i].data.description + "</p>\n" +

        "                        <a href='" + articles[i].data.link + "'>" + articles[i].data.link + "</a>\n" +

        "                        <div class=\"button-container\">\n" +

        "                            <button onclick='deleteArticle(\"" + articles[i].id + "\", \"" + articles[i].data.fullPath + "\")' class=\"button\">Delete</button>\n" +

        "                            <a class=\"button\" href=\"section-admin-edit.php?article=" + articles[i].id + "&section=" + currentSection + "&category=" + currentCategory + "\">Edit</a>\n" +

        "                        </div>\n" +

        "                    </div>\n" +

        "                </li>";

      if (keyword === null) contentArray.push(gbCard50);

      else {

        if (gbCard50.indexOf(keyword) > -1) {

          contentArray.push(gbCard50)

        }

      }

    }



    articleContainer.innerHTML = contentArray.join(" ");

  }

  if (sort === "title") {

    for (var i = 0; i < articles.length; i++) {

      var gbCard50 = "<li class=\"article-li\">\n" +

        "                    <img src=\"" + articles[i].data.image + "\">\n" +

        "                    <div>\n" +

        "                        <h3>" + articles[i].data.title + "</h3>\n" +

        "                         <p class='small-grey-caption'>Created at: " + articles[i].data.createdAt + "</p>" +

        "                        <p><b>City: </b>" + articles[i].data.city + "</p>\n" +

        "                        <p><b>Category: </b>" + articles[i].data.category + "</p>\n" +

        "                        <p><b>Position: </b>" + articles[i].data.position + "</p>\n" +

        "                        <p>" + articles[i].data.description + "</p>\n" +

        "                        <a href='" + articles[i].data.link + "'>" + articles[i].data.link + "</a>\n" +

        "                        <div class=\"button-container\">\n" +

        "                            <button onclick='deleteArticle(\"" + articles[i].id + "\", \"" + articles[i].data.fullPath + "\")' class=\"button\">Delete</button>\n" +

        "                            <a class=\"button\" href=\"section-admin-edit.php?article=" + articles[i].id + "&section=" + currentSection + "&category=" + currentCategory + "\">Edit</a>\n" +

        "                        </div>\n" +

        "                    </div>\n" +

        "                </li>";

      if (keyword === null) contentArray.push(gbCard50);

      else {

        if (gbCard50.indexOf(keyword) > -1) {



          contentArray.push(gbCard50)

        }

      }

    }



    articleContainer.innerHTML = contentArray.sort().map(e => e.slice(e.indexOf("<li class=\"article-li\">\n"))

  ).

    join(" ");

  }

  if (sort === "date") {

    for (var i = 0; i < articles.length; i++) {

      var gbCard50 = "<li class=\"article-li\">\n" +

        "                    <img src=\"" + articles[i].data.image + "\">\n" +

        "                    <div>\n" +

        "                        <h3>" + articles[i].data.title + "</h3>\n" +

        "                         <p class='small-grey-caption'>Created at: " + articles[i].data.createdAt + "</p>" +

        "                        <p><b>City: </b>" + articles[i].data.city + "</p>\n" +

        "                        <p><b>Category: </b>" + articles[i].data.category + "</p>\n" +

        "                        <p><b>Position: </b>" + articles[i].data.position + "</p>\n" +

        "                        <p>" + articles[i].data.description + "</p>\n" +

        "                        <a href='" + articles[i].data.link + "'>" + articles[i].data.link + "</a>\n" +

        "                        <div class=\"button-container\">\n" +

        "                            <button onclick='deleteArticle(\"" + articles[i].id + "\", \"" + articles[i].data.fullPath + "\")' class=\"button\">Delete</button>\n" +

        "                            <a class=\"button\" href=\"section-admin-edit.php?article=" + articles[i].id + "&section=" + currentSection + "&category=" + currentCategory + "\">Edit</a>\n" +

        "                        </div>\n" +

        "                    </div>\n" +

        "                </li>";

      if (keyword === null) contentArray.push(gbCard50);

      else {

        if (gbCard50.indexOf(keyword) > -1) {



          contentArray.push(gbCard50)

        }

      }

    }



    articleContainer.innerHTML = contentArray.sort().map(e => e.slice(e.indexOf("<li class=\"article-li\">\n"))

  ).

    join(" ");

  }



}



/**

 * Deletes current article

 *

 * @param id

 */

function deleteArticle(id, fullPath) {
  var category = currentCategory

  if(category === "jobs")
    category = "job_offers"

  if (confirm("Are you sure, that you want to delete this article? It can't be restored afterwards!")) {

    firestore.collection(category).doc(id).delete().then(function(){
      deleteFromStorage(fullPath).then(function(){
        fetchData(currentCategory)

      })
    })
    .catch(function(err){
        console.error("Error removing document: ", err);
    })
  }
}

function addToStorage(section, file, jobId) {
  var storage = firebase.storage();

  var storageRef = storage.ref(section + '/' + jobId);
  
  newPath = section + '/' + jobId

  return storageRef.put(file)
  .then(function(snapshot) {
    return snapshot.ref.getDownloadURL();
  });
}

function deleteFromStorage(fullPath){
  var storageRef = firebase.storage().ref();

  return storageRef.child(fullPath).delete()
}

function updateToDatabase(id, post, url, currentCategory) {

    var firestore = firebase.firestore();

    var settings = { timestampsInSnapshots: true};

    firestore.settings(settings);

    post.image = url;

    post.fullPath = newPath

    if(currentCategory === 'jobs')
      return firestore.collection('job_offers').doc(id).update(post);

    return firestore.collection(currentCategory).doc(id).update(post);
}