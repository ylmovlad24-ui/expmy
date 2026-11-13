<?php
/**
 * Серверный endpoint для отправки форм в Telegram
 * БЕЗОПАСНО: Bot Token хранится только на сервере
 * 
 * Использование: POST /api/send-form.php
 * Body: { "message": "..." }
 */

// Конфигурация (хранится только на сервере!)
define('BOT_TOKEN', '7940926360:AAE43PSqLXyREqkpF0O6_TvI8hH7ovXlN60');
define('CHAT_ID', '-4803799516');

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
if (!$input || empty($input['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing message']);
    exit;
}

$message = $input['message'];

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
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Telegram API error']);
}
