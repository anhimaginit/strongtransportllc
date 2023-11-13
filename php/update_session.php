<?php
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : $_SERVER['HTTP_HOST'];
header('Access-Control-Allow-Origin: ' . $origin);
header('Access-Control-Allow-Methods: POST, OPTIONS, GET, PUT');
header('Access-Control-Allow-Credentials: true');

if (!session_id()) session_start();
$data = $_POST['data'];
foreach ($data as $key => $value) {
     $_SESSION[$key] = $value;
}

echo json_encode(true);
