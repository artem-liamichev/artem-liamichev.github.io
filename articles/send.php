<?php
// Файлы phpmailer
require '../phpmailer/PHPMailer.php';
require '../phpmailer/SMTP.php';
require '../phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
// $tel = $_POST['telNumber'];
// if ($_POST['userName']) {$name = $_POST['userName']}
// if ($_POST['1_question']) {$q1 = $_POST['1_question']}
// if ($_POST['2_question']) {$q2 = $_POST['2_question']}
// if ($_POST['3_question']) {$q3 = $_POST['3_question']}
// if ($_POST['4_question']) {$q4 = $_POST['4_question']}
// if ($_POST['5_question']) {$q5 = $_POST['5_question']}


// Формирование самого письма
$title = "Новая заявка!";
$body = '<h2>Заявка</h2>';
if (isset($_POST['userName'])) {
    $body.='<p><b>Имя заказчика:</b> '.$_POST['userName'].'</p>';
}
$body.='<p><b>Номер телефона:</b>   '.$_POST['telNumber'].'</p>';
if (isset($_POST['1_question'])) {
    $body.='<p></p><h2>Ответы:</h2><p><b>Количество человек:</b>   '.$_POST['1_question'].'</p>';   
}
if (isset($_POST['2_question'])) {
    $body.='<p><b>Место отдыха:</b>   '.$_POST['2_question'].'</p>';   
}
if (isset($_POST['3_question'])) {
    $body.='<p><b>Вид мероприятия:</b>   '.$_POST['3_question'].'</p>';   
}
if (isset($_POST['4_question'])) {
    $body.='<p><b>Бюджет:</b>   '.$_POST['4_question'].'</p>';   
}
if (isset($_POST['5_question'])) {
    $body.='<p><b>Требуется фото или видеосъёмка:</b>   '.$_POST['5_question'].'</p>';   
}

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'smtp.yandex.ru'; // SMTP сервера вашей почты
    $mail->Username   = 'anton.dedyugin'; // Логин на почте
    $mail->Password   = 'wcvyhyqllxdftnfy'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('anton.dedyugin@yandex.ru', 'Заявка'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('jacov.soboleff@yandex.ru');  
    // $mail->addAddress('youremail@gmail.com'); // Ещё один, если нужен

    // Прикрипление файлов к письму
// if (!empty($file['name'][0])) {
//     for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
//         $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
//         $filename = $file['name'][$ct];
//         if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
//             $mail->addAttachment($uploadfile, $filename);
//             $rfile[] = "Файл $filename прикреплён";
//         } else {
//             $rfile[] = "Не удалось прикрепить файл $filename";
//         }
//     }   
// }

// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

include '../_tg.php';

// Отображение результата
header('Content-type: application/json');
echo json_encode($result);