<?php
//start session
session_start();
include('connection.php');

//check user inputs
//define error message
$missingUsername = '<p><strong>Please enter a username!</strong></p>';
$missingEmail = '<p><strong>Please enter your Email adress!</strong></p>';
$invalidEmail = '<p><strong>Please enter a valid email adress!</strong></p>';
$missingPassword = '<p><strong>Please enter a password!</strong></p>';
$invalidPassword = '<p><strong>Your password should be at least 6 characters long and include one capital letter and one number!</strong></p>';
$differentPassword = '<p><strong>Password don\'t match!</strong></p>';
$missingPassword2 = '<p><strong>Please confirm your password!</strong></p>';

//get username
if(empty($_POST["username"])){
    $errors .= $missingUsername;
}else{
    $username = filter_var($_POST["username"], FILTER_SANITIZE_STRING);
}

//get Email 
if(empty($_POST["email"])){
    $errors .= $missingEmail;
}else{
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
        $errors .= $invalidEmail;
    }
}

//get password
if(empty($_POST["password"])){
    $errors .= $missingPassword;
}elseif(!(strlen($_POST["password"])>6 and preg_match('/[A-Z]/', $_POST["password"]) and preg_match('/[0-9]/', $_POST["password"]))){
    $errors .= $invalidPassword;
}else{
    $password = filter_var($_POST["password"], FILTER_SANITIZE_STRING);
    if(empty($_POST["password2"])){
        $errors .= $missingPassword2;
    }else{
        $password2 = filter_var($_POST["password2"], FILTER_SANITIZE_STRING);
        if($password !== $password2){
            $errors .= $differentPassword;
        }
    }
}

//if there are any errors print error
if($errors){
    $resultMessage = '<div class="alert alert-danger">' . $errors .'</div>';
    echo $resultMessage;
    exit;
}

//no errors 
//prepare variable for the querry
$username = mysqli_real_escape_string($link, $username);
$email = mysqli_real_escape_string($link, $email);
$password = mysqli_real_escape_string($link, $password);
$password = hash('sha256', $password);

//if Username exit print error
$sql = "SELECT * FROM users WHERE username = '$username'";
$result = mysqli_query($link, $sql);
if(!$result){
    echo '<div class="alert alert-danger">Error running the query!</div>';
    exit;
}
$results =mysqli_num_rows($result);
if($results){
    echo '<div class="alert alert-danger">That username is already registered. Do you want to log in?</div>'; exit;
}

//if email exist int the users table print error 
$sql = "SELECT * FROM users WHERE email = '$email'";
$result = mysqli_query($link, $sql);
if(!$result){
    echo '<div class="alert alert-danger">Error running the query!</div>';
    exit;
}
$results =mysqli_num_rows($result);
if($results){
    echo '<div class="alert alert-danger">That email is already registered. Do you want to log in?</div>'; exit;
}

//Create a unique activation code
$activationKey = bin2hex(openssl_random_pseudo_bytes(16));
$sql = "INSERT INTO users (`username`,`email`,`password`,`activation`) VALUES('$username','$email','$password','$activationKey')";
$result = mysqli_query($link, $sql);
if($result){
    echo '<div class="alert alert-danger">There was an error inserting the users details in the database!</div>'; exit;
}

//send the user an email with a link to activate.php with their email and activation code
$message = "Please click on this link to activate your account:\n\n";
$message .= "http://franzgaetan3.host20.uk/NoteApp/activate.php?email=$email" .urlencode($email) . "&key=$$activationKey";
if(mail($email, 'Confirm your Registration', $message, 'From:'.'franzgaetan3gmail.com@gmail.com')){
    echo "<div class='alert alert-success'>Thank for your registring! A confirmation email has been sent to $email. Please click on the activation link to activate your account.</div>";
}
?>