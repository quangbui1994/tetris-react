<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">

        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Admin - Section</title>

        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"

            integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">

        <link rel="stylesheet" type='text/css' href="form.css">

        <link rel="stylesheet" type='text/css' href="css/company-dashboard.css">

    </head>

    <body>
        <?php 
            include_once("navbar.php")
        ?>

        <div class="cd-container">

            <div class="cd-section-banner">
                <h1>Company Dashboard</h1>
            </div>
            
            <div class="cd-section-filter">
                <input type="text" placeholder="Search company name ..." id="search-cname">
                <select id="select-display">
                    <option value="lastest">Sort by lastest</option>
                    <option value="ascending">Sort by ascending</option>
                    <option value="descending">Sort by descending</option>
                </select>
                
                <select id="select-display-by-package">
                    <option value="all" selected>All</option>
                    <option value="free">free package</option>
                    <option value="plus">plus package</option>
                    <option value="premium">premium package</option>
                </select>
                <!-- <label for="radio-cname">
                    <input type="radio" id="radio-cname" name="cfilter-n">Name
                <label>

                <label for="radio-clocation">
                    <input type="radio" id="radio-clocation" name="cfilter-l">Location
                <label>

                <label for="radio-cphone">
                    <input type="radio" id="radio-cphone" name="cfilter-ph">Phone
                <label>

                <label for="radio-cemail">
                    <input type="radio" id="radio-cemail" name="cfilter-e">Email
                <label> -->

            </div>

            <div class="cd-section-table" >
                <table>
                    <thead>
                        <tr>
                            <th>Company name</th>
                            <th>Location</th>
                            <th>Phone number</th>
                            <th>Email</th>
                            <th>Description</th>
                            <th>Created at</th>
                            <th>Plan</th>
                        </tr>
                    </thead>

                    <tbody id="c-tbody">
                    </tbody>
                </table>
            </div>

        <div>
    </body>

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

    <script src="scripts/company-dashboard/company-dashboard.js"></script>
</html>