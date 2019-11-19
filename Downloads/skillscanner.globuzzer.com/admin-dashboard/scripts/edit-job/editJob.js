var firestore = firebase.firestore()

var settings = { timestampsInSnapshots: true};

var jobId = getParameterByName("id"),
    jobImageUrl,
    userEmail,
    companyName,
    companyData,
    preview = getParameterByName("preview")

firebase.auth().onAuthStateChanged(function(user) {
    if(user){
        window.localStorage.setItem('companyEmail', user.email)

        userEmail = user.email

        $("#preview-publish-job-post").unbind("click")

        firestore.collection('companies').doc(userEmail).onSnapshot(function(doc){
            companyData = doc.data()
            companyName = companyData["company_name"]

            window.localStorage.setItem('companyName', companyName)

            $("#preview-publish-job-post").bind("click", PublishJobPost)

            plan = companyData["plan"]

            if(plan.toLowerCase().indexOf("free") > -1){
                $("#free-value-checkbox").prop("checked", true)
            }

            else if(plan.toLowerCase().indexOf("plus") > -1){
                $("#plus-value-checkbox").prop("checked", true)
            }

            else if(plan.toLowerCase().indexOf("premium") > -1){
                $("#premium-value-checkbox").prop("checked", true)
            }
        })
    }

    else{
        window.location = "/company-login/c-sign-in-up.html"
    }
})

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


function hideCategoryDropdownContent(){
    $("#category-dropdown-content").slideUp(250)
}

function ToggleCategoryDropdown(){
    $("#category-dropdown-content").slideToggle(250)

    hideJobTypeDropdownContent()
    hideSalaryDropdownContent()
}

function ChooseJobCategory(category){
    $("#show-category-job").text(category)
    hideCategoryDropdownContent()
    $("#warning-empty-field-job-category").removeClass("show-warning-empty-field")
}


function hideJobTypeDropdownContent(){
    $("#job-type-dropdown-content").slideUp(250)
}

function ToggleJobTypeDropdown(){
    $("#job-type-dropdown-content").slideToggle(250)

    hideCategoryDropdownContent()
    hideSalaryDropdownContent()
}

function ChooseJobType(jobType){
    $("#show-job-type-job").text(jobType)
    hideJobTypeDropdownContent()
    $("#warning-empty-field-job-type").removeClass("show-warning-empty-field")
}


function hideSalaryDropdownContent(){
    $("#salary-dropdown-content").slideUp(250)
}

function ToggleSalaryDropdown(){
    $("#salary-dropdown-content").slideToggle(250)

    hideCategoryDropdownContent()
    hideJobTypeDropdownContent()
}

function ChooseJobSalary(salary){
    $("#show-salary-job").text(salary)
    hideSalaryDropdownContent()
    $("#warning-empty-field-job-salary").removeClass("show-warning-empty-field")
}

function hideJobCountryDropdownContent(){
    $("#job-country-dropdown-content").slideUp(250)
}

function ToggleJobCountryDropdown(){
    $("#job-country-dropdown-content").slideToggle(250)
}

function ChooseJobCountry(country){
    $("#show-job-country-job").text(country)
    hideJobCountryDropdownContent()
    $("#warning-empty-field-job-country").removeClass("show-warning-empty-field")
}

(function initEditting(){
    
    firestore.collection("job_offers").doc(jobId).get().then(function(doc){
        $("#job-title-field").val(doc.data().title)
        $("#show-category-job").text(doc.data().category)
        $("#show-job-type-job").text(doc.data().position)
        $("#show-salary-job").text(doc.data().salary)
        $("#application-deadline-date-picker-value").val(doc.data().deadline)
        document.querySelector("#job-description-field>.ql-editor").innerHTML = doc.data().description
        document.querySelector("#job-requirement-field>.ql-editor").innerHTML = doc.data().requirement
        $("#show-job-country-job").text(doc.data().country)
        $("#job-city-field").val(doc.data().city)

        $("#job-company-name-field").val(doc.data().companyName)
        $("#job-company-email-field").val(doc.data().companyId)
        $("#job-company-website-field").val(doc.data().link)

        jobId = doc.id
        jobImageUrl = doc.data().image

        if(preview){
            console.log(true)
            PreviewJob()
        }
    })
    .catch(function(err){
        console.log(err)
    })
})()

