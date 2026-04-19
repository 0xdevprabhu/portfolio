<?php
// contact.php

// Composer Autoload
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// JSON Response Header
header('Content-Type: application/json');

$response = array('status' => 'error', 'message' => 'Something went wrong.');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // 1. Input Sanitize
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"])); 
    $message = strip_tags(trim($_POST["message"]));

    // 2. Validation
    if (empty($name) || empty($message) || empty($subject) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => 'Please fill all fields correctly.']);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // 3. Server Settings
        // $mail->SMTPDebug = 2; // Enable this only for deep debugging, it breaks JSON output
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        
        // Credentials
        $mail->Username   = getenv('SMTP_EMAIL') ?: '0xdevprabhu@gmail.com';
        $mail->Password   = getenv('SMTP_PASSWORD') ?: 'bxkn kezz xssk oqne';
        
        // Port 587 with TLS is often better for Cloud (Railway)
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // 4. Recipients
        $mail->setFrom('0xdevprabhu@gmail.com', 'Portfolio Contact Form');
        $mail->addAddress('0xdevprabhu@gmail.com'); 
        $mail->addReplyTo($email, $name);

        // 5. Content
        $mail->isHTML(true);
        $mail->Subject = "New Portfolio Message: $subject";
        $mail->Body    = "
            <h3>You have received a new message!</h3>
            <p><strong>Name:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Subject:</strong> $subject</p>
            <p><strong>Message:</strong><br>" . nl2br($message) . "</p>
            <br>
            <small>Sent from your Prabhu P Portfolio Website</small>
        ";

        $mail->send();
        $response['status'] = 'success';
        $response['message'] = 'Message sent successfully!';
    } catch (Exception $e) {
        $response['message'] = "Mailer Error: " . $mail->ErrorInfo;
    }
} else {
    $response['message'] = 'Invalid Request Method';
}

echo json_encode($response);
?>