<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin - Section</title>
    <link rel="stylesheet" type='text/css' href="form.css">
</head>
<body>
<div class="container">
    <form name="userLogin">
        <h1>Admin Login</h1>
        <label>
            <input type="text" name="email" placeholder="Email...">
        </label>
        <label>
            <input type="password" name="password" placeholder="Password...">
        </label>
        <input type="submit" value="Sign In" class="button">
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
<script src="scripts/login-actions.js"></script>
</body>
</html>