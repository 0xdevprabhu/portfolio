<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

error_reporting(E_ALL); // Enable error reporting for debugging
ini_set('display_errors', 0); // Don't display errors directly (breaks JSON)

// 1. API KEY (Fetch from Railway Environment Variable)
$apiKey = getenv('GEMINI_API_KEY') ?: "AIzaSyB91gKqU3mSsZOSI-Jcc0TTeWMMVebBLlw";

// Input Data
$data = json_decode(file_get_contents("php://input"), true);
$userMessage = $data['message'] ?? '';

if (!$userMessage) {
    echo json_encode(["reply" => "Hi! Ask me anything about Prabhu's portfolio! 🤖"]);
    exit;
}

// 2. SUPER-POWERED SYSTEM PROMPT
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

### 💻 **Skills:**
- **Frontend:** HTML5, CSS3, JavaScript, Bootstrap, Canva
- **Backend:** PHP, MySQL, Linux, Apache, Python
- **AI & Tools:** Google Gemini API, VS Code, GitHub, SEO

### 🚀 **Projects (Portfolio):**
1. **Lumina Currency Converter:** Advanced tool with live API rates, voice input, and dark mode (JS, API).
2. **Student Grade Calculator:** Interactive system with pass/fail logic (HTML, CSS, JS).
3. **E-commerce Platform:** Shopping cart system with product management (PHP, MySQL, Stripe).
4. **AI Chatbot:** Smart assistant built using Gemini API (Python/PHP).
5. **CMS Blog Platform:** Dynamic blog with Admin Dashboard (PHP CRUD).

### 🎓 **Certifications:**
- Front-End Development (2023)
- Full Stack & AI (2024)
- Google Gemini Badge (2024)

### 📞 **Contact Info:**
- **Email:** 0xdevprabhu@gmail.com
- **Phone:** +91 93440 95995
- **Socials:** LinkedIn, GitHub, Instagram

---
**Rules for AI:**
- If asked 'Who are you?', say 'I am Prabhu\'s AI Assistant.'
- If asked about something NOT in this list, say 'I don\'t have info on that, but you can email Prabhu directly.'
- Be polite and engaging.
";

// Use gemini-pro which is highly compatible and usually avoids 404 errors
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" . $apiKey;

$postData = [
    "contents" => [
        [
            "parts" => [
                ["text" => $systemPrompt . "\n\nUser Question: " . $userMessage]
            ]
        ]
    ]
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

// SSL Fix for Localhost (Sometimes certificates are missing on Windows XAMPP)
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); 

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$err = curl_error($ch);
curl_close($ch);

if ($err) {
    echo json_encode(["reply" => "Connection Error (cURL): " . $err]);
    exit;
}

if ($httpCode !== 200) {
    $errorMsg = "API Error (HTTP $httpCode): ";
    $resData = json_decode($response, true);
    if (isset($resData['error']['message'])) {
        $errorMsg .= $resData['error']['message'];
    } else {
        $errorMsg .= "Unknown error. check your API Key.";
    }
    echo json_encode(["reply" => $errorMsg]);
    exit;
}

$result = json_decode($response, true);

if (isset($result['candidates'][0]['content']['parts'][0]['text'])) {
    $aiReply = $result['candidates'][0]['content']['parts'][0]['text'];
    $aiReply = str_replace("**", "", $aiReply); 
    echo json_encode(["reply" => $aiReply]);
} else {
    echo json_encode(["reply" => "I received an unexpected response from the AI. Please try again."]);
}
?>