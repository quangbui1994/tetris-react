var firestore = firebase.firestore();
let companyInfo;
let bannerImage;

$(document).ready(function () {
   $('.strength-infor').click(function(){
      $('.pass-strength-infor').toggle();
     });
   firebase.auth().onAuthStateChanged(function(user) { 
      firestore.collection('companies').doc(user.email).get().then(doc => {
         sessionStorage.setItem('companyInfo', JSON.stringify(doc.data()));
         companyInfo = JSON.parse(sessionStorage.getItem('companyInfo'))
         parseAllData();
     });
   });
   
   companyInfo = JSON.parse(sessionStorage.getItem('companyInfo'));

   if (companyInfo) {
      parseAllData();
   }

   $('#preview-profile').click(function() {
      let company_name = getCompanyInfo($('#company-name'), 'input');
      let email = getCompanyInfo($('#company-email'), 'input');
      let companyWebsite = getCompanyInfo($('#company-website'), 'input');
      let companyDescription = getCompanyInfo($('.ql-editor p'), 'p') || getCompanyInfo($('.ql-editor p span'), 'p');
      let nameContact = getCompanyInfo($('#contact-name'), 'input');
      let positionContact = getCompanyInfo($('#contact-position'), 'input');
      let emailContact = getCompanyInfo($('#contact-email'), 'input');
      let phoneContact = getCompanyInfo($('#contact-phone'), 'input');
      let contactPerson = {
         nameContact,
         positionContact,
         emailContact,
         phoneContact
      }
      companyInfoUpdated = {
         ...companyInfo,
         company_name,
         email,
         companyWebsite,
         companyDescription,
         contactPerson
      };
      sessionStorage.setItem('companyInfoUpdated', JSON.stringify(companyInfoUpdated));

      // let bannerImage = document.getElementById('logo-drop-title');
      console.log(bannerImage);
      let imgData = getBase64Image(bannerImage);
      localStorage.setItem("imgData", imgData);
   })
});

function parseCompanyInfo (nodeChild, value, nodeChildType) {
   if (nodeChildType === 'input') {
      nodeChild.val(value);
   } else if (nodeChildType === 'p') {
      nodeChild.text(value);
   }
}

function getCompanyInfo (nodeChild, nodeChildType) {
   if (nodeChildType === 'input') {
      return nodeChild.val();
   } else if (nodeChildType === 'p') {
      return nodeChild.text();
   }
}

function locationEditor (location) {
   return location.slice(0, location.indexOf(','));
}

function getBase64Image(img) {
   var canvas = document.createElement("canvas");
   canvas.width = img.width;
   canvas.height = img.height;

   var ctx = canvas.getContext("2d");
   ctx.drawImage(img, 0, 0);

   var dataURL = canvas.toDataURL("image/png");

   return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function parseAllData () {
   parseCompanyInfo($('#company-name'), companyInfo.company_name, 'input');
   parseCompanyInfo($('#company-website'), companyInfo.companyWebsite, 'input');
   parseCompanyInfo($('#company-email'), companyInfo.email, 'input');
   parseCompanyInfo($('#company-city'), locationEditor(companyInfo.location, 'input'));
   parseCompanyInfo($('#company-country'), companyInfo.country, 'input');
   parseCompanyInfo($('.ql-editor p'), companyInfo.companyDescription, 'p');
   parseCompanyInfo($('#contact-name'), companyInfo.contactPerson.nameContact, 'input');
   parseCompanyInfo($('#contact-position'), companyInfo.contactPerson.positionContact, 'input');
   parseCompanyInfo($('#contact-email'), companyInfo.contactPerson.emailContact, 'input');
   parseCompanyInfo($('#contact-phone'), companyInfo.contactPerson.phoneContact, 'input');
}
function loadEvent() {
   console.log(event.target.files[0].name)
   bannerImage = event.target.files[0].name;
}

