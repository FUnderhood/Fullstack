//Ajax Call for Sign up form
$("#signupform").submit(function(event){
    event.preventDefault();
    var datatopost = $(this).serializeArray();
    
    //send them to signup.php using ajax
    $.ajax({
        url: "signup.php", type: "POST", data: datatopost,
        success: function(data){
            if(data){
                $("#signupmessage").html(data);
            }
        },
        error: function(){
            $("#signupmessage").html("<div class='alert alert-danger>There was an error with the Ajax Call. Please try again later.</div>");
        }
    });
});


//Ajax Call for the login form
$("#loginform").submit(function(event){
    event.preventDefault();
    var datatopost = $(this).serializeArray();
    
    //send them to login.php using ajax
    $.ajax({
        url: "login.php", type: "POST", data: datatopost,
        success: function(data){
            if(data){
                $("#loginmessage").html(data);
            }
        },
        error: function(){
            $("#loginmessage").html("<div class='alert alert-danger>There was an error with the Ajax Call. Please try again later.</div>");
        }
    });
});

//Ajax Call for forgot password
$("#forgotpasswordform").submit(function(event){
    event.preventDefault();
    var datatopost = $(this).serializeArray();
    
    //send them to signup.php using ajax
    $.ajax({
        url: "forgot-password.php", type: "POST", data: datatopost,
        success: function(data){
            if(data){
                $("#forgotpasswordmessage").html(data);
            }
        },
        error: function(){
            $("#forgotpasswordmessage").html("<div class='alert alert-danger>There was an error with the Ajax Call. Please try again later.</div>");
        }
    });
});