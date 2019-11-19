var cvFile

var cvDropzone = new Dropzone("div#cv-file", {
    url: './index.html',
    acceptedFiles: "application/pdf, application/msword, .doc, .docx",
    clickable: true,
    dictDefaultMessage: 'Drop cover letter * (.pdf, .doc, .docx)',
    dictFallbackMessage: 'Drop cover letter * (.pdf, .doc, .docx)',
    dictFallbackText: 'Drop cover letter * (.pdf, .doc, .docx)',
    maxFileSize: 5
})

cvDropzone.on("success", function(file){
    cvFile = file
    $("#apply-cv").removeClass("show-warning-incorrect-input")

    var fileName = file.name

    if(fileName.length > 20){
        
        fileName = fileName.substring(0, 20) + '...'

    }

    $("#cv-inform").text(fileName)

    $("#cv-file-icon").empty()
    $("#cv-file-icon").append("<i class='close-modal fas fa-times fa-lg'></i>")
})

cvDropzone.on("uploadprogress", function(file, progress, bytesSent){
    $("#cv-file .dz-filename > span").empty()
    $("#cv-inform").text("Loading ...")
})

cvDropzone.on("maxfilesexceeded", function(file){
    $("#cv-file .dz-filename > span").empty()

    $("#cv-inform").text("Maximum 5 MB")
    $("#apply-cv").addClass("show-warning-incorrect-input")
    $("#apply-cv>p").text("Wrong file format")
})

cvDropzone.on("error", function(file){
    $("#cv-file .dz-filename > span").empty()

    $("#cv-inform").text("Drop cv * (.pdf, .doc, .docx)")
    $("#apply-cv").addClass("show-warning-incorrect-input")
    $("#apply-cv>p").text("Wrong file format")
})

cvDropzone.on("addedfile", function(file){
    if(cvFile)
        cvDropzone.removeFile(cvFile)

    $("#cv-inform").empty()
})


var coverFile

var coverDropzone = new Dropzone("div#cover-file", {
    url: './index.html',
    acceptedFiles: "application/pdf, application/msword, .doc, .docx",
    clickable: true,
    maxFileSize: 5
})

coverDropzone.on("success", function(file){
    coverFile = file

    $("#apply-cover-letter").removeClass("show-warning-incorrect-input")

    var fileName = file.name

    if(fileName.length > 20){
        
        fileName = fileName.substring(0, 20) + '...'

    }

    $("#cover-inform").text(fileName)

    $("#cover-file-icon").empty()
    $("#cover-file-icon").append("<i class='close-modal fas fa-times fa-lg'></i>")
})

coverDropzone.on("uploadprogress", function(file, progress, bytesSent){
    $("#cover-file .dz-filename > span").empty()
    $("#cover-inform").text("Loading ...")
})

coverDropzone.on("maxfilesexceeded", function(file){
    $("#cover-file .dz-filename > span").empty()

    $("#cover-inform").text("Maximum 5 MB")
    $("#apply-cover-letter").addClass("show-warning-incorrect-input")
    $("#apply-cover-letter>p").text("Wrong file format")

    $("#cover-file-icon").empty()
})

coverDropzone.on("error", function(file){
    $("#cover-file .dz-filename > span").empty()

    $("#cover-inform").text("Drop cover letter * (.pdf, .doc, .docx)")
    $("#apply-cover-letter").addClass("show-warning-incorrect-input")
    $("#apply-cover-letter>p").text("Wrong file format")

    $("#cover-file-icon").empty()
})

coverDropzone.on("addedfile", function(file){
    if(coverFile)
    coverDropzone.removeFile(coverFile)

    $("#cover-inform").empty()
})


var companyFirstJobImage

var jobImgDropzone = new Dropzone("div#company-pfj-add-image-dropzone-init", {
    url: './index.html',
    acceptedFiles: "image/*",
    maxFileSize: 5
})

jobImgDropzone.on("success", function(file){
    companyFirstJobImage = file

    var fileName = file.name

    if(fileName.length > 20){
        
        fileName = fileName.substring(0, 20) + '...'

    }

    $('#first-job-image-validation').removeClass('show-warning-incorrect-input')

    $("#company-pfj-add-image>p").text(fileName)
    $("#first-job-image-icon").empty()
    $("#first-job-image-icon").append("<i class='close-modal fas fa-times fa-lg'></i>")
})

jobImgDropzone.on("uploadprogress", function(file, progress, bytesSent){
    $("#company-pfj-add-image>p").text("Maximum 1 MB").text("Loading ...")
})

jobImgDropzone.on("maxfilesexceeded", function(file){
    $("#company-pfj-add-image>p").text("Maximum 1 MB")
    $('#first-job-city-validation').addClass('show-warning-incorrect-input')
    $('#first-job-city-validation>p').text("Wrong image format")
})

jobImgDropzone.on("error", function(file){
    $("#company-pfj-add-image>p").text("Drop an image *")
    $('#first-job-city-validation').addClass('show-warning-incorrect-input')
    $('#first-job-city-validation>p').text("Wrong image format")
})

jobImgDropzone.on("addedfile", function(file){
    if(companyFirstJobImage)
        jobImgDropzone.removeFile(companyFirstJobImage)

    $("#company-pfj-add-image>p").empty()
})
