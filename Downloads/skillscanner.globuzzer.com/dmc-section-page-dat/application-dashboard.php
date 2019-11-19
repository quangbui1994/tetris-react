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

<div style="display: none;" class="modal">

    <div class="modal-box" id="cover-letter"></div>

</div>

<div class="container">

    <h1>Application Dashboard</h1>

    <div id="job-container">

        <h3>Jobs</h3>

        <table class="hover-table">

            <thead>

            <tr>

                <th>Title</th>

                <th>Role</th>

                <th>Applicants</th>

                <th>Creation Date</th>

            </tr>

            </thead>

            <tbody id="jobs">

            <tr>

                <td colspan="4">Loading jobs...</td>

            </tr>

            </tbody>

        </table>

    </div>

    <div id="applicant-container" style="display: none;">

        <h4>Applicants for "<span id="job-title">[title]</span>"</h4>

        <div class="space-between-box">

            <div class="flex">

                <input id="search-applicants" type="text" title="search-applicants" placeholder="Search...">

                <div class="custom-select">

                    <div class="select-box">Filter status <i class="fas fa-angle-down"></i></div>

                    <div class="filter-box">

                        <label><input class="filter-check" type="checkbox" value="new"> New</label>

                        <label><input class="filter-check" type="checkbox" value="contacted"> Contacted</label>

                        <label><input class="filter-check" type="checkbox" value="interviewed"> Interviewed</label>

                        <label><input class="filter-check" type="checkbox" value="hired"> Hired</label>

                        <label><input class="filter-check" type="checkbox" value="to be rejected"> To be rejected</label>

                        <label><input class="filter-check" type="checkbox" value="rejected"> Rejected</label>

                        <label><input class="filter-check" type="checkbox" value="closed"> Closed</label>

                    </div>

                </div>

                <select id="sort-date" title="sort-date">

                    <option hidden disabled selected>Sort by date...</option>

                    <option value="asc">Ascending</option>

                    <option value="desc">Descending</option>

                </select>

            </div>

            <div class="flex">

                <button id="download-as-excel" class="download-button">Download Excel <i class="fas fa-download"></i>

                </button>

                <button id="back-to-jobs" class="button">Back to jobs</button>

            </div>

        </div>



        <iframe id="txtArea1" style="display:none"></iframe>

        <table id="applicant-table">

            <thead>

            <tr>

                <th>Name</th>

                <th>Email</th>

                <th>Phone</th>

                <th>Resumé</th>

                <th>App. date</th>

                <th>Status</th>

                <th>Action</th>

            </tr>

            </thead>

            <tbody id="applicants">

            </tbody>

        </table>

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

<script src="scripts/admin-auth.js"></script>

<script src="scripts/application-script.js"></script>

</body>

</html>