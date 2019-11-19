var form = document.adminForm;

var successMsg = document.getElementById("success");

var errorMsg = document.getElementById("error");

var country = document.getElementById("country-name").innerHTML;

//Function applied to onclick event of country-section-dropdown-content options (source file is navbar.php)
function DropdownSelectCountry(countryIndex){
  var countryFlag = document.getElementById("country-flag"),
      countryName = document.getElementById("country-name")
  

  switch (countryIndex){
    case 0:
      countryName.innerText = "Sweden"
      countryFlag.src = "images/SE.png"
      document.getElementById("redirect").href= "http://staging1.globuzzer.com/SkillScanner-remake/index.html?country=SE"
      break

    case 1:
      countryName.innerText = "Finland"
      countryFlag.src = "images/FI.png"
      document.getElementById("redirect").href= "http://staging1.globuzzer.com/SkillScanner-remake/index.html?country=FI"
      break

    case 2:
      countryName.innerText = "Norway"
      countryFlag.src = "images/NO.png"
      document.getElementById("redirect").href= "http://staging1.globuzzer.com/SkillScanner-remake/index.html?country=NO"
      break

    case 3:
      countryName.innerText = "Denmark"
      countryFlag.src = "images/DK.png"
      document.getElementById("redirect").href= "http://staging1.globuzzer.com/SkillScanner-remake/index.html?country=DK"
      break
  }

}
//end of DropdownSelectCountry

form.addEventListener('submit', function (e) {

  e.preventDefault();

  var submitBtn = document.getElementById('submit-btn');

  setLoading(submitBtn);

  var email = e.target.email.value;

  var pw1 = e.target.password1.value;

  var pw2 = e.target.password2.value;

  var company = e.target.company.value;



  if (pw1 === pw2) {

    // create firebase user

    firebase.auth().createUserWithEmailAndPassword(email, pw1)

      .then(function (snapshot) {

        var firestore = firebase.firestore();

        var settings = {/* your settings... */ timestampsInSnapshots: true};

        firestore.settings(settings);



        // add user to db

        firestore.collection('companyUsers').doc(snapshot.user.uid).set({

          email: email,

          company: company,

          country: country

        })

          .then(function () {

            showSuccessMsg();

            hideErrorMsg();

            resetSubmitBtn(submitBtn);

          })

          .catch(function (error) {

            console.log(error);

            hideSuccessMsg();

            showErrorMsg();

            resetSubmitBtn(submitBtn);

          });

      })

      .catch(function (error) {

        // Handle Errors here.

        var errorCode = error.code;

        var errorMessage = error.message;

        console.log(errorMessage);

        hideSuccessMsg();

        showErrorMsg();

        resetSubmitBtn(submitBtn);

        // ...

      });

  }

});



function showSuccessMsg() {

  successMsg.style.display = "block";

}



function hideSuccessMsg() {

  successMsg.style.display = "none";

}



function showErrorMsg() {

  errorMsg.innerHTML = "Error! Please contact IT.";

  errorMsg.style.display = "block";

}



function hideErrorMsg() {

  errorMsg.style.display = "none";

}



function resetSubmitBtn(target) {

  target.value = 'Create';

  target.disabled = false;

  target.classList.remove("disabled");

}



function setLoading(target) {

  target.value = 'Loading...';

  target.disabled = true;

  target.classList.add("disabled");

}