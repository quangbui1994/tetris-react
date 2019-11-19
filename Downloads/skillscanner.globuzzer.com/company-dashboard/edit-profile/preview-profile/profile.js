var firestore = firebase.firestore();

$(document).ready(function() {
    let companyInfo = JSON.parse(sessionStorage.getItem('companyInfo'));
    let companyInfoUpdated = JSON.parse(sessionStorage.getItem('companyInfoUpdated'));
    if (companyInfoUpdated) {
        if (JSON.stringify(companyInfoUpdated) !== JSON.stringify(companyInfo)) {
            $('.save-btn').text('Save');
        } 
        parseCompanyInfo($('.company-name p'), companyInfoUpdated.company_name);
        parseCompanyInfo($('#company-location'), `${companyInfoUpdated.location}`);
        parseCompanyInfo($('#company-website'), companyInfoUpdated.companyWebsite);
        parseCompanyInfo($('#company-email'), companyInfoUpdated.email);
        if (companyInfoUpdated.companyDescription) {
            parseCompanyInfo($('#company-description'), companyInfoUpdated.companyDescription);
        }

        
    } else {
        parseCompanyInfo($('.company-name p'), companyInfo.company_name);
        parseCompanyInfo($('#company-location'), `${companyInfo.location}`);
        parseCompanyInfo($('#company-website'), companyInfo.companyWebsite);
        parseCompanyInfo($('#company-email'), companyInfo.email);
        if (companyInfo.companyDescription) {
            parseCompanyInfo($('#company-description'), companyInfo.companyDescription);
        } 
    }

    $('.save-btn').click(function() {
        if (companyInfoUpdated) {
            firestore.collection('companies').doc(companyInfo.email).set(companyInfoUpdated, { merge: true }).then(() => {
                $('.save-btn').text('Edit Profile');
                $('.save-btn').unbind();
                $('.save-btn').bind('click', function() {
                    window.location.href = '../edit-profile.html';
                });
                sessionStorage.clear();
            });
        } else {
            window.location.href = '../edit-profile.html';
        }
    });

    firebase.auth().onAuthStateChanged(function(user) {
        firestore.collection('companies').doc(user.email).get().then(doc => {
            sessionStorage.setItem('companyInfo', JSON.stringify(doc.data()));
        });
    });
});

function parseCompanyInfo (nodeChild, value) {
    nodeChild.text(value);
}