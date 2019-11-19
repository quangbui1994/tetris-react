var firestore = firebase.firestore()

var settings = { timestampsInSnapshots: true};

var articleId = getParameterByName("id"),
    articleFullPath

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

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

initEditting()

function initEditting(){
    
    firestore.collection("articles").doc(articleId).get().then(function(doc){
        $("#article-title-field").val(doc.data().title)
        $("#article-author-field").val(doc.data().author)
        document.querySelector("#article-description-field>.ql-editor").innerHTML = doc.data().description
        $("#article-link-field").val(doc.data().link)

        articleImageUrl = doc.data().image

        articleFullPath = doc.data().fullPath
    })
    .catch(function(err){
        console.log(err)
    })
}

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

        if(articleImage){
            updateToStorage(articleImage, articleFullPath)
            .then(function(url){
                updateToDatabase(article, url, articleId)
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
            updateToDatabase(article, "", articleId)
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

function updateToStorage(file, fullPath) {
    var storage = firebase.storage();
    
    var storageRef = storage.ref(fullPath);
  
    return storageRef.put(file)
  
      .then(function(snapshot) {
  
        return snapshot.ref.getDownloadURL();
  
      });
}

function updateToDatabase(article, url, articleId) {

    article.image = url;

    return firestore.collection("articles").doc(articleId).update(article)
}