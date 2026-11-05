<?php
/**
 * Leniva CAD Solutions - Native PostgreSQL Database Connection
 * Database: leniv698 | User: leniv698
 * Supports PostgreSQL PDO connection for Hostinger hPanel and Apache environments
 */

function getPostgresConnection() {
    static $pdoInstance = null;
    static $hasAttempted = false;

    if ($hasAttempted) {
        return $pdoInstance;
    }
    $hasAttempted = true;

    $host = getenv('PGHOST') ?: (getenv('DB_HOST') ?: '127.0.0.1');
    $port = getenv('PGPORT') ?: (getenv('DB_PORT') ?: '5432');
    $dbname = getenv('PGDATABASE') ?: (getenv('DB_NAME') ?: 'leniv698');
    $user = getenv('PGUSER') ?: (getenv('DB_USER') ?: 'leniv698');
    $pass = getenv('PGPASSWORD') ?: (getenv('DB_PASS') ?: 'hhvu1A8IrRupKLdfEDhnsx9LQ');

    $dbUrl = getenv('DATABASE_URL');
    if ($dbUrl) {
        $parsed = parse_url($dbUrl);
        if ($parsed) {
            $host = $parsed['host'] ?? $host;
            $port = $parsed['port'] ?? $port;
            $user = $parsed['user'] ?? $user;
            $pass = $parsed['pass'] ?? $pass;
            $dbname = ltrim($parsed['path'] ?? $dbname, '/');
        }
    }

    try {
        $dsn = "pgsql:host={$host};port={$port};dbname={$dbname};";
        $pdo = new PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_TIMEOUT => 3,
        ]);
        $pdoInstance = $pdo;
        return $pdoInstance;
    } catch (Throwable $e) {
        error_log('[PostgreSQL Notice] Native connection unavailable: ' . $e->getMessage());
        $pdoInstance = null;
        return null;
    }
}
