<?php
$link = mysqli_connect("localhost", "franzgae_onlinenotes", "Akatsuki2015!", "franzgae_onlinenotes");

if(mysqli_connect_error()){
    die('ERROR: Unable to connect:' . mysqli_connect_error()); 
    echo "<script>window.alert('Hi!')</script>";
}
    ?>