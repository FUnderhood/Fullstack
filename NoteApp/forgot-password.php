<?php
session_start();
include('connection.php');

$missingEmail = '<p><strong>Please enter your Email adress!</strong></p>';
$invalidEmail = '<p><strong>Please enter a valid email adress!</strong></p>';

if(empty($_POST["forgotemail"])){
    $errors .= $missingEmail;
}else{
    $email = filter_var($_POST["forgotemail"], FILTER_SANITIZE_STRING);
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
        $errors .= $invalidEmail;
    }
}

//if there are any errors print error
if($errors){
    $resultMessage = '<div class="alert alert-danger">' . $errors .'</div>';
    echo $resultMessage;
    exit;
}

$email = mysqli_real_escape_string($link, $email);
$sql = "SELECT * FROM users WHERE email = '$email'";
$result = mysqli_query($link, $sql);
if(!$result){
    echo '<div class="alert alert-danger">Error running the query!</div>';
    exit;
}
$count = mysqli_query($link, $sql);
if($count != 1){
    echo'<div class="alert alert-danger">That email does not exist on our database!</div>'; exit;
}

//else get user:id
$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
$user_id = $row['user_id'];
//create a unique activation key
$key = bin2hex(openssl_random_pseudo_bytes(16));
$time = time();
$status = 'pending';
$sql = "INSERT INTO forgotpassword(`user_id`, `rkey`, `time`, `status`) VALUES ('$user_id', '$key', '$time', '$status')";
$result = mysqli_query($link, $sql);
if(!$result){
    echo '<div class="alert alert-danger">There was an error inserting the uses data in the satabase!</div>';
    exit;
}

// send email with link to resetpassword.php with user id and activation code
$message = "Please click on this link to reset your password:\n\n";
$message .= "http://franzgaetan3.host20.uk/NoteApp/resetpassword.php?user_id=$user_id&key=$key";
if(mail($email, 'Reset your password', $message, 'FROM:'.'franzgaetan3@gmail.com')){
    echo "<div class='alert alert-success'>An email has been sent to $email. Please click on the link to reset your password.</div>"
}
?>