function EditJobPost(){
    $("#yah-preview-job-icon").hide()
    $("#yah-preview-job").hide()

    $("#yah-post-job").addClass("your-are-here-highlight")

    $("#yah-published-job-icon").hide()
    $("#yah-published-job").hide()

    $("#post-a-job-holder").removeClass("hide-post-a-job-holder")
    $("#preview-job-holder").removeClass("show-preview-job-holder")
    $("#main-holder").animate({
        scrollTop: 0
    }, 'fast')
}

function PreviewJob(){
    var allFilled = true

    if($("#job-title-field").val() === ""){
        $("#warning-empty-field-job-title").removeClass("show-warning-empty-field")
        $("#warning-empty-field-job-title").addClass("show-warning-empty-field")
        
        allFilled = false
    }


    if($("#show-category-job").text() === "Category *"){
        $("#warning-empty-field-job-category").removeClass("show-warning-empty-field")
        $("#warning-empty-field-job-category").addClass("show-warning-empty-field")
        
        allFilled = false
    }


    if($("#show-job-type-job").text() === "Job type *"){
        $("#warning-empty-field-job-type").removeClass("show-warning-empty-field")
        $("#warning-empty-field-job-type").addClass("show-warning-empty-field")
        
        allFilled = false
    }


    if($("#show-salary-job").text() === "Salary *"){
        $("#warning-empty-field-job-salary").removeClass("show-warning-empty-field")
        $("#warning-empty-field-job-salary").addClass("show-warning-empty-field")
        
        allFilled = false
    }


    if($("#application-deadline-date-picker-value").val() === ""){
        $("#warning-empty-field-dateline").removeClass("show-warning-empty-field")
        $("#warning-empty-field-dateline").addClass("show-warning-empty-field")
        
        allFilled = false
    }


    if(document.querySelector("#job-description-field>.ql-editor").textContent === ""){
        $("#warning-empty-field-job-description").removeClass("show-warning-empty-field")
        $("#warning-empty-field-job-description").addClass("show-warning-empty-field")
        
        allFilled = false
    }

    if(document.querySelector("#job-requirement-field>.ql-editor").textContent === ""){
        $("#warning-empty-field-job-requirement").removeClass("show-warning-empty-field")
        $("#warning-empty-field-job-requirement").addClass("show-warning-empty-field")
        
        allFilled = false
    }

    if($("#job-company-website-field").val() === ""){
        $("#warning-empty-field-website").removeClass("show-warning-empty-field")
        $("#warning-empty-field-website").addClass("show-warning-empty-field")

        allFilled = false
    }

    if($("#job-company-website-field").val() === ""){
        $("#warning-empty-field-website").removeClass("show-warning-empty-field")
        $("#warning-empty-field-website").addClass("show-warning-empty-field")

        allFilled = false
    }

    if($("#show-job-country-job").text() === "Select country *"){
        $("#warning-empty-field-job-country").removeClass("show-warning-empty-field")
        $("#warning-empty-field-job-country").addClass("show-warning-empty-field")
        
        allFilled = false
    }

    if($("#job-city-field").val() === ""){
        $("#warning-empty-field-job-city").removeClass("show-warning-empty-field")
        $("#warning-empty-field-job-city").addClass("show-warning-empty-field")
        
        allFilled = false
    }

    if($("#job-company-name-field").val() === ""){
        $("#warning-empty-field-company-name").removeClass("show-warning-empty-field")
        $("#warning-empty-field-company-name").addClass("show-warning-empty-field")

        allFilled = false
    }

    if(allFilled){
        $("#yah-preview-job-icon").show()
        $("#yah-preview-job").show()

        $("#yah-post-job").removeClass("your-are-here-highlight")

        $("#yah-published-job-icon").hide()
        $("#yah-published-job").hide()

        $("#preview-job-title").text($("#job-title-field").val())
        $("#preview-job-company-name").text($("#job-company-name-field").val())
        $("#preview-job-city").text($("#job-city-field").val())
        $("#preview-job-type").text($("#show-job-type-job").text())
        $("#preview-job-salary").text($("#show-salary-job").text())
        $("#preview-job-deadline").text($("#application-deadline-date-picker-value").val())

        $("#preview-job-description-content").empty()
        $("#preview-job-description-content").append(document.querySelector("#job-description-field>.ql-editor").innerHTML)

        $("#preview-job-requirement-content").empty()
        $("#preview-job-requirement-content").append(document.querySelector("#job-requirement-field>.ql-editor").innerHTML)

        $("#post-a-job-holder").removeClass("hide-post-a-job-holder")
        $("#post-a-job-holder").addClass("hide-post-a-job-holder")
    
        $("#preview-job-holder").removeClass("show-preview-job-holder")
        $("#preview-job-holder").addClass("show-preview-job-holder")
    
        $("#main-holder").animate({
            scrollTop: 0
        }, 'fast')
    }
}

