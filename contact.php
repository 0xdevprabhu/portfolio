<?php
// contact.php

// Composer Autoload (இது ஒன்னு போதும், எல்லா PHPMailer ஃபைலையும் இதுவே எடுத்துக்கும்)
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// JSON Response Header (Mukkiyam for script.js)
header('Content-Type: application/json');

$response = array('status' => 'error', 'message' => 'Something went wrong.');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // 1. Input Sanitize (Clean panrom)
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"])); // Puthusa add pannirukom
    $message = strip_tags(trim($_POST["message"]));

    // 2. Validation (Ellam fill panni irukangala nu check panrom)
    if (empty($name) || empty($message) || empty($subject) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => 'Please fill all fields correctly.']);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // 3. Server Settings (Gmail SMTP)
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        
        // --- INGA UNGA DETAILS PODUNGA ---
        $mail->Username   = '0xdevprabhu@gmail.com'; // Unga Gmail ID
        $mail->Password   = 'bxkn kezz xssk oqne';  // Unga 16-digit App Password (Space illama podavum)
        // ---------------------------------

        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // 4. Recipients
        $mail->setFrom('0xdevprabhu@gmail.com', 'Portfolio Contact Form'); // From Address
        $mail->addAddress('0xdevprabhu@gmail.com'); // Ungalukke email varum
        $mail->addReplyTo($email, $name); // User-ku reply panna avanga email set aagum

        // 5. Content
        $mail->isHTML(true);
        $mail->Subject = "New Portfolio Message: $subject";
        $mail->Body    = "
            <h3>You have received a new message!</h3>
            <p><strong>Name:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Subject:</strong> $subject</p>
            <p><strong>Message:</strong><br>$message</p>
            <br>
            <small>Sent from your Prabhu P Portfolio Website</small>
        ";

        $mail->send();
        $response['status'] = 'success';
        $response['message'] = 'Message sent successfully!';
    } catch (Exception $e) {
        $response['message'] = "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    $response['message'] = 'Invalid Request Method';
}

echo json_encode($response);
?>