<?php
error_reporting(0);
if ((isset($_REQUEST['email']))) {
    $to = 'bianca.hoellmueller@gmx.net'; // $_POST['email'];
    $subject = 'New SkillScanner applicant!';
    $message = '
        <html>
            <head>
                <title>Your application at SkillScanner</title>
                <style>
                    .header {
                        width: 100%;
                        padding: 10px;
                        background-color: #eaeaea;
                    }
                </style>
            </head>
            <body>
                <p>Dear ' . $_REQUEST['first-name'] . ' ' . $_REQUEST['last-name'] . ',</p>
                <p>Thanks for showing interest in the job "' . $_REQUEST['job'] . '" at Globuzzer. After carefully reviewing your profile, we are sorry to inform you that we have chosen to proceed with other candidates.
                </p>
                <p>We wish you luck with your job search.</p>
                <p>Best regards,<br>
                '. $_REQUEST['company'] .'</p>                      
            </body>
        </html>';
    $headers = "Content-type: text/html; charset=utf-8 \r\n";
    $email_from = "info@skillscanner.com";// $_POST['email'];
    mail($to, $subject, $message, $headers, $email_from);

    echo json_encode($_REQUEST);
} else {
    echo json_encode(array('status' => 'error'));
}
?>