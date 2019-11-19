var firestore = firebase.firestore()

var settings = { timestampsInSnapshots: true};

var userEmail,
    companyName,
    plan,
    companyData

firebase.auth().onAuthStateChanged(function(user) {
    if(user){
        window.localStorage.setItem('companyEmail', user.email)

        userEmail = user.email


        firestore.collection('companies').doc(userEmail).onSnapshot(function(doc){
            companyData = doc.data()

            companyName = companyData["company_name"]

            window.localStorage.setItem('companyName', companyName)

            plan = companyData["plan"]

        })
    }

    else{
        window.location = "/company-login/c-sign-in-up.html"
    }
})


//Quill
var articleDescriptionQuill = new Quill("#article-description-field", {
    theme: 'snow',
    placeholder: 'Add description here (max 500 characters)'
})

var articleDescriptionLimit = 500

articleDescriptionQuill.on('text-change', function(delta, old, source){
    if(articleDescriptionQuill.getLength() > articleDescriptionLimit){
        articleDescriptionQuill.deleteText(articleDescriptionLimit, articleDescriptionQuill.getLength())
    }

    $("#warning-empty-field-article-description").removeClass("show-warning-empty-field")
})


//Dropzone
var articleImage

var articleImageDropzone = new Dropzone("div#dropzone-init-for-article", {
    url: './index.html',
    acceptedFiles: "image/*",
    maxFileSize: 1
})

articleImageDropzone.on("success", function(file){
    articleImage = file

    var fileName = file.name

    if(fileName.length > 20){
        fileName = fileName.substring(0, 20) + '...'
    }

    $("#article-image-field>p").text(fileName)
})

articleImageDropzone.on("maxfilesexceeded", function(file){
    $("#article-image-field>p").text("Maximum 1 MB")
})

articleImageDropzone.on("error", function(file){
    $("#article-image-field>p").text("Add an image (only jpg, png)")
})

articleImageDropzone.on("addedfile", function(file){
    $("#article-image-field>p").empty()
})


function PublishArticle(){
    var allFilled = true

    if($("#article-title-field").val() === ""){
        $("#warning-empty-field-article-title").removeClass("show-warning-empty-field")
        $("#warning-empty-field-article-title").addClass("show-warning-empty-field")

        allFilled = false
    }

    if($("#article-author-field").val() === ""){
        $("#warning-empty-field-article-author").removeClass("show-warning-empty-field")
        $("#warning-empty-field-article-author").addClass("show-warning-empty-field")

        allFilled = false
    }

    if($("#article-link-field").val() === ""){
        $("#warning-empty-field-article-link").removeClass("show-warning-empty-field")
        $("#warning-empty-field-article-link").addClass("show-warning-empty-field")

        allFilled = false
    }

    if(articleDescriptionQuill.getLength() === 1){
        $("#warning-empty-field-article-description").removeClass("show-warning-empty-field")
        $("#warning-empty-field-article-description").addClass("show-warning-empty-field")

        allFilled = false
    }

    if(allFilled){
        var dateStr = new Date().toUTCString()

        var article = {
            createdAt: dateStr,
            title: $("#article-title-field").val(),
            author: $("#article-author-field").val(),
            description: document.querySelector("#article-description-field>.ql-editor").innerHTML,
            link: $("#article-link-field").val(),
            miliCreateAt: new Date(dateStr).getTime()
        }

        var randomId = new Date().getTime().toString();

        var articleId = "Article-" + randomId;

        var fullPath

        if(articleImage){
            addToStorage('Articles', articleImage, articleId)
            .then(function(url){
                addToDatabase(article, url, articleId)
                .then(function(){
                    $("#post-a-job-holder").removeClass("hide-post-a-job-holder")
                    $("#post-a-job-holder").addClass("hide-post-a-job-holder")

                    $("#job-published-holder").removeClass("show-job-published-holder")
                    $("#job-published-holder").addClass("show-job-published-holder")
                    $("#main-holder").animate({
                        scrollTop: 0
                    }, 'fast')
                })
            })
            .catch(function(err){
                console.log(err)
            })
        }

        else{
            addToDatabase(article, "", articleId)
            .then(function(){
                $("#post-a-job-holder").removeClass("hide-post-a-job-holder")
                $("#post-a-job-holder").addClass("hide-post-a-job-holder")

                $("#job-published-holder").removeClass("show-job-published-holder")
                $("#job-published-holder").addClass("show-job-published-holder")
                $("#main-holder").animate({
                    scrollTop: 0
                }, 'fast')
            })
            .catch(function(err){
                console.log(err)
            })
        }
    }
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

function addToDatabase(article, url, articleId) {

    article.image = url;

    article.fullPath = fullPath

    return firestore.collection("articles").doc(articleId).set(article, {merge: true});
}