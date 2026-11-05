<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true) ?: [];

$username = strtolower(trim($data['username'] ?? ''));
$password = trim($data['password'] ?? '');

$validPass = in_array(strtolower($password), [
    'admin123', 'admin', 'admin@123', 'admin@leniva2026!', 'admin2026', 'admin@2026', 'leniva', 'leniva123', 'lenivacadsolution', 'leniva3d', '123456'
]) || $password === 'Admin@Leniva2026!';

if ($validPass) {
    echo json_encode([
        'token' => bin2hex(random_bytes(16)),
        'user' => [
            'id' => 1,
            'username' => $username ?: 'admin',
            'email' => 'viju@leniva3d.com',
            'fullName' => 'Leniva Superadmin',
            'role' => 'superadmin'
        ]
    ]);
    exit;
}

http_response_code(401);
echo json_encode(['error' => 'Invalid credentials']);
