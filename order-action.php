<?php
$telegram = 1;
$telegram_id = 493411607;
$email = 'qwerty.radchenko@gmail.com';
$field_name = isset($_POST['field-name']) ? $_POST['field-name'] : '';
$field_phone = isset($_POST['field-phone']) ? $_POST['field-phone'] : '';
if ($field_phone) {
    $text = '';
    if ($field_name) $text.= ($text ? ($telegram ? "\n" : "<br>") : '') . "Имя: " . mb_substr($field_name, 0, 1000);
    if ($field_phone) $text.= ($text ? ($telegram ? "\n" : "<br>") : '') . "Телефон: " . mb_substr(strip_tags($field_phone), 0, 1000);
	if ($telegram) {
		$url = file_get_contents("https://api.telegram.org/bot1460497509:AAH3IXyCEgI028bXM5FYn3zVFDQwYuiA6PI/sendMessage?" . http_build_query(['chat_id' => $telegram_id,'text' => $text]));
		$url = $url ? json_decode($url, 1) : [];
		if ($url['ok'] !== true) echo 'Error';
		else header('Location: /order-success.html');
	} else {
		require_once ('phpmailer/PHPMailerAutoload.php');
		$mail = new PHPMailer;
		$mail->CharSet = 'utf-8';
		$mail->setFrom($email);
		$mail->addAddress($email);
		$mail->Subject = 'Заявка';
		$mail->Body = $text;
		$mail->AltBody = $text;
		if (!$mail->send()) echo 'Error';
		else header('Location: /order-success.html');
	}
} else header('Location: /');
die();
?>