function PublishJobPost(){
    CloseErrorBox()
    OpenLoadingBox()

    var dateStr = new Date().toUTCString(),
        oneWeekDataStr = new Date((new Date(dateStr).getTime() + 7 * 24 * 60 * 60 * 1000)).toUTCString()

    var job = {
        title: $("#job-title-field").val(),
        description: document.querySelector("#job-description-field>.ql-editor").innerHTML,
        requirement: document.querySelector("#job-requirement-field>.ql-editor").innerHTML,
        position: $("#show-job-type-job").text(),
        category: $("#show-category-job").text(),
        salary: $("#show-salary-job").text(),
        companyId: $("#job-company-email-field").val(),
        companyName: $("#job-company-name-field").val(),
        deadline: $("#application-deadline-date-picker-value").val(),
        link: $("#job-company-website-field").val(),
        city: $("#job-city-field").val(),
        country: $("#show-job-country-job").text(),
    }

    if(jobImage){
        updateToStorage(userEmail, jobImage, jobId)
        .then(function(url){
            updateToDatabase(job, url, jobId)
            .then(function(){
                CloseLoadingBox()

                $("#yah-post-job").removeClass("your-are-here-highlight")
                $("#yah-preview-job").removeClass("your-are-here-highlight")

                $("#yah-published-job-icon").show()
                $("#yah-published-job").show()

                $("#preview-job-holder").removeClass("show-preview-job-holder")

                $("#job-published-holder").removeClass("show-job-published-holder")
                $("#job-published-holder").addClass("show-job-published-holder")
            
                $("#main-holder").animate({
                    scrollTop: 0
                }, 'fast')
            })
        })
        .catch(function(err){
            CloseLoadingBox()
            OpenErrorBox()
            
            console.log(err)
        })
    }

    else{
        updateToDatabase(job, jobImageUrl, jobId)
        .then(function(){
            CloseLoadingBox()

            $("#yah-post-job").removeClass("your-are-here-highlight")
            $("#yah-preview-job").removeClass("your-are-here-highlight")

            $("#yah-published-job-icon").show()
            $("#yah-published-job").show()
            
            $("#preview-job-holder").removeClass("show-preview-job-holder")

            $("#job-published-holder").removeClass("show-job-published-holder")
            $("#job-published-holder").addClass("show-job-published-holder")
        
            $("#main-holder").animate({
                scrollTop: 0
            }, 'fast')
        })
        .catch(function(err){
            CloseLoadingBox()
            OpenErrorBox()

            console.log(err)
        })
    }
}

function updateToStorage(section, file, jobId) {
    var storage = firebase.storage();
    
    var storageRef = storage.ref(section + '/' + jobId);
  
    fullPath = section + '/' + jobId
  
    return storageRef.put(file)
  
      .then(function(snapshot) {
  
        return snapshot.ref.getDownloadURL();
  
      });
}

function updateToDatabase(job, url, jobId) {

    job.image = url;

    return firestore.collection("job_offers").doc(jobId).update(job);
}

function OpenLoadingBox(){
    $("#loading-box").removeClass("show-loading-box")
    $("#loading-box").addClass("show-loading-box")
}

function OpenErrorBox(){
    $("#error-box").removeClass("show-error-box")
    $("#error-box").addClass("show-error-box")
}

function CloseLoadingBox(){
    $("#loading-box").removeClass("show-loading-box")
}

function CloseErrorBox(){
    $("#error-box").removeClass("show-error-box")
}