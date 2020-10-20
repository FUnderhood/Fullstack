var playing = false;
var score;
var timer;
var correctAnswer;
var action;

//Wenn der User auf start drückt
document.getElementById("start").onclick = function(){
    //falls man schon am Spielen ist
    if(playing == true){
        location.reload();
    }else{
        //sonst setzt man das Score auf 0 und die variable playing auf true
        playing = true;
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        //Der Timer muss angezeigt werden 
        show("timer");
        timer = 60;
        document.getElementById("timevalue").innerHTML = timer;
        //Die Game over Box muss augeblendet sein 
        hide("gameover");
        //Der Start Game Button muss geaändert werden 
        document.getElementById("start").innerHTML = "Reset Game";
        //Der Countdown muss gestartet werden 
        startCountDown();
        //Fragen müssen generiert werden 
        generateQA();
    }
}

//wenn der User auf die Answerbox click
for(i = 1; i < 5; i++){
    document.getElementById("box" + i).onclick = function(){
        //es muss zuerst überprüft ob das Spiel schon gestarttet wurde
        if(playing == true){
            //es muss dann überprüft ob die richtige Box ausgewählt wurde
            if(this.innerHTML == correctAnswer){
                //die variable score muss erhöht werden 
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                //Die box Falsch muss ausgeblendet werden und die Box Richtig muss angezeigt werden.
                hide("falsch");
                show("richtig");
                // Die Box muss dann nach eine Sec wieder ausgeblendet werden 
                setInterval(function(){
                    hide("richtig");
                }, 1000);
                //eine Neue Frage muss dann generiert werden 
                generateQA();
            }else{
                //Falls die falsche box angeglickt wurde, die Box Falsch muss dann angezeigt werden und wieder nach eine sec verschwinden 
                hide("richtig");
                show("falsch");
                setInterval(function(){
                    hide("falsch");
                }, 1000);
            }
        }
    }
}

//Function startCountDown
function startCountDown(){
    action = setInterval(function(){
        //der Timer muss dann nach eine sec substrahiert werden 
        timer -= 1;
        document.getElementById("timevalue").innerHTML = timer;
        //falls der timer gleich null der Countdown muss dann gestoppt werden und die Game Over Box muss angeblendet sein
        if(timer == 0){
            stopCounter();
            show("gameover");
            document.getElementById("gameover").innerHTML = "<p>Game Over</p><p>Ihr Score ist: " + score + "</p>";
            //Die Boxen Timer/richtig/falsch müssen wieder ausgeblendet werden 
            hide("time");
            hide("rictig");
            hide("falsch");
            //Playing muss wieder auf false gesetzt
            playing = false;
            //Die Box start Game muss wieder Start Game sein
            document.getElementById("start").innerHTML = "Start Game";
        }
    }, 1000);
}

//Function stopcounter
function stopCounter(){
    clearInterval(action);
}

//function ausblenden
function hide(Id){
    document.getElementById(Id).style.display = "none";
}

//function anzeigen 
function show(Id){
    document.getElementById(Id).style.display = "block";
}

//Function Generate Question and Answer
function generateQA(){
    //var X und Y setzen 
    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(9*Math.random());
    correctAnswer = x * y;
    //die Variable x und y müssen in der Box Question geschrieben werden 
    document.getElementById("question").innerHTML = x + "X" + y;
    //correcte Position muss noch bestimmt werden 
    var correctPosition = 1 + Math.round(3*Math.random());
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer;
    //Die andere Boxen müssen mit falschen Werte ausgefüllt werden 
    var answers = [correctAnswer];
    for(i = 1; i < 5; i++){
        //wenn i ungleich die richtige position dann ausfüllen
        if(i != correctPosition){
            var wronganswer;
            do{
                wronganswer = (1 + Math.round(9*Math.random())) * (1 + Math.round(9*Math.random()));
            }while(answers.indexOf(wronganswer) > -1);
            document.getElementById("box" + i).innerHTML = wronganswer;
            answers.push(wronganswer);
        }
    }
}


