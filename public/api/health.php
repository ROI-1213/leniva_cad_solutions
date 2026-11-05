<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');
echo json_encode([
    'status' => 'ok',
    'platform' => 'Hostinger hPanel / Apache PHP',
    'time' => date('Y-m-d H:i:s')
]);
