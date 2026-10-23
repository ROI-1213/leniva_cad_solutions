<?php
/**
 * Leniva CAD Solutions - Resilient Database Connection
 * Supports PostgreSQL when available, and gracefully falls back to Cloud CMS / Client storage
 * without ever crashing the website with a 500 error.
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

function getDbConnection() {
    static $connection = null;
    static $attempted = false;

    if ($attempted) {
        return $connection;
    }
    $attempted = true;

    $host = getenv('DB_HOST') ?: '127.0.0.1';
    $port = getenv('DB_PORT') ?: '5432';
    $dbname = getenv('DB_NAME') ?: 'leniv698';
    $user = getenv('DB_USER') ?: 'leniv698';
    $pass = getenv('DB_PASS') ?: 'hhvu1A8IrRupKLdfEDhnsx9LQ';

    // Parse DATABASE_URL if available
    $databaseUrl = getenv('DATABASE_URL');
    if ($databaseUrl) {
        $parsed = parse_url($databaseUrl);
        if ($parsed) {
            $host = $parsed['host'] ?? $host;
            $port = $parsed['port'] ?? $port;
            $user = $parsed['user'] ?? $user;
            $pass = $parsed['pass'] ?? $pass;
            $dbname = ltrim($parsed['path'] ?? $dbname, '/');
        }
    }

    try {
        $dsn = "pgsql:host=$host;port=$port;dbname=$dbname;connect_timeout=2;";
        $pdo = new PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::ATTR_TIMEOUT => 2,
        ]);
        $connection = $pdo;
        return $connection;
    } catch (Throwable $e) {
        // Log warning but NEVER crash with 500 Server Error
        error_log('Leniva DB connection unavailable: ' . $e->getMessage());
        $connection = null;
        return null;
    }
}
