<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    exit;
}

$rawInput = file_get_contents('php://input');
$payload = json_decode($rawInput ?? '', true);

if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON payload']);
    exit;
}

$idempotencyKey = $_SERVER['HTTP_IDEMPOTENCY_KEY'] ?? ($payload['idempotencyKey'] ?? '');
$idempotencyKey = trim((string)$idempotencyKey);
if ($idempotencyKey === '') {
    $idempotencyKey = hash('sha256', $rawInput ?: uniqid('order_', true));
}

$idempotencyDir = sys_get_temp_dir() . '/review-correction-idempotency';
if (!is_dir($idempotencyDir) && !mkdir($idempotencyDir, 0777, true) && !is_dir($idempotencyDir)) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to initialize idempotency storage']);
    exit;
}

$idempotencyFile = $idempotencyDir . '/' . preg_replace('/[^a-zA-Z0-9_-]/', '', $idempotencyKey);
if (file_exists($idempotencyFile)) {
    echo json_encode(['status' => 'ok', 'message' => 'Duplicate request ignored', 'duplicate' => true]);
    exit;
}

$captchaSecret = getenv('YANDEX_SMARTCAPTCHA_SECRET') ?: getenv('YANDEX_CAPTCHA_SERVER_KEY');
if ($captchaSecret) {
    $captchaToken = trim((string)($payload['captchaToken'] ?? ''));
    if ($captchaToken === '') {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'SmartCaptcha token is required']);
        exit;
    }

    $captchaResponse = verifySmartCaptcha($captchaSecret, $captchaToken, $_SERVER['REMOTE_ADDR'] ?? '');
    if (!$captchaResponse['ok']) {
        http_response_code(403);
        echo json_encode(['status' => 'error', 'message' => 'SmartCaptcha validation failed']);
        exit;
    }
}

$botToken = getenv('TELEGRAM_BOT_TOKEN');
$chatId = getenv('TELEGRAM_CHAT_ID');

if (!$botToken || !$chatId) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Telegram credentials are not configured']);
    exit;
}

$message = buildTelegramMessage($payload);
$response = sendTelegramMessage($botToken, $chatId, $message);

if (!$response['ok']) {
    http_response_code(502);
    echo json_encode(['status' => 'error', 'message' => 'Failed to send Telegram message']);
    exit;
}

file_put_contents($idempotencyFile, json_encode(['time' => time(), 'payload' => $payload], JSON_UNESCAPED_UNICODE));
echo json_encode(['status' => 'ok']);

function verifySmartCaptcha(string $secret, string $token, string $ip): array
{
    $url = 'https://captcha-api.yandex.ru/validate';
    $query = http_build_query(['secret' => $secret, 'token' => $token, 'ip' => $ip]);
    $ch = curl_init($url . '?' . $query);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $result = curl_exec($ch);
    $error = curl_error($ch);
    curl_close($ch);

    if ($result === false || $error) {
        return ['ok' => false];
    }

    $decoded = json_decode($result, true);
    return ['ok' => isset($decoded['status']) && $decoded['status'] === 'ok'];
}

function buildTelegramMessage(array $payload): string
{
    $calculation = $payload['calculation'] ?? [];
    $lines = [
        "Новая заявка на расчёт отзывов:",
        "Площадка: " . ($payload['platform'] ?? '—'),
        "Номер скидки: " . ($payload['discountNumber'] ?? '—'),
        "Контакт: " . ($payload['contactName'] ?? '—'),
        "Телефон: " . ($payload['contactPhone'] ?? '—'),
        "Telegram: " . ($payload['contactTelegram'] ?? '—'),
        "Email: " . ($payload['contactEmail'] ?? '—'),
        "Комментарий: " . ($payload['comment'] ?? '—'),
        "Текущее количество отзывов: " . ($calculation['currentReviews'] ?? '—'),
        "Максимальный балл: " . ($calculation['maxRating'] ?? '—'),
        "Текущий балл: " . ($calculation['currentRating'] ?? '—'),
        "Целевой балл: " . ($calculation['targetRating'] ?? '—'),
        "Диапазон новых оценок: " . ($calculation['newRatingMin'] ?? '—') . ' - ' . ($calculation['newRatingMax'] ?? '—'),
        "Платные резервирования: " . ((($calculation['requiresReservation'] ?? false) === true) ? 'Да' : 'Нет'),
        "Средняя стоимость резервирования: " . ($calculation['reservationCost'] ?? '—'),
        "Дополнительные услуги: " . formatServiceSummary($calculation['serviceQuantities'] ?? []),
        "Итоговая стоимость: " . ($calculation['totalCost'] ?? '—') . ' ₽'
    ];

    return implode(\"\\n\", $lines);
}

function formatServiceSummary(array $services): string
{
    if (!$services) {
        return '—';
    }

    $parts = [];
    foreach ($services as $name => $qty) {
        if ((int)$qty > 0) {
            $parts[] = $name . ': ' . $qty;
        }
    }
    return $parts ? implode(', ', $parts) : '—';
}

function sendTelegramMessage(string $botToken, string $chatId, string $message): array
{
    $url = sprintf('https://api.telegram.org/bot%s/sendMessage', $botToken);
    $payload = http_build_query([
        'chat_id' => $chatId,
        'text' => $message,
        'parse_mode' => 'HTML'
    ]);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $result = curl_exec($ch);
    $error = curl_error($ch);
    curl_close($ch);

    if ($result === false || $error) {
        return ['ok' => false];
    }

    $decoded = json_decode($result, true);
    return ['ok' => isset($decoded['ok']) && $decoded['ok'] === true];
}
