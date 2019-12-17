<?php
// ИМЯ
if (empty($_POST["name"])) {
    $errorMSG = "Name is required ";
} else {
    $name = $_POST["name"];
}

// E-MAIL
if (empty($_POST["email"])) {
    $errorMSG .= "Email is required ";
} else {
    $email = $_POST["email"];
}

// СООБЩЕНИЕ
if (empty($_POST["message"])) {
    $errorMSG .= "Message is required ";
} else {
    $message = $_POST["message"];
}


$EmailTo = "kozakproductionlviv@gmail.com";
$Subject = "New Message Received";

// готовим тело электронного письма
$Body .= "Name: ";
$Body .= $name;
$Body .= "n";

$Body .= "Email: ";
$Body .= $email;
$Body .= "n";

$Body .= "Message: ";
$Body .= $message;
$Body .= "n";

// отправляем электронную почту
$success = mail($EmailTo, $Subject, $Body, "From:".$email);

// перенаправляем на страницу сообщения об успешной отправке данных формы
if ($success){
   echo "success";
}else{
    if($errorMSG == ""){
        echo "Something went wrong :(";
    } else {
        echo $errorMSG;
    }
}

?>