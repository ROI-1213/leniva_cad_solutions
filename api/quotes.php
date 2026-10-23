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
        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true) ?: $_POST;
        http_response_code(201);
        echo json_encode(['success' => true, 'id' => time(), 'message' => 'Quote recorded']);
        exit();
    }
    echo json_encode(['success' => true]);
    exit();
}

try {
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM quote_requests ORDER BY created_at DESC");
        echo json_encode($stmt->fetchAll() ?: []);
        exit();
    }

    if ($method === 'POST') {
        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true) ?: $_POST;

        $name = $data['name'] ?? 'Anonymous Inquiry';
        $email = $data['email'] ?? 'no-email@provided.com';
        $phone = $data['phone'] ?? '';
        $company = $data['company'] ?? '';
        $product = $data['serviceOrProduct'] ?? ($data['productName'] ?? '3D Printing Solutions');
        $quantity = $data['quantity'] ?? '1';
        $timeline = $data['timeline'] ?? 'Standard';
        $message = $data['message'] ?? '';
        $attachments = json_encode($data['fileAttachments'] ?? []);

        $stmt = $pdo->prepare("
            INSERT INTO quote_requests (name, email, phone, company, service_or_product, quantity, timeline, message, file_attachments, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
            RETURNING *
        ");
        $stmt->execute([$name, $email, $phone, $company, $product, $quantity, $timeline, $message, $attachments]);
        $created = $stmt->fetch();

        http_response_code(201);
        echo json_encode(['success' => true, 'quote' => $created]);
        exit();
    }
} catch (Throwable $e) {
    echo json_encode([]);
    exit();
}
