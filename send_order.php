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

$db = initOrderDb();

if (!is_array($payload)) {
    logOrderAttempt($db, [
        'action' => 'invalid_payload',
        'status' => 'error',
        'error_message' => 'Invalid JSON payload',
        'idempotency_key' => '',
        'order_number' => '',
        'payload' => ['raw' => $rawInput]
    ]);
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON payload']);
    exit;
}

$action = trim((string)($payload['action'] ?? 'order_submission'));
$payload['action'] = $action;
$orderNumber = trim((string)($payload['orderNumber'] ?? ''));
if ($orderNumber === '') {
    $orderNumber = generateOrderNumber();
    $payload['orderNumber'] = $orderNumber;
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
    $stored = json_decode((string)file_get_contents($idempotencyFile), true);
    logOrderAttempt($db, [
        'action' => $action,
        'status' => 'duplicate',
        'error_message' => null,
        'idempotency_key' => $idempotencyKey,
        'order_number' => $stored['orderNumber'] ?? $orderNumber,
        'payload' => $payload
    ]);
    echo json_encode([
        'status' => 'ok',
        'message' => 'Duplicate request ignored',
        'duplicate' => true,
        'orderNumber' => $stored['orderNumber'] ?? $orderNumber
    ]);
    exit;
}

$captchaSecret = getenv('YANDEX_SMARTCAPTCHA_SECRET') ?: getenv('YANDEX_CAPTCHA_SERVER_KEY');
if ($captchaSecret) {
    $captchaToken = trim((string)($payload['captchaToken'] ?? ''));
    if ($captchaToken === '') {
        logOrderAttempt($db, [
            'action' => $action,
            'status' => 'error',
            'error_message' => 'SmartCaptcha token is required',
            'idempotency_key' => $idempotencyKey,
            'order_number' => $orderNumber,
            'payload' => $payload
        ]);
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'SmartCaptcha token is required']);
        exit;
    }

    $captchaResponse = verifySmartCaptcha($captchaSecret, $captchaToken, $_SERVER['REMOTE_ADDR'] ?? '');
    if (!$captchaResponse['ok']) {
        logOrderAttempt($db, [
            'action' => $action,
            'status' => 'error',
            'error_message' => 'SmartCaptcha validation failed',
            'idempotency_key' => $idempotencyKey,
            'order_number' => $orderNumber,
            'payload' => $payload
        ]);
        http_response_code(403);
        echo json_encode(['status' => 'error', 'message' => 'SmartCaptcha validation failed']);
        exit;
    }
}

$botToken = getenv('TELEGRAM_BOT_TOKEN');
$chatId = getenv('TELEGRAM_CHAT_ID');

$contactEmail = trim((string)($payload['contactEmail'] ?? ''));
if ($contactEmail === '' || !filter_var($contactEmail, FILTER_VALIDATE_EMAIL)) {
    logOrderAttempt($db, [
        'action' => $action,
        'status' => 'error',
        'error_message' => 'Valid contact email is required',
        'idempotency_key' => $idempotencyKey,
        'order_number' => $orderNumber,
        'payload' => $payload
    ]);
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Valid contact email is required']);
    exit;
}

if (!$botToken || !$chatId) {
    logOrderAttempt($db, [
        'action' => $action,
        'status' => 'error',
        'error_message' => 'Telegram credentials are not configured',
        'idempotency_key' => $idempotencyKey,
        'order_number' => $orderNumber,
        'payload' => $payload
    ]);
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Telegram credentials are not configured']);
    exit;
}

$message = buildTelegramMessage($payload);
$response = sendTelegramMessage($botToken, $chatId, $message);

if (!$response['ok']) {
    logOrderAttempt($db, [
        'action' => $action,
        'status' => 'error',
        'error_message' => 'Failed to send Telegram message',
        'idempotency_key' => $idempotencyKey,
        'order_number' => $orderNumber,
        'payload' => $payload
    ]);
    http_response_code(502);
    echo json_encode(['status' => 'error', 'message' => 'Failed to send Telegram message']);
    exit;
}

