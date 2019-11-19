<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin - Section</title>
    <link rel="stylesheet" type='text/css' href="form.css">
</head>
<body>
<?php
include_once('navbar.php');
?>
<div class="container">
    <h1>Edit content</h1>
    <form name="editForm">
    <div class="section-content-container articles"> 
  <p>Enter article information</p>
    <label>
        <input type="text" name="atitle" placeholder="Insert title here..." >
    </label>
    <label>
        <input type="text" name="aauthor" placeholder="Insert author here..." >
    </label>
    <label>
        <textarea name="adescription" placeholder="Insert description here (Max 300 characters)..." maxlength="300"></textarea>
    </label>
    <label>
        <input type="text" name="alink" placeholder="Insert link to article here...">
    </label>
    
    </div>

    <div class="section-content-container feeds"> 
    <p>Enter feed information</p>
    <label>
        <input type="text" name="ftitle" placeholder="Insert title here..." >
    </label>
    <label>
        <input type="text" name="flocation" placeholder="Insert location here..." >
    </label>
    <label>
        <input type="text" name="fcategory" placeholder="Insert category here..." >
    </label>
    <label>
        <textarea name="fdescription" placeholder="Insert description here (Max 300 characters)..." maxlength="300"></textarea>
    </label>
    <label>
        <input type="text" name="flink" placeholder="Insert link to article here..." >
    </label>
  
    </div>

    <div class="section-content-container jobs"> 
    <p>Enter job information</p>
    <label>
        <input type="text" name="jtitle" placeholder="Insert title here..." >
    </label>
    <label>
        <input type="text" name="jcompany" placeholder="Insert company here..." >
    </label>
    <label>
        <input type="text" name="jposition" placeholder="Insert position here..." >
    </label>
    
    <label>
        <textarea name="jdescription" placeholder="Insert description here (Max 300 characters)..." maxlength="300"></textarea>
    </label>
    <label>
        <input type="text" name="jlink" placeholder="Insert link to article here...">
    </label>
    <br>
    <label>
        <input type="text" name="jcity" placeholder="Insert city here..." >
    </label>
    <label>
        <input type="text" name="jcategory" placeholder="Insert category here...">
    </label>
    </div>

    <div class="section-content-container events"> 
    <p>Enter event information</p>
    <label>
        <input type="text" name="etitle" placeholder="Insert title here...">
    </label>
    <label>
        <input type="text" name="elocation" placeholder="Insert location here...">
    </label>
    <label>
        <input type="date" name="edate" placeholder="Insert date here..." >
    </label>
    <label>
        <input type="text" name="ecategory" placeholder="Insert category here...">
    </label>
    <label>
        <textarea name="edescription" placeholder="Insert description here (Max 300 characters)..." maxlength="300" ></textarea>
    </label>
    <label>
        <input type="text" name="elink" placeholder="Insert link to article here...">
    </label>

    </div>
    <div class="section-content-container team"> 
    <p>Enter team information</p>
    <label>
        <input type="text" name="ttitle" placeholder="Insert title here...">
    </label>
    <label>
        <textarea name="tdescription" placeholder="Insert description here (Max 300 characters)..." maxlength="300" ></textarea>
    </label>
    <label>
        <input type="text" name="tlink" placeholder="Insert link to article here..." >
    </label>
  
    </div>

    <label>
        <input type="file" name="image" accept="image/*">
    </label>
    <p class="warning"> image has to be PNG and less than 200kb!</p>
    <div>
    <a class="button submit-button"  href="section-admin-show.php">Cancel </a>
    <input name="submitArticle" type="submit" value="Submit" class="button submit-button">
    </div>

        <div style="display: none; color: green;" id="success">Saved successfully!</div>
        <div style="display: none; color: red;" id="error"></div>
    </form>


</div>

<!-- Firebase App is always required and must be first -->
<script src="https://www.gstatic.com/firebasejs/5.7.0/firebase-app.js"></script>

<script src="https://www.gstatic.com/firebasejs/5.7.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.7.0/firebase-firestore.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.7.0/firebase-storage.js"></script>

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
<script src="scripts/edit-data.js"></script>
<script src="scripts/edit-display.js"></script>
</body>
</html>