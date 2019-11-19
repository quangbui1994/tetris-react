<?php
error_reporting(0);
if ((isset($_POST['email']))) {
    $to = $_POST['companyMail'] === '' ? 'info@globuzzer.com' : $_POST['companyMail'];
    $subject = 'New SkillScanner applicant!';
    $message = '
        <html>
            <head>
                <title>SkillScanner: You have a new applicant</title>
                <style>
                    .header {
                        width: 100%;
                        padding: 10px;
                        background-color: #eaeaea;
                    }
                </style>
            </head>
            <body>
                <h1>New applicant for "' . $_POST['job'] .'" </h1>
                <div class="header"><h3>Name</h3></div>
                <p>' . $_POST['first-name'] . ' ' . $_POST['last-name'] . '</p>
                <div class="header"><h3>Email</h3></div>
                <p> ' . $_POST['email'] . '</p>
                <div class="header"><h3>Phone Number</h3></div>
				<p> ' . $_POST['phone'] . '</p>
				<div class="header"><h3>Location</h3></div>  
				<p>' . $_POST['location'] . '</p>
				<div class="header"><h3>LinkedIn/CV</h3></div>   
				<p> ' . $_POST['linkedin'] . '</p>
				<div class="header"><h3>Cover letter</h3></div>   
				<p> ' . $_POST['cover-letter'] . '</p>
				<div class="header"><h3>Portfolio URL</h3></div>  
				<p> ' . $_POST['portfolio-url'] . '</p>
				<div class="header"><h3>Cover letter URL</h3></div>    
				<p> ' . $_POST['cover-letter-url'] . '</p>                        
            </body>
        </html>';
    $headers = "Content-type: text/html; charset=utf-8 \r\n";
    $email_from = "info@skillscanner.com";// $_POST['email'];
    mail($to, $subject, $message, $headers, $email_from);

    echo json_encode($_POST);
} else {
    echo json_encode(array('status' => 'error'));
}
?>