var jobImage

var jobImageDropzone = new Dropzone("div#dropzone-init", {
    url: '/index.html',
    acceptedFiles: "image/*",
    maxFileSize: 1
})

jobImageDropzone.on("success", function(file){
    console.log('success')
    jobImage = file

    var fileName = file.name

    if(fileName.length > 20){
        fileName = fileName.substring(0, 20) + '...'
    }

    $("#job-image-field>p").text(fileName)
})

jobImageDropzone.on("uploadprogress", function(file){
    console.log('loading')
    $("#job-image-field>p").text("Loading ...")
})

jobImageDropzone.on("maxfilesexceeded", function(file){
    $("#job-image-field>p").text("Maximum 1 MB")
})

jobImageDropzone.on("error", function(file){
    $("#job-image-field>p").text("Add an image (only jpg, png)")
})

jobImageDropzone.on("addedfile", function(file){
    $("#job-image-field>p").empty()
})

// var companyImage

// var companyImageDropzone = new Dropzone("div#dropzone-init-for-company-img", {
//     url: './index.html',
//     acceptedFiles: "image/*",
//     maxFileSize: 1
// })

// companyImageDropzone.on("success", function(file){
//     companyImage = file

//     var fileName = file.name

//     if(fileName.length > 20){
//         fileName = fileName.substring(0, 20) + '...'
//     }

//     $("#job-company-image-field>p").text(fileName)
// })

// companyImageDropzone.on("uploadprogress", function(file){
//     $("#job-company-image-field>p").text("Loading ...")
// })


// companyImageDropzone.on("maxfilesexceeded", function(file){
//     $("#job-company-image-field>p").text("Maximum 1 MB")
// })

// companyImageDropzone.on("error", function(file){
//     $("#job-company-image-field>p").text("Company logo (only jpg, png)")
// })

// companyImageDropzone.on("addedfile", function(file){
//     $("#job-company-image-field>p").empty()
// })
