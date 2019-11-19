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

    <h1>Create New Content</h1>

    <form name="adminForm">

        <label>

            Select the category: <br>

            <select name="category">

                <option value="jobs">Jobs</option>

                <option value="events">Events</option>

                <option value="articles">Articles</option>

                <option value="team">Team</option>

            </select>

        </label>

        <div class="section-content-container articles">

            <p>Enter article information</p>

            <label>

                <input type="text" name="atitle" placeholder="Insert title here...">

            </label>

            <label>

                <input type="text" name="aauthor" placeholder="Insert author here...">

            </label>
            
            <label>

                <textarea name="adescription" placeholder="Insert description here (Max 200 characters)..."

                          maxlength="200"></textarea>

            </label>

            <label>

                <input type="text" name="alink" placeholder="Insert link to article here...">

            </label>



        </div>



        <div class="section-content-container feeds">

            <p>Enter feed information</p>

            <label>

                <input type="text" name="ftitle" placeholder="Insert title here...">

            </label>

            <label>

                <input type="text" name="flocation" placeholder="Insert location here...">

            </label>

            <label>



                <input type="text" name="fcategory" placeholder="Insert category here...">

            </label>

            <label>

                <textarea name="fdescription" placeholder="Insert description here (Max 300 characters)..."

                          maxlength="300"></textarea>

            </label>

            <label>

                <input type="text" name="flink" placeholder="Insert link to article here...">

            </label>



        </div>



        <div class="section-content-container jobs">

            <p>Enter job information</p>

            <label>

                <input type="text" name="j-title" placeholder="Insert title here...">

            </label>

            <label>

                <!-- <input type="text" name="j-position" placeholder="Insert position here..."> -->
                
                <select name="j-position">
                    <option value="intern">Intern</option>
                    <option value="trainee">Trainee</option>
                    <option value="fullTime">Full-time</option>
                    <option value="partTime">Part-time</option>
                </select>

            </label>

            <label>

                <input type="text" name="j-city" placeholder="Insert city here...">

            </label>

            <label>

                <!-- <input type="text" name="j-country" placeholder="Insert country here..."> -->
                <select name="j-country">
                    <option value="sweden">Sweden</option>
                    <option value="finland">Finland</option>
                    <option value="norway">Norway</option>
                    <option value="denmark">Denmark</option>
                </select>

            </label>

            <label>

                <!-- <input type="text" name="j-category" placeholder="Insert category here..."> -->
                <select name="j-category">
                    <option value="back-end-developer">Back End Developer</option>
                    <option value="front-end-developer">Front End Developer</option>
                    <option value="full-stack-developer">Full Stack Developer</option>
                    <option value="android-developer">Android Developer</option>
                    <option value="ios-developer">iOS Developer</option>
                    <option value="business-development">Business Development</option>
                    <option value="business-intelligence">Business Intelligence</option>
                    <option value="customer-service">Customer Service</option>
                    <option value="design">Design</option>
                    <option value="marketing-and-communication">Marketing & Communication</option>
                    <option value="project-management">Project Management</option>
                    <option value="sales">Sales</option>
                    <option value="other">Other</option>
                </select>
            </label>

            <label>

                <!-- <input type="text" name="j-salary" placeholder="Insert salary here..."> -->

                <select name="j-salary">
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                </select>

            </label>

            <label>

                <textarea name="j-description" placeholder="Insert description here..."></textarea>
            
            </label>

            <label>

                <input type="text" name="j-link" placeholder="Insert link to job here...">

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

                <input type="date" name="edate" placeholder="Insert date here...">

            </label>

            <label>

                <input type="text" name="ecategory" placeholder="Insert category here...">

            </label>

            <label>

                <textarea name="edescription" placeholder="Insert description here (Max 200 characters)..."

                          maxlength="200"></textarea>

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

                <input type="text" name="tposition" placeholder="Insert position here...">

            </label>

            <label>

                <input type="text" name="tcity" placeholder="Insert city here...">

            </label>

            <label>

                <input type="text" name="tcategory" placeholder="Insert category here...">

            </label>

            <label>

                <textarea name="tdescription" placeholder="Insert description here (Max 300 characters)..."

                          maxlength="300"></textarea>

            </label>

            <label>

                <input type="text" name="tlink" placeholder="Insert link to article here...">

            </label>



        </div>



        <label>

            <input type="file" name="image" accept="image/*">

        </label>

        <p class="warning"> image has to be PNG and less than 500kb!</p>

        <div class='CNC-Cancel-Submit-wrapper'>

            <a class="button submit-button" href="section-admin-show.php">Cancel </a>

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

<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>

<script src="scripts/admin-auth.js"></script>

<script src="scripts/admin-actions.js"></script>

<script src="scripts/section-display.js"></script>



</body>

</html>