<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8">

    <title>Admin - Section</title>

    <link rel="stylesheet" type='text/css' href="form.css">

    <link rel="stylesheet" type='text/css' href="searchbar.css">

</head>

<body>

<?php

include_once('navbar.php');

?>

<div class="container">

    <h1>Created Content</h1>

    <form name="chooseSection" class="horizontal-form">

        <label>

            Select category to show: <br>

            <select name="category">

                <option value="jobs">Jobs</option>

                <option value="events">Events</option>

                <option value="articles">Articles</option>

                <option value="team">Team</option>



            </select>

        </label>

    </form>

    <!--searchbar -->

    <div class="searchbar">

        <svg style="display: none">

            <symbol id="magnify" viewBox="0 0 18 18" height="100%" width="100%">

                <path d="M12.5 11h-.8l-.3-.3c1-1.1 1.6-2.6 1.6-4.2C13 2.9 10.1 0          6.5 0S0 2.9 0 6.5 2.9 13 6.5 13c1.6 0 3.1-.6 4.2-1.6l.3.3v.8l5 5          1.5-1.5-5-5zm-6 0C4 11 2 9 2 6.5S4 2 6.5 2 11 4 11 6.5 9 11 6.5            11z"

                      fill="#fff" fill-rule="evenodd"></path>

            </symbol>

        </svg>

        <div class="search-bar">

            <input type="text" class="input" name="search" placeholder="Keyword...">

            <span class="highlight"></span>

            <div class="search-btn" name="search-btn">

                <svg class="icon icon-18">

                    <use xlink:href="#magnify"></use>

                </svg>

            </div>

        </div>

        <!-- Sorting -->

        <!-- <label>

            <select name="filter" class="filter">

                <option value="date">Sort by date</option>

                <option value="title">Sort by title</option>

            </select>

        </label> -->


        <label>
            <select id="category-filter" class="filter">
                <option value="default" selected>Sort by category (All)</option>
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
            <select id="country-filter" class="filter">
                <option value="default" selected>Sort by country (All)</option>
                <option value="sweden">Sweden</option>
                <option value="finland">Finland</option>
                <option value="norway">Norway</option>
                <option value="denmark">Denmark</option>
            </select>
        </label>

    </div>

    <div>

        <!--searchbar -->

        <div class="article-container">

            <div class="section-container">

                <ul id="article-list" class="article-list">

                    <p>Loading content...</p>

                </ul>

            </div>

        </div>

    </div>


    <!-- jobs editing tab -->
    <div class="job-edit-tab job-post-edit-container-invisible" id="job-edit-tab">
        <div class="job-post-edit-container" id="job-post-edit-container">
            <div class="edit-form" id="edit-job-form">
                <div class="section-content-container" >
                    <p id="edit-id">Edit job information</p>

                    <label>

                        <input type="text" id="e-job-title" placeholder="Insert title here...">

                    </label>

                    <label>

                        <input type="text" id="e-job-position" placeholder="Insert position here...">

                    </label>

                    <label>

                        <input type="text" id="e-job-city" placeholder="Insert city here...">

                    </label>

                    <label>

                        <input type="text" id="e-job-country" placeholder="Insert country here...">

                    </label>

                    <label>

                        <input type="text" id="e-job-category" placeholder="Insert category here...">

                    </label>

                    <label>

                        <input type="text" id="e-job-salary" placeholder="Insert salary here...">

                    </label>

                    <label>

                        <textarea id="e-job-description" placeholder="Insert description here (Max 300 characters)..."

                                maxlength="300"></textarea>

                    </label>

                    <label>

                        <input type="text" id="e-job-link" placeholder="Insert link to article here...">

                    </label>

                </div>


                <label>

                    <input type="file" id="e-job-image" accept="image/*">

                </label>

                <p class="warning"> image has to be PNG and less than 200kb!</p>

                <div class='CNC-Cancel-Submit-wrapper'>

                    <button class="button submit-button edit-cancel" >Cancel</button>

                    <input name="submitArticle" type="submit" value="Submit" class="button submit-button" id="edit-job-submit">

                    
                
                </div>

                <div style="display: none; color: green;" id="success">Saved successfully!</div>

                <div style="display: none; color: red;" id="error"></div>


            </div>
        </div>
    </div>


    <!-- events editing tab -->
    <div class="job-edit-tab job-post-edit-container-invisible" id="event-edit-tab">
        <div class="job-post-edit-container" id="job-post-edit-container">
            <div class="edit-form" id="edit-event-form">
                <div class="section-content-container" >
                    <p id="edit-event-id">Edit job information</p>

                    <label>

                        <input type="text" id="e-event-title" placeholder="Insert title here...">

                    </label>

                    <label>

                        <input type="text" id="e-event-location" placeholder="Insert location here...">

                    </label>
                    
                    <label>

                        <input type="date" id="e-event-date" placeholder="Insert date here...">

                    </label>

                    <label>

                        <input type="text" id="e-event-category" placeholder="Insert category here...">

                    </label>

                    <label>

                        <textarea id="e-event-description" placeholder="Insert description here (Max 300 characters)..."

                                maxlength="300"></textarea>

                    </label>

                    <label>

                        <input type="text" id="e-event-link" placeholder="Insert link to article here...">

                    </label>

                </div>


                <label>

                    <input type="file" id="e-event-image" accept="image/*">

                </label>

                <p class="warning"> image has to be PNG and less than 200kb!</p>

                <div class='CNC-Cancel-Submit-wrapper'>

                    <button class="button submit-button edit-cancel">Cancel</button>

                    <input name="submitArticle" type="submit" value="Submit" class="button submit-button" id="edit-event-submit">

                    
                
                </div>

                <div style="display: none; color: green;" id="event-success">Saved successfully!</div>

                <div style="display: none; color: red;" id="event-error"></div>


            </div>
        </div>
    </div>

    <!-- articles editing tab -->
    <div class="job-edit-tab job-post-edit-container-invisible" id="article-edit-tab">
        <div class="job-post-edit-container" id="job-post-edit-container">
            <div class="edit-form" id="edit-article-form">
                <div class="section-content-container" >
                    <p id="edit-article-id">Edit article information</p>

                    <label>

                        <input type="text" id="e-article-title" placeholder="Insert title here...">

                    </label>

                    <label>

                        <input type="text" id="e-article-author" placeholder="Insert author here...">

                    </label>

                    <label>

                        <textarea id="e-article-description" placeholder="Insert description here (Max 300 characters)..."

                                maxlength="300"></textarea>

                    </label>

                    <label>

                        <input type="text" id="e-article-link" placeholder="Insert link to article here...">

                    </label>

                </div>

                <label>

                    <input type="file" id="e-article-image" accept="image/*">

                </label>

                <p class="warning"> image has to be PNG and less than 200kb!</p>

                <div class='CNC-Cancel-Submit-wrapper'>

                    <button class="button submit-button edit-cancel">Cancel</button>

                    <input name="submitArticle" type="submit" value="Submit" class="button submit-article-button" id="edit-article-submit">

                    
                
                </div>

                <div style="display: none; color: green;" id="article-success">Saved successfully!</div>

                <div style="display: none; color: red;" id="article-error"></div>


            </div>
        </div>
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

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

    <script src="scripts/admin-auth.js"></script>

    <script src="scripts/fetch-admin-data.js"></script>
</body>

</html>