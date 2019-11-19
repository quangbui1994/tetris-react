var firestore = firebase.firestore()

var settings = { timestampsInSnapshots: true};

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