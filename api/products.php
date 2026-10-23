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
    echo json_encode(['success' => true]);
    exit();
}

try {
    if ($method === 'GET') {
        $category = $_GET['category'] ?? null;
        $slug = $_GET['slug'] ?? null;

        if ($slug) {
            $stmt = $pdo->prepare("SELECT * FROM products WHERE slug = ? OR id = ? LIMIT 1");
            $stmt->execute([$slug, $slug]);
            $prod = $stmt->fetch();
            if (!$prod) {
                http_response_code(404);
                echo json_encode(['error' => 'Product not found']);
                exit();
            }
            echo json_encode($prod);
            exit();
        }

        if ($category) {
            $stmt = $pdo->prepare("SELECT * FROM products WHERE category_slug = ? ORDER BY created_at DESC");
            $stmt->execute([$category]);
            echo json_encode($stmt->fetchAll() ?: []);
            exit();
        }

        $stmt = $pdo->query("SELECT * FROM products ORDER BY created_at DESC");
        echo json_encode($stmt->fetchAll() ?: []);
        exit();
    }

    if ($method === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'] ?? ('prod-' . time());
        $slug = $data['slug'] ?? strtolower(preg_replace('/[^a-zA-Z0-9]+/', '-', $data['name'] ?? $id));

        $stmt = $pdo->prepare("
            INSERT INTO products (
                id, slug, name, brand, category, category_slug, technology, tagline,
                short_description, description, hero_image, images, price, in_stock, is_featured
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            RETURNING *
        ");
        $stmt->execute([
            $id,
            $slug,
            $data['name'] ?? 'Unnamed Product',
            $data['brand'] ?? 'Leniva',
            $data['category'] ?? '3D Printing Solutions',
            $data['category_slug'] ?? 'general',
            $data['technology'] ?? 'Additive Manufacturing',
            $data['tagline'] ?? '',
            $data['short_description'] ?? '',
            $data['description'] ?? '',
            $data['hero_image'] ?? '/images/products/pratham-mini.png',
            json_encode($data['images'] ?? []),
            $data['price'] ?? 0,
            $data['in_stock'] ?? true,
            $data['is_featured'] ?? false,
        ]);
        $created = $stmt->fetch();

        http_response_code(201);
        echo json_encode(['success' => true, 'product' => $created]);
        exit();
    }
} catch (Throwable $e) {
    echo json_encode([]);
    exit();
}
