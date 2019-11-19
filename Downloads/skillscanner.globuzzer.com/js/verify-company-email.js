var companyEmail = window.localStorage.getItem('companyEmail')

window.onload = function(){
    if(companyEmail.length > 0){
        var firestore = firebase.firestore()
    
        var docRef = firestore.collection("companies").doc(companyEmail)
    
        docRef.get().then(function(doc) {
            if(doc.exists){
                docRef.update({
                    emailVerified: true
                })
            }
        })
        .catch(function(err) {
            console.log(err)
        })
    }
    
    else{
        console.log(companyEmail)
    }
}





