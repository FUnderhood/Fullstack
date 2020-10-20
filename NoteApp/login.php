<?php
//Start session
session_start();
//Connect to the Database
include("connection.php");

//define errors
$missingEmail = '<p><strong>Please enter your Email adress!</strong></p>';
$missingPassword = '<p><strong>Please enter a password!</strong></p>';

//get Email and Password
if(empty($_POST["loginemail"])){
    $errors .= $missingEmail;
}else{
    $email = filter_var($_POST["loginemail"], FILTER_SANITIZE_EMAIL);
}
if(empty($_POST["loginpassword"])){
    $errors .= $missingPassword;
}else{
    $password = filter_var($_POST["loginpassword"], FILTER_SANITIZE_STRING);
}

//if there are any errors print error
if($errors){
    $resultMessage = '<div class="alert alert-danger">' . $errors .'</div>';
    echo $resultMessage;
    exit;
}else{
    //else prepare variable for the query
    $email = mysqli_real_escape_string($link, $email);
    $password = mysqli_real_escape_string($link, $password);
    $password = hash('sha256', $password);
    //check combination of email and password 
    $sql = "SELECT * FROM users WHERE email = '$email' AND password='$password' AND activation='activated'";
    $result = mysqli_query($link, $sql);
    if(!$result){
        echo '<div class="alert alert-danger">Error running the query!</div>';
        exit;
    }
    //if email and password dont match print error 
    $count = mysqli_real_escape_string($link, $email);
    if($count !== 1){
        echo '<div class="alert alert-danger"> Wrong username or Password</div>';
    }else{
        $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
        $_SESSION['user_id'] = $row['user_id'];
        $_SESSION['username'] = $row['username'];
        $_SESSION['email'] = $row['email'];
        
        if(empty($_POST['rememberme'])){
            //if remember me not checked
            echo "succes";
        }else{
            //create two variables $authentificator1 and $authentificator2
            $authentificator1 = bin2hex(openssl_random_pseudo_bytes(10));
            $authentificator2 = bin2hex(openssl_random_pseudo_bytes(20));
            function f1($a, $b){
                $c = $a . "," . bin2hex($b);
                return $c;
            }
            $cookieValue = f1($authentificator1,$authentificator2);
            setcookie("rememberme", $cookieValue, time() + 1296000);
            
            //store them in rememberme table
            function f2($a){
                $b = hash('sha256', $a);
                return $b;
            }
            $f2authentificator2 = f2($authentificator2);
            $user_id = $_SESSION['user_id'];
            $expiration = date('Y-m-d H:i:s', time() + 1296000);
            
            $sql = "INSERT INTO rememberme (`authentificator1`, `f2authentificator2`, `user_id`, `expires`) VALUE ('$authentificator1','$f2authentificator2','$user_id','$expiration')";
            $result = mysqli_query($link, $sql);
            if(!$result){
                echo '<div class="alert alert-danger">There was an error storing data to remember you next time.</div>';
            }else{
                echo "success";
            }
        }
    }
}


?>