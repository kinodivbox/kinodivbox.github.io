<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$config = include __DIR__ . '/config.php';
$id = isset($_GET['id']) ? preg_replace('/\D/', '', $_GET['id']) : '';

if (!$id) {
    echo json_encode(['error' => 'Не указан ID']);
    exit;
}

$cacheFile = __DIR__ . '/cache/' . md5($id) . '.json';
if (file_exists($cacheFile) && (time() - filemtime($cacheFile) < $config['cache_time'])) {
    echo file_get_contents($cacheFile);
    exit;
}

$playersData = [];
foreach ($config['players'] as $name => $player) {
    $url = $player['api_url'] . '?kinopoisk_id=' . $id;
    if (!empty($player['api_key'])) {
        $url .= '&api_key=' . $player['api_key'];
    }
    $response = @file_get_contents($url);
    if ($response) {
        $data = json_decode($response, true);
        if (!empty($data['iframe_url'])) {
            $playersData[$name] = $data['iframe_url'];
        }
    }
}

if (!$playersData) {
    echo json_encode(['error' => 'Нет доступных плееров']);
    exit;
}

file_put_contents($cacheFile, json_encode($playersData, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
echo json_encode($playersData, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
