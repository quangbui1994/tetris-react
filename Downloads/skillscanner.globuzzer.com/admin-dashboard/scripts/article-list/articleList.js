var firestore = firebase.firestore()

var settings = { timestampsInSnapshots: true};

var userEmail,
    companyName,
    plan;

let selectedJobs = [];


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

fetchArticles()


function fetchArticles(){
    $(".job-list-content-holder .job-list-content-row").remove()
    $(".job-list-expired-content-holder .job-list-content-row").remove()
    firestore.collection("articles").onSnapshot(function(querySnapshot){
        
        $("#article-list-content-holder *:not('.edit-tools')").empty()

        querySnapshot.forEach(function(doc){
            articleData = {
                id: doc.id,
                data: doc.data()
                }
            
            
            renderArticles(articleData)
        })
    })
}

function renderArticles(articleData){
    var articleListContentRow = document.createElement('div')
        articleListContentRow.classList.add("job-list-content-row")

        var articleListContentTitle = document.createElement('div')
        articleListContentTitle.classList.add("job-list-content-title")

        var articleListContentTitleP = document.createElement('p')
        articleListContentTitleP.textContent = articleData.data.title

        articleListContentTitle.appendChild(articleListContentTitleP)
        articleListContentRow.appendChild(articleListContentTitle)

        var passingQuery = Qs.stringify({id: articleData.id}),
            previewQuery = Qs.stringify({preview: true})

        var daysPassed = parseInt((new Date().getTime() - new Date(articleData.data.createdAt).getTime())/(60 * 60 * 24 * 1000))
        var daysAgoText = ""

        if(daysPassed === 0){
            daysAgoText = "within 24 hours"
        }

        else{
            daysAgoText = daysPassed + " day(s) ago"
        }

        var mobileArticleListPostedTime = document.createElement('div')
        mobileArticleListPostedTime.classList.add("mobile-job-list-content-posted-time")

        var mobileArticleListPostedTimeIcon = document.createElement('i')
        mobileArticleListPostedTimeIcon.classList.add("far")
        mobileArticleListPostedTimeIcon.classList.add("fa-clock")
        mobileArticleListPostedTime.append(mobileArticleListPostedTimeIcon)

        var mobileArticleListPostedTimeDaysAgo = document.createElement('p')
        mobileArticleListPostedTimeDaysAgo.textContent = daysAgoText
        mobileArticleListPostedTime.append(mobileArticleListPostedTimeDaysAgo)

        articleListContentRow.appendChild(mobileArticleListPostedTime)

        var articleListPostedTime = document.createElement('div')
        articleListPostedTime.classList.add("article-list-content-posted-time")

        var articleListPostedTimeIcon = document.createElement("i")
        articleListPostedTimeIcon.classList.add("far")
        articleListPostedTimeIcon.classList.add("fa-clock")
        articleListPostedTime.appendChild(articleListPostedTimeIcon) 

        var articleListPostedTimeDaysAgo = document.createElement("p")
        articleListPostedTimeDaysAgo.textContent = daysAgoText
        articleListPostedTime.appendChild(articleListPostedTimeDaysAgo)

        articleListContentRow.appendChild(articleListPostedTime)

        var jobListEdit = document.createElement('div')
        jobListEdit.classList.add("job-list-content-edit")
        jobListEdit.onclick= function() {window.open("/admin-dashboard/edit-article.html?"+passingQuery)}

        var jobListEditIcon = document.createElement("i")
        jobListEditIcon.classList.add("far")
        jobListEditIcon.classList.add("fa-edit")
        jobListEdit.append(jobListEditIcon)

        var jobListEditP = document.createElement('p')
        jobListEditP.textContent = 'Edit'
        jobListEdit.append(jobListEditP)

        articleListContentRow.appendChild(jobListEdit)

        var jobListContentView = document.createElement('div')
        jobListContentView.classList.add("job-list-content-view")
        jobListContentView.onclick = function() {
            window.open(articleData.data.link)
        }

        var jobListContentViewIcon = document.createElement("i")
        jobListContentViewIcon.classList.add("far")
        jobListContentViewIcon.classList.add("fa-eye")
        jobListContentView.append(jobListContentViewIcon)

        var jobListContentViewP = document.createElement('p')
        jobListContentViewP.textContent = 'View'
        jobListContentView.append(jobListContentViewP)

        articleListContentRow.appendChild(jobListContentView)

        var jobListContentDelete = document.createElement('div')
        jobListContentDelete.classList.add("job-list-content-delete")
        jobListContentDelete.onclick = function() { 
            deleteArticle(articleData.id , articleData.data.fullPath)
        }


        var jobListContentDeleteIcon = document.createElement("i")
        jobListContentDeleteIcon.classList.add("far")
        jobListContentDeleteIcon.classList.add("fa-trash-alt")
        jobListContentDelete.append(jobListContentDeleteIcon)

        var jobListContentDeleteP = document.createElement('p')
        jobListContentDeleteP.textContent = 'Delete'
        jobListContentDelete.append(jobListContentDeleteP)

        articleListContentRow.appendChild(jobListContentDelete)

        var mobileEditViewDeleteHolder = document.createElement("div")
        mobileEditViewDeleteHolder.classList.add("mobile-edit-view-delete-holder")

        var mobileJobListEdit = document.createElement('div')
        mobileJobListEdit.classList.add("job-list-content-edit")
        mobileJobListEdit.onclick= function() {window.open("/admin-dashboard/edit-job.html?"+passingQuery)}

        var mobileJobListEditIcon = document.createElement("i")
        mobileJobListEditIcon.classList.add("far")
        mobileJobListEditIcon.classList.add("fa-edit")
        mobileJobListEdit.append(mobileJobListEditIcon)

        var mobileJobListEditP = document.createElement('p')
        mobileJobListEditP.textContent = 'Edit'
        mobileJobListEdit.append(mobileJobListEditP)

        mobileEditViewDeleteHolder.appendChild(mobileJobListEdit)

        var mobileJobListContentView = document.createElement('div')
        mobileJobListContentView.classList.add("job-list-content-view")
        mobileJobListContentView.onclick = function() {
            window.open(articleData.data.link)
        }


        var mobileJobListContentViewIcon = document.createElement("i")
        mobileJobListContentViewIcon.classList.add("far")
        mobileJobListContentViewIcon.classList.add("fa-eye")
        mobileJobListContentView.append(mobileJobListContentViewIcon)

        var mobileJobListContentViewP = document.createElement('p')
        mobileJobListContentViewP.textContent = 'View'
        mobileJobListContentView.append(mobileJobListContentViewP)

        mobileEditViewDeleteHolder.appendChild(mobileJobListContentView)

        var mobileJobListContentDelete = document.createElement('div')
        mobileJobListContentDelete.classList.add("job-list-content-delete")
        mobileJobListContentDelete.onclick = function() { 
            deleteArticle(articleData.id , articleData.data.fullPath)
        }

        var mobileJobListContentDeleteIcon = document.createElement("i")
        mobileJobListContentDeleteIcon.classList.add("far")
        mobileJobListContentDeleteIcon.classList.add("fa-trash-alt")
        mobileJobListContentDelete.append(mobileJobListContentDeleteIcon)

        var mobileJobListContentDeleteP = document.createElement('p')
        mobileJobListContentDeleteP.textContent = 'Delete'
        mobileJobListContentDelete.append(mobileJobListContentDeleteP)

        mobileEditViewDeleteHolder.appendChild(mobileJobListContentDelete)


        articleListContentRow.appendChild(mobileEditViewDeleteHolder)

        var checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.name = articleData.id;
            checkBox.classList.add('job-item', 'job-item-active');
            checkBox.setAttribute('fullPath', articleData.data.fullPath);
            

            // $('.clearAll').click(function() {
            //     deleteAll();
            // })

            articleListContentRow.appendChild(checkBox);


        $("#article-list-content-holder").append(articleListContentRow)

}


