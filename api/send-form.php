<?php
/**
 * Серверный endpoint для отправки форм в Telegram
 * БЕЗОПАСНО: Bot Token хранится только на сервере
 * 
 * Использование: POST /api/send-form.php
 * Body: { "name": "...", "phone": "...", "document": "...", "question": "...", "csrf_token": "..." }
 */

session_start();

// Generate CSRF token
function generateCsrfToken() {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

// Validate CSRF token
function validateCsrfToken($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

// Загрузка конфигурации (токены хранятся отдельно!)
require_once __DIR__ . '/config.php';

// Заголовки CORS (разрешить только ваш домен)
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://objektiv-expert.ru');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Проверка метода
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Получение данных
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

// Validate CSRF token
if (!validateCsrfToken($input['csrf_token'] ?? '')) {
    http_response_code(403);
    echo json_encode(['error' => 'Invalid CSRF token']);
    exit;
}

// Rate limiting — prevent more than 1 request per 60 seconds per session
if (isset($_SESSION['last_form_submit']) && (time() - $_SESSION['last_form_submit']) < 60) {
    http_response_code(429);
    echo json_encode(['error' => 'Too many requests. Please wait 60 seconds.']);
    exit;
}
$_SESSION['last_form_submit'] = time();

// Sanitize all input before sending to Telegram
$name = isset($input['name']) ? htmlspecialchars($input['name'], ENT_QUOTES, 'UTF-8') : '';
$phone = isset($input['phone']) ? htmlspecialchars($input['phone'], ENT_QUOTES, 'UTF-8') : '';
$document = isset($input['document']) ? htmlspecialchars($input['document'], ENT_QUOTES, 'UTF-8') : '';
$question = isset($input['question']) ? htmlspecialchars($input['question'], ENT_QUOTES, 'UTF-8') : '';

// Build message from sanitized fields
$message = "\xf0\x9f\x93\xae <b>\xd0\x9d\xd0\xbe\xd0\xb2\xd0\xb0\xd1\x8f \xd0\xb7\xd0\xb0\xd1\x8f\xd0\xb2\xd0\xba\xd0\xb0 \xd1\x81 \xd1\x81\xd0\xb0\xd0\xb9\xd1\x82\xd0\xb0</b>\n\n";
if ($name) $message .= '<b>\xd0\x98\xd0\xbc\xd1\x8f:</b> ' . $name . "\n";
if ($phone) $message .= '<b>\xd0\xa2\xd0\xb5\xd0\xbb\xd0\xb5\xd1\x84\xd0\xbe\xd0\xbd:</b> ' . $phone . "\n";
if ($document) $message .= '<b>\xd0\x94\xd0\xbe\xd0\xba\xd1\x83\xd0\xbc\xd0\xb5\xd0\xbd\xd1\x82:</b> ' . $document . "\n";
if ($question) $message .= '<b>\xd0\x92\xd0\xbe\xd0\xbf\xd1\x80\xd0\xbe\xd1\x81:</b> ' . $question . "\n";
$message .= "\n\xf0\x9f\x93\x85 " . date('d.m.Y H:i');

// Отправка в Telegram
$url = 'https://api.telegram.org/bot' . BOT_TOKEN . '/sendMessage';
$data = [
    'chat_id' => CHAT_ID,
    'text' => $message,
    'parse_mode' => 'HTML'
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Telegram API error']);
}
