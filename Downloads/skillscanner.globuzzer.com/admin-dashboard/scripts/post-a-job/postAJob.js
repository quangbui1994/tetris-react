var firestore = firebase.firestore()

var settings = { timestampsInSnapshots: true};

// firestore.settings(settings);

var userEmail,
    companyName,
    plan,
    companyData

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


            // $("#job-company-name-field").val(companyData["company_name"])
            // $("#job-company-website-field").val(companyData["link"])
        })
    }

    else{
        window.location = "/company-login/c-sign-in-up.html"
    }
})

var autocompleteCityId = $("#job-city-field")

autocompleteCityId.focus(function(){
  $(this).attr('autocomplete', 'new-password')
})

// Google Place API

var googlePlaceForCityField = new google.maps.places.Autocomplete(document.getElementById("job-city-field"))


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


    //Restrict Google Place API to show only locations of selected country
    if(country === 'Sweden'){
        googlePlaceForCityField.setComponentRestrictions({
          'country': 'se'
        })
      }
    
      else if (country === 'Finland'){
        googlePlaceForCityField.setComponentRestrictions({
          'country': 'fi'
        })
      }
    
      else if (country === 'Norway'){
        googlePlaceForCityField.setComponentRestrictions({
          'country': 'no'
        })
      }
    
      else if (country === 'Denmark'){
        googlePlaceForCityField.setComponentRestrictions({
          'country': 'dk'
        })
      }
}

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

    if(jobDescriptionQuill.getLength() === 1){
        $("#warning-empty-field-job-description").removeClass("show-warning-empty-field")
        $("#warning-empty-field-job-description").addClass("show-warning-empty-field")
        
        allFilled = false
    }

    if(jobRequirementQuill.getLength() === 1){
        $("#warning-empty-field-job-requirement").removeClass("show-warning-empty-field")
        $("#warning-empty-field-job-requirement").addClass("show-warning-empty-field")
        
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

        $("#mobile-preview-job-city").text("Stockholm")
        $("#mobile-preview-job-type").text($("#show-job-type-job").text())
        $("#mobile-preview-job-salary").text($("#show-salary-job").text())
        $("#mobile-preview-job-deadline").text($("#application-deadline-date-picker-value").val())

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
    // $("#yah-post-job").removeClass("your-are-here-highlight")
    // $("#yah-preview-job").removeClass("your-are-here-highlight")

    // $("#yah-published-job-icon").show()
    // $("#yah-published-job").show()

    // $("#preview-job-holder").removeClass("show-preview-job-holder")

    // $("#job-published-holder").removeClass("show-job-published-holder")
    // $("#job-published-holder").addClass("show-job-published-holder")

    // $("#main-holder").animate({
    //     scrollTop: 0
    // }, 'fast')

    CloseErrorBox()
    OpenLoadingBox()

    var dateStr = new Date().toUTCString(),
        oneWeekDataStr = new Date((new Date(dateStr).getTime() + 100 * 365 * 24 * 60 * 60 * 1000)).toUTCString()

    var job = {
        createdAt: dateStr,
        createdMili: new Date(dateStr).getTime(),
        title: $("#job-title-field").val(),
        description: document.querySelector("#job-description-field>.ql-editor").innerHTML,
        requirement: document.querySelector("#job-requirement-field>.ql-editor").innerHTML,
        position: $("#show-job-type-job").text(),
        city: $("#job-city-field").val(),
        country: $("#show-job-country-job").text(),
        category: $("#show-category-job").text(),
        salary: $("#show-salary-job").text(),
        expiredAt: oneWeekDataStr,
        expiredMili: new Date(oneWeekDataStr).getTime(),
        companyId: userEmail,
        companyName: $("#job-company-name-field").val(),
        deadline: $("#application-deadline-date-picker-value").val(),
        link: $("#job-company-website-field").val()
    }

    checkIfCanPost(userEmail).then(function(doc){
        var compData = doc.data()

        //Case 1: company is in free plan and still have number of jobs can post this week greater than 0 => true
        //Case 2: company is in plus package or premium package => true
        if((compData["plan"] === "free_package" && compData["numberOfJobsThisWeek"] > 0) || (compData["plan"] !== "free_package")){
            var numberOfJobsThisWeek = compData["numberOfJobsThisWeek"]

            

            decreaseNumberOfJobsThisWeek(userEmail, numberOfJobsThisWeek).then(function(){
                var randomId = new Date().getTime().toString();
            
                var jobId = job.category + "-" + randomId;

                var fullPath = userEmail + "/" + jobId

                if(jobImage){
                    addToStorage(jobImage, fullPath)
                    .then(function(url){
                        addToDatabase(job, url, jobId, fullPath)
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
                }

                else{
                    addToDatabase(job, "", jobId, fullPath)
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
                }
            })
        }

        else{
            alert("You ran out of number of jobs this week!")
        }
    })
    .catch(function(err){
        CloseLoadingBox()
        OpenErrorBox()
        
        console.log(err)
    })

}

// function SaveJobPost(){
//     CloseErrorBox()
//     OpenLoadingBox()
    
//     var dateStr = new Date().toUTCString()

//     var randomId = new Date().getTime().toString();
            
//     var jobId = job.category + "-" + randomId
    
//     var jobDraftId = jobId + "-draft" 

//     var fullPath = userEmail + "/" + jobId

//     var job = {
//         createdAt: dateStr,
//         createdMili: new Date(dateStr).getTime(),
//         jobId: jobId,
//         title: $("#job-title-field").val(),
//         description: document.querySelector("#job-description-field>.ql-editor").innerHTML,
//         requirement: document.querySelector("#job-requirement-field>.ql-editor").innerHTML,
//         position: $("#show-job-type-job").text(),
//         city: $("#job-city-field").val(),
//         country: $("#show-job-country-job").text(),
//         category: $("#show-category-job").text(),
//         salary: $("#show-salary-job").text(),
//         companyId: userEmail,
//         companyName: $("#job-company-name-field").val(),
//         deadline: $("#application-deadline-date-picker-value").val(),
//         companyLink: $("#job-company-website-field").val()
//     }

//     if(plan.indexOf("free") === -1){
       

//         if(jobImage){

//             addToStorage(jobImage, fullPath)
//             .then(function(url){
//                 addDraftToDatabase(job, url, jobDraftId, fullPath)
//                 .then(function(){
//                     CloseLoadingBox()

//                     $("#yah-post-job").removeClass("your-are-here-highlight")
//                     $("#yah-preview-job").removeClass("your-are-here-highlight")

//                     $("#yah-published-job-icon").show()
//                     $("#yah-published-job").text("Job saved")
//                     $("#yah-published-job").show()

//                     $("#preview-job-holder").removeClass("show-preview-job-holder")

//                     $("#job-published-holder").removeClass("show-job-published-holder")
//                     $("#job-published-holder").addClass("show-job-published-holder")

//                     $("#job-published-holder > p").text("Job draft saved")
//                     $("#job-published-inform-text").text("Your job draft is saved successfully")
//                     $("#your-job-post-is-live").text("Your job draft is saved in the job list.")
//                     $("#click-here-to-view-it").unbind("click")
//                     $("#click-here-to-view-it").bind("click", function(){
//                         window.location="/company-dashboard/job-list.html"
//                     })

//                     $("#main-holder").animate({
//                         scrollTop: 0
//                     }, 'fast')
//                 })
//             })
//             .catch(function(err){
//                 CloseLoadingBox()
//                 OpenErrorBox()  
//                 console.log(err)
//             })
//         }

//         else{
//             addDraftToDatabase(job, "", jobDraftId, fullPath)
//             .then(function(){
//                 CloseLoadingBox()

//                 $("#yah-post-job").removeClass("your-are-here-highlight")
//                 $("#yah-preview-job").removeClass("your-are-here-highlight")

//                 $("#yah-published-job-icon").show()
//                 $("#yah-published-job").text("Job saved")
//                 $("#yah-published-job").show()

//                 $("#preview-job-holder").removeClass("show-preview-job-holder")

//                 $("#job-published-holder").removeClass("show-job-published-holder")
//                 $("#job-published-holder").addClass("show-job-published-holder")

//                 $("#job-published-holder > p").text("Job draft saved")
//                 $("#job-published-inform-text").text("Your job draft is saved successfully")
//                 $("#your-job-post-is-live").text("Your job draft is saved in the job list.")
//                 $("#click-here-to-view-it").unbind("click")
//                 $("#click-here-to-view-it").bind("click", function(){
//                     window.location="/company-dashboard/job-list.html"
//                 })


//                 $("#main-holder").animate({
//                     scrollTop: 0
//                 }, 'fast')
//             })
//             .catch(function(err){
//                 CloseLoadingBox()
//                 OpenErrorBox()

//                 console.log(err)
//             })
//         }
//     }

//     else{
//         CloseLoadingBox()
//         OpenFixedRemindPackages()
//     }
// }

function decreaseNumberOfJobsThisWeek(userEmail, numberOfJobsThisWeek){
  
    numberOfJobsThisWeek -= 1

    return firestore.collection("companies").doc(userEmail).update({numberOfJobsThisWeek: numberOfJobsThisWeek})
}

function checkIfCanPost(userEmail){
  
    return firestore.collection("companies").doc(userEmail).get()
}

function addToStorage(file, fullPath) {
    var storage = firebase.storage();
    
    var storageRef = storage.ref(fullPath);
  
    return storageRef.put(file)
  
      .then(function(snapshot) {
  
        return snapshot.ref.getDownloadURL();
  
      });
}

function addToDatabase(job, url, jobId, fullPath) {

    job.image = url;

    job.fullPath = fullPath

    return firestore.collection("job_offers").doc(jobId).set(job, {merge: true});
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
