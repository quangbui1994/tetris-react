var firestore = firebase.firestore()

var settings = { timestampsInSnapshots: true};

var userEmail,
    companyName,
    plan

function hideFilterCategory(){
    $("#job-list-filter-category-dropdown-content").slideUp(250)
}

function toggleFilterCategory(){
    $("#job-list-filter-category-dropdown-content").slideToggle(250)
}

function ChooseFilterJobCategory(category){
    $("#job-list-filter-category-show").text(category)
    hideFilterCategory()
    fetchApplicants(window.localStorage.getItem("companyEmail"))
}

function hideFilterCountry(){
    $("#job-list-filter-country-dropdown-content").slideUp(250)
}

function toggleFilterCountry(){
    $("#job-list-filter-country-dropdown-content").slideToggle(250)
}

function ChooseFilterJobCountry(country){
    $("#job-list-filter-country-show").text(country)
    hideFilterCountry()
    fetchApplicants(window.localStorage.getItem("companyEmail"))
}

function hideFilterDate(){
    $("#job-list-filter-date-dropdown-content").slideUp(250)
}

function toggleFilterDate(){
    $("#job-list-filter-date-dropdown-content").slideToggle(250)
}

function ChooseFilterJobDate(date){
    $("#job-list-filter-date-show").text(date)
    hideFilterDate()
    fetchApplicants(window.localStorage.getItem("companyEmail"))
}

firebase.auth().onAuthStateChanged(function(user) {
    if(user){
        window.localStorage.setItem('companyEmail', user.email)

        userEmail = user.email

        firestore.collection('companies').doc(userEmail).onSnapshot(function(doc){
            companyName = doc.data()["company_name"]

            window.localStorage.setItem('companyName', companyName)

            plan = doc.data()["plan"]
        })
    }

    else{
        window.location = "/company-login/c-sign-in-up.html"
    }
})


fetchApplicants(window.localStorage.getItem("companyEmail"))

function fetchApplicants(companyEmail){
    firestore.collection("job_applicants").where("companyMail", "==", companyEmail).onSnapshot(function(querySnapshot){
        $("#job-applications-content-holder").empty()

        querySnapshot.forEach(function(doc){
            var byCategory = $("#job-list-filter-category-show").text(),
                byCountry = $("#job-list-filter-country-show").text(),
                byDate = $("#job-list-filter-date-show").text(),

                applicantData = {
                    id: doc.id,
                    data: doc.data(),
                    jobData: doc.data().jobInfo
                    }

            renderApplicants(byCategory, byCountry, byDate, applicantData)
        })
    })
}


