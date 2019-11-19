var firestore = firebase.firestore()

var settings = { timestampsInSnapshots: true};

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


(function initApplicant(){
    var applicantId = getParameterByName("aid")

    firestore.collection("job_applicants").doc(applicantId).get().then(function(doc){
        $("#applicant-name").text(doc.data().lastName + " " + doc.data().firstName)
        $("#job-title").text(doc.data().jobInfo.title)
        $("#yah-applicant-name").text(doc.data().lastName + " " + doc.data().firstName)

        var cate_tag

        if(doc.data().jobInfo.category.toLowerCase().indexOf("developer".toLowerCase()) > -1){
            cate_tag = 'IT'
        }

        else if(doc.data().jobInfo.category.toLowerCase().indexOf("business".toLowerCase()) > -1){
            cate_tag = 'Business'
        }

        else if(doc.data().jobInfo.category.toLowerCase().indexOf("service".toLowerCase()) > -1){
            cate_tag = 'Service'
        }

        else if(doc.data().jobInfo.category.toLowerCase().indexOf("market".toLowerCase()) > -1){
            cate_tag = 'Business'
        }

        else if(doc.data().jobInfo.category.toLowerCase().indexOf("manage".toLowerCase()) > -1){
            cate_tag = 'Management'
        }
        
        else if(doc.data().jobInfo.category.toLowerCase().indexOf("sale".toLowerCase()) > -1){
            cate_tag = 'Sales'
        }

        else{
            doc.data().jobInfo = 'Others'
        }

        if(cate_tag === "IT" || cate_tag === "Service"){
            $("#job-category-tag").removeClass("job-category-tag-for-IT")
            $("#job-category-tag").removeClass("job-category-tag-for-business")
            $("#job-category-tag").removeClass("job-category-tag-for-others")

            $("#job-category-tag").addClass("job-category-tag-for-IT")
        }

        else if (cate_tag === "Business" || cate_tag === "Management"){
            $("#job-category-tag").removeClass("job-category-tag-for-IT")
            $("#job-category-tag").removeClass("job-category-tag-for-business")
            $("#job-category-tag").removeClass("job-category-tag-for-others")

            $("#job-category-tag").addClass("job-category-tag-for-business")
            
        }

        else if (cate_tag === "Others" || cate_tag === "Sales"){
            $("#job-category-tag").removeClass("job-category-tag-for-IT")
            $("#job-category-tag").removeClass("job-category-tag-for-business")
            $("#job-category-tag").removeClass("job-category-tag-for-others")

            $("#job-category-tag").addClass("job-category-tag-for-others")
        }

        $("#job-category-tag>p").text(cate_tag)

        $("#view-cv").attr("href", doc.data().cv)
        $("#view-cv").attr("target", "_blank")


        $("#applicant-email").text(doc.data().email)
        $("#applicant-phone").text(doc.data().phone)


        $("#view-cover-letter").attr("href", doc.data().coverLetter)
        $("#view-cover-letter").attr("target", "_blank")

        $("#applicant-location").text(doc.data().location)

        $("#applicant-personal-link").attr("href", doc.data().link)
        $("#applicant-personal-link").attr("target", "_blank")
        $("#applicant-personal-link").empty()
        $("#applicant-personal-link").append(doc.data().link)
        
        $("#message-holder").empty()
        $("#message-holder").append(doc.data().about)
    })
})()

var userEmail, companyName

firebase.auth().onAuthStateChanged(function(user) {
    if(user){
        window.localStorage.setItem('companyEmail', user.email)

        userEmail = user.email

        firestore.collection('companies').doc(userEmail).onSnapshot(function(doc){
            companyName = doc.data()["company_name"]

            window.localStorage.setItem('companyName', companyName)
        })
        .catch(function(err){
            console.log(err)
        })
    }

    else{
        window.location = "/company-login/c-sign-in-up.html"
    }
})