function deleteFromStorage(fullPath){
    var storageRef = firebase.storage().ref();

    return storageRef.child(fullPath).delete()
}

function deleteArticle(articleId, fullPath){
    if(confirm("Are you sure to delete " + articleId)){
        firestore.collection("articles").doc(articleId).delete().then(function(){
            // deleteFromStorage(fullPath)
            // .then(function(){
            // })
            fetchArticles()
        })
        .catch(function(err){
            console.error("Error removing document: ", err);
        })

        // fetchArticles()
    }
}

function deleteAll() {
    if (selectedJobs.length > 0) {
        if(confirm("Are you sure to delete these")) {
            selectedJobs.map(job => {
                firestore.collection("articles").doc(job.jobId).delete().then(function(){
                    // deleteFromStorage(job.jobFullPath)
                    // .then(function(){
                    // })
                    fetchArticles()
                })
                .catch(function(err){
                    console.error("Error removing document: ", err);
                })

        
                // deleteApplicantStorageForJob(job.jobId, window.localStorage.getItem("companyEmail"))
        
                // deleteApplicantsForJob(job.jobId, window.localStorage.getItem("companyEmail"))
        
            });
        }
    }
}

$(document).ready(function() {
    

    $(document).on('change','.selectAllCheckbox-saved', function() {
        console.log('hi')
        $('.job-item-saved').prop('checked', this.checked).change();
    });

    $(document).on('change', '.selectAllCheckbox-expired', function() {
        $('.job-item-expired').prop('checked', this.checked).change();
    });

    $(document).on('change', '.selectAllCheckbox-active', function() {
        $('.job-item-active').prop('checked', this.checked).change();
    });

    $(document).on('click', '.clearAll', function() {
        deleteAll();
    });

    $(document).on('click', '.clearAll-saved', function() {
        console.log('start delete')
        deleteSavedAll();
    })

    $(document).on('change', '.job-item', function() {
        // console.log('checkbox changed')
        var jobItem = {
            jobId: this.getAttribute('name'),
            jobFullPath: this.getAttribute('fullPath')
        };
        if(this.checked) {
            console.log(jobItem)
            if (selectedJobs.length > 0) {
                if (selectedJobs.some(job => job.jobId !== jobItem.jobId)) {
                    selectedJobs.push(jobItem);            
                }
            } else if (selectedJobs.length === 0){
                selectedJobs.push(jobItem);            
            }   
        } else {
            console.log('remove')
            selectedJobs.splice(selectedJobs.indexOf(jobItem), 1);  
        }
        selectedJobs.filter(function(job, index) {
            return selectedJobs.indexOf(job) === index
        })
    });
});

let random = Math.floor(Math.random() * 10).toString();

function test () {
    firestore.collection('articles').doc(random).set({
        category: 'articles'
    })
}