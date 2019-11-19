$(function () {
  $("#apply-form").submit(function (e) {
    e.preventDefault();
    var $error = $(".error-msg");
    var response = grecaptcha.getResponse();
    if (response === "") {
      console.log("captcha failed!");
      $error.html('Captcha failed!');
    } else {
      var form_data = $(this).serialize();
      $.ajax({
        type: "POST",
        url: "apply-mail.php",
        dataType: "json", // Add datatype
        data: form_data
      }).done(function (data) {
        addApplicantToDB(data);
        showSuccessBox();
      }).fail(function (data) {
        console.log(data);
        $error.html('There was an error during your request!');
      });
    }
  });
});

function addApplicantToDB(data) {
  var firestore = firebase.firestore();
  data['appliedOn'] = new Date();
  data['status'] = 'new';
  console.log(data);
  firestore.collection('applicants').doc().set(data)
    .then(function () { console.log('Successfully added to db.')})
    .catch(function (err) { console.log(err) });
}