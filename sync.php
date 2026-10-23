<?php
// ===================================================================
// SWIFT JACKETS — CROSS-DEVICE CLOUD SYNC ENDPOINT (PHP)
// Works seamlessly on InfinityFree, Kesug.com, Apache, and cPanel hosts
// ===================================================================

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$dataFile = __DIR__ . '/data/store_data.json';
$dataDir = __DIR__ . '/data';

if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0777, true);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($dataFile)) {
        header('Cache-Control: no-cache, no-store, must-revalidate');
        echo file_get_contents($dataFile);
    } else {
        echo json_encode([
            'status' => 'empty',
            'message' => 'No store data found yet.'
        ]);
    }
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    if (empty($rawInput)) {
        http_response_code(400);
        echo json_encode(['error' => 'Empty request body']);
        exit();
    }

    $decoded = json_decode($rawInput, true);
    if (!$decoded || !is_array($decoded)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON payload']);
        exit();
    }

    $decoded['updatedAt'] = time() * 1000;
    $saved = file_put_contents($dataFile, json_encode($decoded, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));

    if ($saved !== false) {
        echo json_encode([
            'success' => true,
            'message' => 'Store successfully synced across all devices!',
            'updatedAt' => $decoded['updatedAt']
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save store data to disk']);
    }
    exit();
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
