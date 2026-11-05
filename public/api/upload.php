<?php
/**
 * Leniva CAD Solutions - Universal File & Image Upload Endpoint
 * Compatible with Hostinger hPanel Apache / PHP
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Ensure uploads folder exists in public_html / web root
$uploadDir = __DIR__ . '/../../uploads';
if (!is_dir($uploadDir)) {
    @mkdir($uploadDir, 0755, true);
}

// Fallback if document root differs
if (!is_dir($uploadDir)) {
    $uploadDir = __DIR__ . '/../uploads';
    if (!is_dir($uploadDir)) {
        @mkdir($uploadDir, 0755, true);
    }
}

$uploadedFileName = null;
$mimeType = 'application/octet-stream';
$fileSize = 0;

// 1. Handle multipart form-data (standard file input)
if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
    $origName = basename($_FILES['file']['name']);
    $ext = strtolower(pathinfo($origName, PATHINFO_EXTENSION));
    
    // Allowed extensions
    $allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'pdf'];
    if (!in_array($ext, $allowed)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid file extension: ' . $ext]);
        exit;
    }

    $cleanBase = preg_replace('/[^a-zA-Z0-9_-]/', '', pathinfo($origName, PATHINFO_FILENAME));
    $cleanBase = substr($cleanBase, 0, 40);
    $safeName = 'media_' . time() . '_' . substr(md5(uniqid()), 0, 8) . '.' . $ext;
    $targetPath = $uploadDir . '/' . $safeName;

    if (move_uploaded_file($_FILES['file']['tmp_name'], $targetPath)) {
        $uploadedFileName = $safeName;
        $mimeType = $_FILES['file']['type'] ?? ('image/' . $ext);
        $fileSize = filesize($targetPath);
    }
}

// 2. Handle raw JSON with base64 data (cad visual editor format)
if (!$uploadedFileName) {
    $rawInput = file_get_contents('php://input');
    if ($rawInput) {
        $json = json_decode($rawInput, true);
        if ($json && (!empty($json['dataBase64']) || !empty($json['fileBase64']))) {
            $origName = basename($json['filename'] ?? $json['name'] ?? 'upload.jpg');
            $ext = strtolower(pathinfo($origName, PATHINFO_EXTENSION)) ?: 'jpg';
            $base64 = $json['dataBase64'] ?? $json['fileBase64'];

            // Strip data URL scheme prefix if present
            if (strpos($base64, ',') !== false) {
                $parts = explode(',', $base64, 2);
                $base64 = $parts[1];
            }

            $binary = base64_decode($base64);
            if ($binary) {
                $safeName = 'media_' . time() . '_' . substr(md5(uniqid()), 0, 8) . '.' . $ext;
                $targetPath = $uploadDir . '/' . $safeName;
                if (file_put_contents($targetPath, $binary)) {
                    $uploadedFileName = $safeName;
                    $mimeType = $json['contentType'] ?? ('image/' . $ext);
                    $fileSize = strlen($binary);
                }
            }
        }
    }
}

if ($uploadedFileName) {
    $protocol = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'] ?? 'www.leniva3d.com';
    $publicUrl = "/uploads/{$uploadedFileName}";
    $absoluteUrl = "{$protocol}://{$host}{$publicUrl}";

    echo json_encode([
        'ok' => true,
        'success' => true,
        'url' => $publicUrl,
        'absoluteUrl' => $absoluteUrl,
        'fileName' => $uploadedFileName,
        'fileSize' => $fileSize,
        'mimeType' => $mimeType
    ]);
} else {
    http_response_code(400);
    echo json_encode([
        'ok' => false,
        'success' => false,
        'error' => 'No valid file received or file upload failed'
    ]);
}
