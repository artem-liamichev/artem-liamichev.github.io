<?php

define('USER_ID', 384078309);
define('BOT_TOKEN', '2091025529:AAEYAoy4SsOc6GSC18cnHK2yCSNamWGz9bI');

define('TG_HOST', 'https://api.telegram.org');



$text = print_r($_POST, true);

if (count($_GET)) {
	$text .= PHP_EOL.PHP_EOL.'Query:'.PHP_EOL.print_r($_GET, true);
}


################################################################

$url = sprintf('%s/bot%s/%s', TG_HOST, BOT_TOKEN, 'sendMessage');

$data = [
    'chat_id' => USER_ID,
    'text'    => $text,
];


$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

curl_exec($ch);

curl_close($ch);
