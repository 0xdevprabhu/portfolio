<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

// 1. UNGA API KEY
$apiKey = "AIzaSyDa2Bfl23cMd9XOt4gk0GUXd5X1plF5F2Q"; 

// Input Data
$data = json_decode(file_get_contents("php://input"), true);
$userMessage = $data['message'] ?? '';

if (!$userMessage) {
    echo json_encode(["reply" => "Hi! Ask me anything about Prabhu's portfolio! 🚀"]);
    exit;
}

// 2. SUPER-POWERED SYSTEM PROMPT (AI Moolai)
// Inga dhaan unga muzhu portfolio details-um iruku.
$systemPrompt = "
You are an advanced AI assistant for **Prabhu P**, a Full Stack Developer.
Your goal is to answer questions about Prabhu based ONLY on the information below.
Keep answers professional, friendly, and concise.

### 👤 **Personal Details:**
- **Name:** Prabhu P
- **Role:** Full Stack Developer & AI Enthusiast
- **Current Job:** Intern at **Noxlay Cyber Tech**
- **Location (Native):** Sivakasi, Tamil Nadu, India
- **Bio:** Certified LAMP Stack Specialist passionate about building secure, AI-integrated web solutions.

### 🛠 **Skills:**
- **Frontend:** HTML5, CSS3, JavaScript, Bootstrap, Canva
- **Backend:** PHP, MySQL, Linux, Apache, Python
- **AI & Tools:** Google Gemini API, VS Code, GitHub, SEO

### 🚀 **Projects (Portfolio):**
1. **Lumina Currency Converter:** Advanced tool with live API rates, voice input, and dark mode (JS, API).
2. **Student Grade Calculator:** Interactive system with pass/fail logic (HTML, CSS, JS).
3. **E-commerce Platform:** Shopping cart system with product management (PHP, MySQL, Stripe).
4. **AI Chatbot:** Smart assistant built using Gemini API (Python/PHP).
5. **CMS Blog Platform:** Dynamic blog with Admin Dashboard (PHP CRUD).

### 🏆 **Certifications:**
- Front-End Development (2023)
- Full Stack & AI (2024)
- Google Gemini Badge (2024)

### 📞 **Contact Info:**
- **Email:** 0xdevprabhu@gmail.com
- **Phone:** +91 93440 95995
- **Socials:** LinkedIn, GitHub, Instagram

---
**Rules for AI:**
- If asked 'Who are you?', say 'I am Prabhu's AI Assistant.'
- If asked about something NOT in this list, say 'I don't have info on that, but you can email Prabhu directly.'
- Be polite and engaging.
";

// API URL (Using gemini-pro for best results)
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=" . $apiKey;

// Data Payload
$postData = [
    "contents" => [
        [
            "parts" => [
                ["text" => $systemPrompt . "\n\nUser Question: " . $userMessage]
            ]
        ]
    ]
];

// cURL Setup
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0); // Localhost fix
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); // Localhost fix

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo json_encode(["reply" => "Connection Error: " . curl_error($ch)]);
    exit;
}

curl_close($ch);

$result = json_decode($response, true);

// Check Response
if (isset($result['candidates'][0]['content']['parts'][0]['text'])) {
    $aiReply = $result['candidates'][0]['content']['parts'][0]['text'];
    $aiReply = str_replace("**", "", $aiReply); // Clean formatting
    echo json_encode(["reply" => $aiReply]);
} else {
    echo json_encode(["reply" => "Sorry, I'm busy right now. Try again later!"]);
}
?>