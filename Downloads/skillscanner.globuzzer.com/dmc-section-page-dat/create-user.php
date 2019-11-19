<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin - Section</title>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
          integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
    <link rel="stylesheet" type='text/css' href="form.css">
    <link rel="stylesheet" type='text/css' href="searchbar.css">
</head>
<body>
<?php
include_once('navbar.php');
?>

<div class="container">
    <h1>Create New User</h1>
    <form name="adminForm">
        <label>
            <input type="text" name="company" placeholder="Insert name of company here..." required>
        </label>
        <label>
            <input type="email" name="email" placeholder="Insert email here..." required>
        </label>
        <label>
            <input type="password" name="password1" placeholder="Insert password here..." required>
        </label>
        <label>
            <input type="password" name="password2" placeholder="Repeat password here..." required>
        </label>
        <label>
            <input type="submit" value="Create" class="button" id="submit-btn">
        </label>
        <div style="display: none; color: green;" id="success">Saved successfully!</div>
        <div style="display: none; color: red;" id="error"></div>
    </form>
</div>

<!-- Firebase App is always required and must be first -->
<script src="https://www.gstatic.com/firebasejs/5.7.0/firebase-app.js"></script>

<script src="https://www.gstatic.com/firebasejs/5.7.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.7.0/firebase-storage.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.7.0/firebase-firestore.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDyddX6wQCk9PY-jxHnZj_8X3M3RbzuJy4",
    authDomain: "skillscanner-73181.firebaseapp.com",
    databaseURL: "https://skillscanner-73181.firebaseio.com",
    projectId: "skillscanner-73181",
    storageBucket: "skillscanner-73181.appspot.com",
    messagingSenderId: "269557896133"
  };
  firebase.initializeApp(config);
</script>
<script src="scripts/admin-auth.js"></script>
<script src="scripts/create-user.js"></script>
</body>
</html>