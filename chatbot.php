<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

error_reporting(0); // Prevent PHP warnings from breaking JSON response in production
ob_start(); // Buffer output

// 1. API KEY (Fetch from Railway Environment Variable)
$apiKey = getenv('GEMINI_API_KEY') ?: "AIzaSyB91gKqU3mSsZOSI-Jcc0TTeWMMVebBLlw";

// Input Data
$data = json_decode(file_get_contents("php://input"), true);
$userMessage = $data['message'] ?? '';

if (!$userMessage) {
    ob_end_clean();
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
- If asked 'Who are you?', say 'I am Prabhu's AI Assistant.'
- If asked about something NOT in this list, say 'I don't have info on that, but you can email Prabhu directly.'
- Be polite and engaging.
";

$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=" . $apiKey;

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
// Enforce SSL verification for Cloud/Production
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2); 
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true); 

$response = curl_exec($ch);
$err = curl_error($ch);
curl_close($ch);

ob_end_clean(); // Clean any unwanted output before sending JSON

if ($err) {
    echo json_encode(["reply" => "Connection Error: Please try again later."]);
    exit;
}

$result = json_decode($response, true);

if (isset($result['candidates'][0]['content']['parts'][0]['text'])) {
    $aiReply = $result['candidates'][0]['content']['parts'][0]['text'];
    $aiReply = str_replace("**", "", $aiReply); 
    echo json_encode(["reply" => $aiReply]);
} else {
    echo json_encode(["reply" => "Sorry, I'm busy right now or my API key needs to be updated!"]);
}
?>