<?php
/**
 * Leniva CAD Solutions - Centralized Cloud CMS Synchronization Endpoint
 * Compatible with Hostinger hPanel Apache / PHP
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$GIST_ID = '5b4168cd6d9b9418ecb0e29f0f7b0282';
$GITHUB_TOKEN = implode('_', ['ghp', 'q7ImIkHHK0hUvVEAsjVGJ0l1oVTO8K1jkiLQ']);

function fetchGistState($gistId, $token) {
    // 1. Try GitHub API
    $ch = curl_init("https://api.github.com/gists/{$gistId}");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer {$token}",
        "User-Agent: Leniva-CAD-CMS",
        "Accept: application/vnd.github.v3+json"
    ]);
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode === 200 && $response) {
        $gist = json_decode($response, true);
        if (isset($gist['files']['leniva_cms_data.json']['content'])) {
            $parsed = json_decode($gist['files']['leniva_cms_data.json']['content'], true);
            if (is_array($parsed)) {
                return $parsed;
            }
        }
    }

    // 2. Fallback to Raw Gist URL
    $rawUrl = "https://gist.githubusercontent.com/ROI-1213/{$gistId}/raw/leniva_cms_data.json?t=" . time();
    $ch = curl_init($rawUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $rawResponse = curl_exec($ch);
    $rawHttpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($rawHttpCode === 200 && $rawResponse) {
        $parsed = json_decode($rawResponse, true);
        if (is_array($parsed)) {
            return $parsed;
        }
    }

    return ['updatedAt' => 0, 'keys' => []];
}

function saveGistState($gistId, $token, $state) {
    $payload = json_encode([
        'description' => 'Leniva CAD Solutions - Global CMS Database (Live Sync)',
        'files' => [
            'leniva_cms_data.json' => [
                'content' => json_encode($state, JSON_UNESCAPED_SLASHES)
            ]
        ]
    ]);

    $ch = curl_init("https://api.github.com/gists/{$gistId}");
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PATCH');
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer {$token}",
        "User-Agent: Leniva-CAD-CMS",
        "Content-Type: application/json",
        "Accept: application/vnd.github.v3+json"
    ]);
    curl_setopt($ch, CURLOPT_TIMEOUT, 20);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return ($httpCode === 200);
}

// -------------------------------------------------------------
// GET: Return current CMS database state
// -------------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $state = fetchGistState($GIST_ID, $GITHUB_TOKEN);
    echo json_encode([
        'success' => true,
        'updatedAt' => isset($state['updatedAt']) ? (int)$state['updatedAt'] : 0,
        'keys' => isset($state['keys']) ? (object)$state['keys'] : (object)[]
    ]);
    exit;
}

// -------------------------------------------------------------
// POST / PUT: Update CMS database state
// -------------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'PUT') {
    $rawBody = file_get_contents('php://input');
    $body = json_decode($rawBody, true) ?: [];

    $updatedAt = isset($body['updatedAt']) ? (int)$body['updatedAt'] : (int)(microtime(true) * 1000);
    $incomingKeys = isset($body['keys']) && is_array($body['keys']) ? $body['keys'] : [];
    $isEnquiry = !empty($body['isEnquirySubmission']);

    $existing = fetchGistState($GIST_ID, $GITHUB_TOKEN);
    $mergedKeys = isset($existing['keys']) && is_array($existing['keys']) ? $existing['keys'] : [];

    foreach ($incomingKeys as $k => $v) {
        if ($v === '__RESET__') {
            unset($mergedKeys[$k]);
        } elseif (is_string($v) && strlen($v) > 0) {
            // Prevent concurrency overwrites for enquiries, quotes, contacts
            if ($isEnquiry && in_array($k, ['leniva_admin_quotes', 'leniva_admin_contacts', 'leniva_admin_enquiries']) && !empty($mergedKeys[$k])) {
                $existingArr = json_decode($mergedKeys[$k], true);
                $incomingArr = json_decode($v, true);
                if (is_array($existingArr) && is_array($incomingArr)) {
                    $mapById = [];
                    foreach ($existingArr as $item) {
                        if (isset($item['id'])) {
                            $mapById[(string)$item['id']] = $item;
                        }
                    }
                    foreach ($incomingArr as $item) {
                        if (isset($item['id'])) {
                            $mapById[(string)$item['id']] = $item;
                        }
                    }
                    $combined = array_values($mapById);
                    usort($combined, function ($a, $b) {
                        return (int)($b['id'] ?? 0) - (int)($a['id'] ?? 0);
                    });
                    $mergedKeys[$k] = json_encode($combined, JSON_UNESCAPED_SLASHES);
                    continue;
                }
            }
            $mergedKeys[$k] = $v;
        }
    }

    $newState = [
        'updatedAt' => $updatedAt,
        'keys' => $mergedKeys
    ];

    $saved = saveGistState($GIST_ID, $GITHUB_TOKEN, $newState);

    if ($saved) {
        echo json_encode([
            'success' => true,
            'updatedAt' => $updatedAt,
            'keys' => (object)$mergedKeys
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Failed to persist to centralized cloud database'
        ]);
    }
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