function renderApplicants(byCategory, byCountry, byDate, applicantData){
    var jobData = applicantData.jobData

    if(jobData.category.toLowerCase().trim() === byCategory.toLowerCase().trim() || byCategory.toLowerCase() === "by category" || byCategory.toLowerCase() === "all"){
        if(jobData.country.toLowerCase().trim() === byCountry.toLowerCase().trim() || byCountry.toLowerCase() === "by country" || byCountry.toLowerCase() === "all"){
            var cate_tag

            if(jobData.category.toLowerCase().indexOf("developer".toLowerCase()) > -1){
                cate_tag = 'IT'
            }
    
            else if(jobData.category.toLowerCase().indexOf("business".toLowerCase()) > -1){
                cate_tag = 'Business'
            }
    
            else if(jobData.category.toLowerCase().indexOf("service".toLowerCase()) > -1){
                cate_tag = 'Service'
            }
    
            else if(jobData.category.toLowerCase().indexOf("market".toLowerCase()) > -1){
                cate_tag = 'Business'
            }
    
            else if(jobData.category.toLowerCase().indexOf("manage".toLowerCase()) > -1){
                cate_tag = 'Management'
            }
            
            else if(jobData.category.toLowerCase().indexOf("sale".toLowerCase()) > -1){
                cate_tag = 'Sales'
            }
    
            else{
                cate_tag = 'Others'
            }

            var $applicant = 
                '<div class="job-applications-content-row">\n' +
                ' <div class="job-applications-applicant-name">\n' +
                '  <p>' + applicantData.data.lastName + " " + applicantData.data.firstName + '</p>\n' +
                '  <p class="job-applications-new-tag">New!</p>\n' +
                ' </div>\n' +
                ' <div class="mobile-job-applications-applied-date">\n' +
                '  <i class="far fa-clock"></i>\n' + 
                '  <p>2 days ago</p>\n' +
                ' </div>\n' +
                ' <div class="job-applications-job-title">\n' +
                '  <p>' + jobData.title + '</p>\n' +
                ' </div>\n' 

            if(cate_tag === "IT" || cate_tag === "Service"){
                $applicant += 
                ' <div class="job-applications-job-cate-tag-for-IT">\n' + 
                '  <p>' + cate_tag + '</p>\n' +
                ' </div>\n'
            }

            else if (cate_tag === "Business" || cate_tag === "Management"){
                $applicant += 
                ' <div class="job-applications-job-cate-tag-for-business">\n' + 
                '  <p>' + cate_tag + '</p>\n' +
                ' </div>\n'
            }

            else if (cate_tag === "Others" || cate_tag === "Sales"){
                $applicant += 
                ' <div class="job-applications-job-cate-tag-for-others">\n' + 
                '  <p>' + cate_tag + '</p>\n' +
                ' </div>\n'
            }

            var passingQuery = Qs.stringify({aid: applicantData.id})

            $applicant +=
                ' <div class="job-applications-job-country">\n' +
                '  <p>' + jobData.country + '</p>\n' +
                ' </div>\n' +
                ' <div class="job-applications-applied-date">\n' +
                '  <i class="far fa-clock"></i>\n' + 
                '  <p>2 days ago</p>\n' +
                ' </div>\n' +
                ' <div class="job-applications-view" onclick="window.open(\'/admin-dashboard/applicant.html?'+passingQuery+'\')">\n' +
                '  <i class="far fa-eye"></i>\n' +
                '  <p>View</p>\n' +
                ' </div>\n' +
                ' <div class="job-applications-delete" onclick="deleteApplicant(\''+ applicantData.id + '\',\'' 
                + applicantData.data.fullPathCv + '\',\'' + applicantData.data.fullPathCover + '\')">\n' + 
                '  <i class="far fa-trash-alt"></i>\n' +
                '  <p>Delete</p>\n' +
                ' </div>\n' +
                ' <div class="mobile-job-applications-view-delete-holder">\n' +
                '  <div class="job-applications-view" onclick="window.open(\'/admin-dashboard/applicant.html?'+passingQuery+'\')">\n' +
                '   <i class="far fa-eye"></i>\n' +
                '   <p>View</p>\n' +
                '  </div>\n' +
                '  <div class="job-applications-delete" onclick="deleteApplicant(\''+ applicantData.id + '\',\'' 
                +  applicantData.data.fullPathCv + '\',\'' + applicantData.data.fullPathCover + '\')">\n' + 
                '   <i class="far fa-trash-alt"></i>\n' +
                '   <p>Delete</p>\n' +
                '  </div>\n' +
                ' </div>\n' + 
                '</div>\n'


            $("#job-applications-content-holder").append($applicant)
        }
    }
}

function deleteApplicant(applicantId, fullPathCv, fullPathCover){
    if(confirm("Are you sure to delete " + applicantId)){
        firestore.collection("job_applicants").doc(applicantId).delete().then(function(){
            deleteFromStorage(fullPathCv)
            .then(function(){
                deleteFromStorage(fullPathCover)
                .then(function(){
                    console.log("deleted")
                })
            })
        })
        .catch(function(err){
            console.error("Error removing document: ", err);
        })
    }
}

function deleteFromStorage(fullPath){
    var storageRef = firebase.storage().ref();

    return storageRef.child(fullPath).delete()
}
