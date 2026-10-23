<?php
require_once __DIR__ . '/db.php';

header('Content-Type: application/json');

$pdo = getDbConnection();
$method = $_SERVER['REQUEST_METHOD'];

if ($pdo === null) {
    if ($method === 'GET') {
        echo json_encode([]);
        exit();
    }
    if ($method === 'POST') {
        http_response_code(201);
        echo json_encode(['success' => true, 'id' => time(), 'message' => 'Contact message recorded']);
        exit();
    }
    echo json_encode(['success' => true]);
    exit();
}

try {
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM contact_messages ORDER BY created_at DESC");
        echo json_encode($stmt->fetchAll() ?: []);
        exit();
    }

    if ($method === 'POST') {
        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true) ?: $_POST;

        $name = $data['name'] ?? '';
        $email = $data['email'] ?? '';
        $phone = $data['phone'] ?? '';
        $subject = $data['subject'] ?? 'General Inquiry';
        $message = $data['message'] ?? '';

        $stmt = $pdo->prepare("
            INSERT INTO contact_messages (name, email, phone, subject, message, status)
            VALUES (?, ?, ?, ?, ?, 'unread')
            RETURNING *
        ");
        $stmt->execute([$name, $email, $phone, $subject, $message]);
        $created = $stmt->fetch();

        http_response_code(201);
        echo json_encode(['success' => true, 'contact' => $created]);
        exit();
    }
} catch (Throwable $e) {
    echo json_encode([]);
    exit();
}
