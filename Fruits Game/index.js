var playing = false;
var score; 
var life;
var step; 
var action;
var fruits = ['apple', 'banane', 'grapes', 'mango', 'orange', 'peach', 'pear', 'pineapple', 'watermelon'];
$(function(){
    //Start drücken um das Spiel zu beginnen 
    $("#start").click(function(){
        //Überprüfen ob der User schon das Spiel gestartet hat. 
        //Falls das Spiel schon gestartet wurde 
        //Die Seite wird neue geladen 
        if(playing == true){
            location.reload();
        }else{
            //falls das Spiel noch nicht gestartet wurde, variable playing auf true setzen 
            playing = true;
            //Das Score muss auch initialisiert mit 0.
            score = 0;
            $("#scorevalue").html(score);
            //Die life Box muss auch angezeigt werden. 
            $("#lifebox").show();
            life = 3;
            addHearts();
            //Die Box Game over muss ausgeblendet werden
            $("#gameover").hide();
            //ändern die Box start Game to Reset Game
            $("#start").html("Reset Game");
            //fruit fallen runter
            startAction();
        }
    });
    
    //Schneiden von Fruits
    $("#fruit1").mouseover(function(){
       //die Variable Score wird erhöht
        score++;
        $("#scorevalue").html(score);
        //Die Audiodatei wird abgespielt beim schneiden des Fruits 
        $("#sound")[0].play();
        //stop fruit
        clearInterval(action);
        //wenn ein Fruits getroffen wurde muss er explodieren und verschwinden 
        $("#fruit1").hide("explode", 500);
        //neue Fruits werden gesendet
        setTimeout(startAction, 500);
    });
    
    //----------------- Functionen -------------------
    //Add heart
    function addHearts(){
        $("#lifebox").empty();
        for(i = 0; i < life; i++){
            $("#lifebox").append('<img src="picture/heart.png" class="life">');
        }
    }
    
    //Beginne mit dem senden von fruits 
    function startAction(){
        //generiert fruits 
        $("#fruit1").show();
        //Fruit wird random ausgewählt
        chooseFruit();
        //Der fruit wird random in der Box platziert 
        $("#fruit1").css({'left': Math.round(500*Math.random()), 'top': -50});
        //gerneriert ein random step
        step = 1 + Math.round(5*Math.random());
        //die Fruit bewegen sich nach unten jede 10ms
        action = setInterval(function(){
            //die Fruits bewegen sich stück für stück nach unten
            $("#fruit1").css('top', $("#fruit1").position().top + step);
            //check ob der Fruit zu langsam ist 
            if($("#fruit1").position().top > $("#main").height()){
                //überprüfen ob wir noch leben haben 
                if(life > 1){
                    //generiert fruit
                    $("#fruit1").show();
                    //ein Random Fruit wird ausgewählt
                    chooseFruit();
                    //auf eine Random position 
                    $("#fruit1").css({'left': Math.round(500*Math
                                                        .random()), 'top': -45});
                    
                    //generiert ein random geschwindigkeit
                    step = 1 + Math.round(5*Math.random());
                    //dekrementiere die Herzen 
                    life --;
                    //actualisiert die box mit den Herzen 
                    addHearts();
                }else{
                    //Game over. Playing wieder auf false setzen 
                    playing= false;
                    //button reset wieder auf starten ändern
                    $("#start").html("Start Game");
                    //Game Over Box anzeigen
                    $("#gameover").show();
                    //die box Game Over anzeigen 
                    $("#gameover").html('<p><Game Over!/p><p>Ihr Score ist: ' + score + '</p>');
                    //die Box mit den Herzen wieder ausblenden 
                    $("#lifebox").hide();
                    //die Actionen stopen
                    stopAction();
                }
            }
        },10);
    }
    
    //generiert ein Random Fruit
    function chooseFruit(){
        $("#fruit1").attr('src', 'picture/' + fruits[Math.round(8*Math.random())] + '.png')
    }
    
    //Stop dropping fruits
    function stopAction(){
        clearInterval(action);
        $("#fruit1").hide();
    }
});

