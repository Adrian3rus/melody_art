<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $to = 'tu_correo@example.com';
    $subject = 'Nuevo mensaje de contacto';
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    $email_body = "Nombre: $name\n";
    $email_body .= "Correo electrónico: $email\n";
    $email_body .= "Mensaje:\n$message";

    if (mail($to, $subject, $email_body, $headers)) {
        echo 'Mensaje enviado con éxito.';
    } else {
        echo 'Error al enviar el mensaje.';
    }
}
?>

