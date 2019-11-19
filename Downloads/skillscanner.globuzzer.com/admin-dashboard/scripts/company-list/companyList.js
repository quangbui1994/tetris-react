//Because html and javascript code is copied from job-list.html and jobList.js,
//All the conventions will be remained the same as in job-list.html and jobList.js.
//Remember to change conventions afterwards.

function hideFilterCategory(){
    $("#job-list-filter-category-dropdown-content").slideUp(250)
}

function toggleFilterCategory(){
    $("#job-list-filter-category-dropdown-content").slideToggle(250)
}

function ChooseFilterJobCategory(category){
    $("#company-list-filter-name-show").text(category)
    hideFilterCategory()
}

function hideFilterCountry(){
    $("#job-list-filter-country-dropdown-content").slideUp(250)
}

function toggleFilterCountry(){
    $("#job-list-filter-country-dropdown-content").slideToggle(250)
}

function ChooseFilterJobCountry(country){
    $("#company-list-filter-country-show").text(country)
    hideFilterCountry()
}

function hideFilterPackage(){
    $("#job-list-filter-date-dropdown-content").slideUp(250)
}

function toggleFilterPackage(){
    $("#job-list-filter-date-dropdown-content").slideToggle(250)
}

function ChooseFilterJobPackage(date){
    $("#company-list-filter-package-show").text(date)
    hideFilterPackage()
}


var firestore = firebase.firestore()

var settings = { timestampsInSnapshots: true};

var userEmail,
    companyName,
    plan

firebase.auth().onAuthStateChanged(function(user) {
    if(user){
        window.localStorage.setItem('companyEmail', user.email)

        userEmail = user.email

        firestore.collection('companies').doc(userEmail).onSnapshot(function(doc){
            companyName = doc.data()["company_name"]

            window.localStorage.setItem('companyName', companyName)

            plan = doc.data()["plan"]

            fetchCompanyData()
        })
    }

    else{
        window.location = "/company-login/c-sign-in-up.html"
    }
})

function fetchCompanyData(){
    firestore.collection("companies").onSnapshot(function(querySnapshot){
        $("#company-list-table-body").empty()

        querySnapshot.forEach(function(doc){
            var companyData = {
                id: doc.id,
                data: doc.data()
            }

            renderCompanyData(companyData)
        })
    })
}

function renderCompanyData(companyData){
    if(companyData.data.country.toLowerCase().trim() === $("#company-list-filter-country-show").text().toLowerCase().trim() ||
    $("#company-list-filter-country-show").text().toLowerCase() === "by country" || 
    $("#company-list-filter-country-show").text().toLowerCase() === "all"){
        var trNode = document.createElement("tr")

        var tdNameNode = document.createElement("td")
        tdNameNode.textContent = companyData.data.company_name

        trNode.appendChild(tdNameNode)

        var emailNode = document.createElement("td")
        emailNode.textContent = companyData.data.email

        trNode.appendChild(emailNode)

        var countryNode = document.createElement("td")
        countryNode.textContent = companyData.data.country

        trNode.appendChild(countryNode)

        var locationNode = document.createElement("td")
        locationNode.textContent = companyData.data.location

        trNode.appendChild(locationNode)

        var packageNode = document.createElement("td")
        packageNode.textContent = companyData.data.plan.substring(0, companyData.data.plan.indexOf("_"))

        trNode.appendChild(packageNode)

        var createdAtNode = document.createElement("td")
        createdAtNode.textContent = new Date(companyData.data.createdAt).toLocaleString()

        trNode.appendChild(createdAtNode)

        var deletetButtonNode = document.createElement("button")
        deletetButtonNode.classList.add("company-list-delete-button")
        deletetButtonNode.textContent = "Delete"
        deletetButtonNode.onclick = function(){
            deleteCompany(companyData.id)
        }

        trNode.appendChild(deletetButtonNode)

        $("#company-list-table-body").append(trNode)
    }
}

function deleteCompany(companyId){
    
    if(confirm("Are you sure to delete " + companyId)){
        firestore.collection("companies").doc(companyId).delete().then(function(){
            deleteAllJobOffers(companyId)
            .then(function(){
                console.log("deleted documents")
            })
        })
        .catch(function(err){
            console.log(err)
        })
    }
}

function deleteAllJobOffers(companyId){
    return firestore.collection("job_offers").where("companyId", "==", companyId).get().then(function(querySnapshot){
        var batch = firestore.batch()

        querySnapshot.forEach(function(doc){
            batch.delete(doc.ref)

            //Delete each job's related applicants and their stored cv, letters
            deleteApplicantsForJob(doc.id, companyId)
            deleteApplicantStorageForJob(doc.id, companyId)

            //Delete each job's related stored data
            deleteFromStorage(doc.data().fullPath)
            .then(function(){})
            .catch(function(err){
                console.log(err)
            })
        })

        return batch.commit()
    })
}

// function deleteJobOfferStorageData(companyId){
//     firestore.collection("job_offers").where("companyId", "==", companyId).get().then(function(querySnapshot){
//         querySnapshot.forEach(function(doc){
//             deleteFromStorage(doc.data().fullPath)
//             .then(function(){

//             })
//         })
//     })
//     .catch(function(err){
//         console.log(err)
//     })
// }

function deleteFromStorage(fullPath){
    var storageRef = firebase.storage().ref();

    return storageRef.child(fullPath).delete()
}

function deleteApplicantsForJob(jobId, companyId){
    firestore.collection("job_applicants").where("jobId", "==", jobId).where("companyMail", "==", companyId).get()
    .then(function(querySnapshot){
        var batch = firestore.batch()

        querySnapshot.forEach(function(doc){
            batch.delete(doc.ref)
        })

        return batch.commit()
    })
    .then(function(){
        console.log("deleted documents")
    })
    .catch(function(err){
        console.log(err)
    })
}

function deleteApplicantStorageForJob(jobId, companyId){
    firestore.collection("job_applicants").where("jobId", "==", jobId).where("companyMail", "==", companyId).get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            
            deleteFromStorage(doc.data().fullPathCv)
            .then(function(){
                deleteFromStorage(doc.data().fullPathCover)
                .then(function(){
                    console.log("deleted storages")
                })
            })
        })
    })
    .catch(function(err){
        console.log(err)
    })
}