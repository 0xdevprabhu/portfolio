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
    
    $mail = new PHPMailer(true);

    try {
        // 3. Server Settings Shared Config
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        
        // Keep your existing credentials logic intact
        $mail->Username   = getenv('SMTP_EMAIL') ?: '0xdevprabhu@gmail.com';
        $mail->Password   = getenv('SMTP_PASSWORD') ?: 'bxkn kezz xssk oqne';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Check if it is the new "Offer Letter Dropzone" Form
        if (isset($_POST['is_offer']) && $_POST['is_offer'] === 'yes') {
            
            $hr_email = filter_var(trim($_POST["hr_email"]), FILTER_SANITIZE_EMAIL);
            if (!filter_var($hr_email, FILTER_VALIDATE_EMAIL)) {
                echo json_encode(['status' => 'error', 'message' => 'Invalid HR Email ID.']);
                exit;
            }

            if (isset($_FILES['offer_file']) && $_FILES['offer_file']['error'] === UPLOAD_ERR_OK) {
                $fileTmp = $_FILES['offer_file']['tmp_name'];
                $fileName = $_FILES['offer_file']['name'];
                $fileSize = $_FILES['offer_file']['size'];

                // 5MB Limit Check
                if ($fileSize > 5242880) {
                    echo json_encode(['status' => 'error', 'message' => 'File size exceeds 5MB limit.']);
                    exit;
                }

                $mail->setFrom('0xdevprabhu@gmail.com', 'Portfolio Alert');
                $mail->addAddress('0xdevprabhu@gmail.com'); 
                $mail->addReplyTo($hr_email, 'Recruiter');

                $mail->isHTML(true);
                $mail->Subject = "🎉 HURRAY! You got an Offer Letter!";
                $mail->Body    = "
                    <h3>Congratulations Prabhu!</h3>
                    <p>A recruiter has dropped an offer letter from your portfolio.</p>
                    <p><strong>HR Email:</strong> {$hr_email}</p>
                    <br><p>Please find the attached document.</p>
                ";
                
                // Attach the uploaded file securely
                $mail->addAttachment($fileTmp, htmlspecialchars($fileName));

                $mail->send();
                echo json_encode(['status' => 'success', 'message' => 'Offer letter sent successfully!']);
                exit;
            } else {
                echo json_encode(['status' => 'error', 'message' => 'File upload failed. Select valid PDF/Word.']);
                exit;
            }
        } 
        
        // Otherwise, it's the Normal Contact Form
        else {
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
        }
        
    } catch (Exception $e) {
        $response['message'] = "Mailer Error: " . $mail->ErrorInfo;
    }
} else {
    $response['message'] = 'Invalid Request Method';
}

echo json_encode($response);
?>