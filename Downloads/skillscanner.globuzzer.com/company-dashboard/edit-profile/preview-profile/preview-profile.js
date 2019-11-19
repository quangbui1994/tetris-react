var firestore = firebase.firestore();

$(document).ready(function() {
    let companyInfo = JSON.parse(sessionStorage.getItem('companyInfo'));
    console.log(companyInfo);
    parseCompanyInfo($('.company-name p'), companyInfo.company_name);
    parseCompanyInfo($('#company-location'), `${companyInfo.location}`);
    parseCompanyInfo($('#company-website'), companyInfo.companyWebsite);
    parseCompanyInfo($('#company-email'), companyInfo.email);
    if (companyInfo.companyDescription) {
        parseCompanyInfo($('#company-description'), companyInfo.companyDescription);
    }

    $('.save-btn').click(function() {
        firestore.collection('companies').doc(companyInfo.email).set(companyInfo, { merge: true });
    });
});

function parseCompanyInfo (nodeChild, value) {
    nodeChild.text(value);
 }