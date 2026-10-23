<?php
require_once __DIR__ . '/db.php';

header('Content-Type: application/json');

$pdo = getDbConnection();

if ($pdo === null) {
    http_response_code(200);
    echo json_encode([
        'status' => 'ok',
        'database' => 'disconnected_cloud_active',
        'engine' => 'Leniva Cloud CMS Direct Sync',
        'serverTime' => date('Y-m-d H:i:s'),
    ]);
    exit();
}

try {
    $stmt = $pdo->query("SELECT version(), current_database(), current_user, NOW() as server_time");
    $info = $stmt->fetch();

    echo json_encode([
        'status' => 'ok',
        'engine' => 'PHP PDO PostgreSQL Direct Connection',
        'database' => $info['current_database'],
        'user' => $info['current_user'],
        'version' => $info['version'],
        'serverTime' => $info['server_time'],
    ]);
} catch (Throwable $e) {
    http_response_code(200);
    echo json_encode([
        'status' => 'ok',
        'database' => 'fallback',
        'message' => $e->getMessage(),
    ]);
}