if (in_array($action, ['order_submission', 'payment_initiated'], true)) {
    if (!sendCustomerEmail($payload, $contactEmail)) {
        logOrderAttempt($db, [
            'action' => $action,
            'status' => 'error',
            'error_message' => 'Failed to send confirmation email',
            'idempotency_key' => $idempotencyKey,
            'order_number' => $orderNumber,
            'payload' => $payload
        ]);
        http_response_code(502);
        echo json_encode(['status' => 'error', 'message' => 'Failed to send confirmation email']);
        exit;
    }
    sendManagerEmail($payload);
}

logOrderAttempt($db, [
    'action' => $action,
    'status' => 'success',
    'error_message' => null,
    'idempotency_key' => $idempotencyKey,
    'order_number' => $orderNumber,
    'payload' => $payload
]);

file_put_contents($idempotencyFile, json_encode([
    'time' => time(),
    'payload' => $payload,
    'orderNumber' => $orderNumber,
    'action' => $action
], JSON_UNESCAPED_UNICODE));
echo json_encode(['status' => 'ok', 'orderNumber' => $orderNumber]);

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
    $actionLabel = formatActionLabel((string)($payload['action'] ?? ''));
    $lines = [
        "Новая заявка на расчёт отзывов:",
        "Номер заказа: " . ($payload['orderNumber'] ?? '—'),
        "Тип заявки: " . ($actionLabel ?: '—'),
        "Дата создания: " . ($payload['orderCreatedAt'] ?? '—'),
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

    if (!empty($payload['pdfDownloadedAt'])) {
        $lines[] = "PDF скачан: " . $payload['pdfDownloadedAt'];
    }

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

function sendCustomerEmail(array $payload, string $email): bool
{
    $subject = buildEmailSubject('Получена заявка на расчёт отзывов ' . formatOrderSuffix($payload));
    $body = buildEmailBody($payload, true);
    return sendEmail($email, $subject, $body);
}

function sendManagerEmail(array $payload): void
{
    $managerEmail = getenv('MANAGER_EMAIL');
    if (!$managerEmail) {
        return;
    }
    $subject = buildEmailSubject('Новая заявка на расчёт отзывов ' . formatOrderSuffix($payload));
    $body = buildEmailBody($payload, false);
    sendEmail($managerEmail, $subject, $body);
}

function buildEmailSubject(string $subject): string
{
    return mb_encode_mimeheader($subject, 'UTF-8');
}

function buildEmailBody(array $payload, bool $forCustomer): string
{
    $calculation = $payload['calculation'] ?? [];
    $actionLabel = formatActionLabel((string)($payload['action'] ?? ''));
    $lines = [
        $forCustomer ? 'Спасибо! Мы получили вашу заявку на расчёт отзывов.' : 'Поступила новая заявка на расчёт отзывов.',
        '',
        'Номер заказа: ' . ($payload['orderNumber'] ?? '—'),
        'Тип заявки: ' . ($actionLabel ?: '—'),
        'Дата создания: ' . ($payload['orderCreatedAt'] ?? '—'),
        '',
        'Контактная информация:',
        'Имя: ' . ($payload['contactName'] ?? '—'),
        'Телефон: ' . ($payload['contactPhone'] ?? '—'),
        'Email: ' . ($payload['contactEmail'] ?? '—'),
        'Telegram: ' . ($payload['contactTelegram'] ?? '—'),
        '',
        'Объект:',
        'Название: ' . ($payload['objectName'] ?? '—'),
        'Ссылка: ' . ($payload['objectAddress'] ?? '—'),
        '',
        'Детали расчёта:',
        'Текущее количество отзывов: ' . ($calculation['currentReviews'] ?? '—'),
        'Максимальный балл: ' . ($calculation['maxRating'] ?? '—'),
        'Текущий балл: ' . ($calculation['currentRating'] ?? '—'),
        'Целевой балл: ' . ($calculation['targetRating'] ?? '—'),
        'Диапазон новых оценок: ' . ($calculation['newRatingMin'] ?? '—') . ' - ' . ($calculation['newRatingMax'] ?? '—'),
        'Платные резервирования: ' . ((($calculation['requiresReservation'] ?? false) === true) ? 'Да' : 'Нет'),
        'Средняя стоимость резервирования: ' . ($calculation['reservationCost'] ?? '—'),
        'Дополнительные услуги: ' . formatServiceSummary($calculation['serviceQuantities'] ?? []),
        'Итоговая стоимость: ' . ($calculation['totalCost'] ?? '—') . ' ₽',
        '',
        'Комментарий: ' . ($payload['comment'] ?? '—')
    ];

    if (!empty($payload['pdfDownloadedAt'])) {
        $lines[] = '';
        $lines[] = 'PDF скачан: ' . $payload['pdfDownloadedAt'];
    }

    if ($forCustomer) {
        $lines[] = '';
        $lines[] = 'Мы свяжемся с вами в ближайшее время.';
    }

    return implode("\n", $lines);
}

function sendEmail(string $to, string $subject, string $body): bool
{
    $from = getenv('EMAIL_FROM') ?: 'no-reply@yourep.ru';
    $replyTo = getenv('EMAIL_REPLY_TO') ?: $from;
    $headers = [
        'From: ' . $from,
        'Reply-To: ' . $replyTo,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8'
    ];

    return mail($to, $subject, $body, implode("\r\n", $headers));
}

function formatOrderSuffix(array $payload): string
{
    $orderNumber = trim((string)($payload['orderNumber'] ?? ''));
    return $orderNumber !== '' ? '№' . $orderNumber : '';
}

function formatActionLabel(string $action): string
{
    return match ($action) {
        'payment_initiated' => 'Онлайн-оплата',
        'pdf_download' => 'Скачивание PDF',
        'order_submission' => 'Заявка без предоплаты',
        default => $action ?: '—'
    };
}

function generateOrderNumber(): string
{
    $letters = preg_split('//u', 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЫЭЮЯ', -1, PREG_SPLIT_NO_EMPTY);
    $digits = str_split('0123456789');
    $alphabet = array_merge($letters ?: [], $digits);
    $code = '';
    for ($i = 0; $i < 5; $i++) {
        $code .= $alphabet[random_int(0, count($alphabet) - 1)];
    }
    return date('dmY') . '-' . $code;
}

function initOrderDb(): PDO
{
    $dbDir = __DIR__ . '/data';
    if (!is_dir($dbDir) && !mkdir($dbDir, 0777, true) && !is_dir($dbDir)) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Failed to initialize order storage']);
        exit;
    }

    $dbPath = $dbDir . '/orders.sqlite';
    $db = new PDO('sqlite:' . $dbPath);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $db->exec('CREATE TABLE IF NOT EXISTS order_attempts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at TEXT NOT NULL,
        action TEXT NOT NULL,
        status TEXT NOT NULL,
        order_number TEXT,
        idempotency_key TEXT,
        ip_address TEXT,
        user_agent TEXT,
        error_message TEXT,
        payload TEXT
    )');

    return $db;
}

function logOrderAttempt(PDO $db, array $data): void
{
    $stmt = $db->prepare('INSERT INTO order_attempts (
        created_at, action, status, order_number, idempotency_key, ip_address, user_agent, error_message, payload
    ) VALUES (
        :created_at, :action, :status, :order_number, :idempotency_key, :ip_address, :user_agent, :error_message, :payload
    )');

    $stmt->execute([
        ':created_at' => date('c'),
        ':action' => (string)($data['action'] ?? ''),
        ':status' => (string)($data['status'] ?? ''),
        ':order_number' => (string)($data['order_number'] ?? ''),
        ':idempotency_key' => (string)($data['idempotency_key'] ?? ''),
        ':ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ':user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
        ':error_message' => $data['error_message'] ?? null,
        ':payload' => json_encode($data['payload'] ?? [], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
    ]);
}
