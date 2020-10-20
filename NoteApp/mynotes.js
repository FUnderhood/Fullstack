$(function(){
    var activeNote = 0;
    var editNote = false;
    
    $.ajax({
        url: "loadnotes.php",
        success: function(data){
            $('#notes').html(data);
            clickonNote();
            clickonDelete();
        },
        error: function(){
            $('#alertContent').text("Ther was an error with the Ajax call. Please try again later.");
            $('#alert').fadeIn();
        }
    });
    
    //add new note: 
    $('#addNote').click(function(){
        $.ajax({
            url: "createnote.php",
            success: function(data){
                if(data == 'error'){
                    $('#alertContent').text("There was an issue inserting the new note in the database!");
                    $("#alert").fadeIn();
                }else{
                    activeNote = data;
                    $("textarea").val("");
                    showHide(["#notePad", "#allNotes"], ["#note", "#addNote", "#edit", "#done"]);
                    $("textarea").focus();
                }
            },
            error: function(){
                $('#alertContent').text("Ther was an error with the Ajax call. Please try again later.");
                $("#alert").fadeIn();
            }
        });
    });
    
    //type notes
    $("textarea").keyup(function(){
        $.ajax({
            url: "updatenote.php",
            type: "POST",
            data: {note: $(this).val(), id:activeNote};
            success: function(data){
            if(data == 'error'){
                $('#alertContent').text("There was an issue updating the note in the database");
                $("#alert").fadeIn();
            }
        },
           error: function(){
                $('#alertContent').text("Ther was an error with the Ajax call. Please try again later.");
                $("#alert").fadeIn();
            }    
        });
    });

    //Click on all notes button
    $("#allNotes").click(function(){
        $.ajax({
            url: "loadnotes.php",
            success: function(data){
                $('#notes').html(data);
                showHide(["#addNote", "#edit", "#note"], [, "#allNote", "#notePad"]);
                $("#alert").fadeIn();
            }
        });
    });

    //Click on done after editing 
    $("#done").click(function(){
        editMode = false;
        $(".noteheader").removeClass("col-xs-7 col-sm-9");
        showHide(["#edit"], [this, ".delete"]);
    });
    
    //Click on edit
    $("#edit").click(function(){
        editMode = true;
        $(".noteHeader").addClass("col-xs-7 col-sm-9");
        showHide(["#done", ".delete"], [this]);
    });

//function 
//click on note
function clickonNote(){
    $(".noteheader").click(function(){
        if(!editMode){
            activeNote = $(this).attr("id");
            $("textarea").val($(this).find('.text').text());
            showHide(["notePad", "#allNotes"], ["#notes", "#addNote", "#edit", "#done"]);
            $("textarea").focus();
        }
    });
}

//click on delete
function clickonDelete(){
    $(".delete").click(function(){
        var deleteButton = $(this);
        $.ajax({
            url: "delenote.php",
            type: "POST",
            data: {id:deleteButton.next().attr("id")},
            success: function(data){
                if(data == 'error'){
                    $('#alertContent').text("There was an issue delete the note from the database!");
                    $("#alert").fadeIn();
                }else{
                    deleteButton.parent().remove();
                }
            },
            error: function(){
                $('#alertContent').text("Ther was an error with the Ajax call. Please try again later");
                $("#alert").fadeIn();
            }
        });
    });
}

//ShowHide
function showHide(array1, array2){
    for(i=0; i<array1.length; i++){
        $(array1[i]).show();
    }
    for(i=0; i<array2.length; i++){
        $(array2[i]).show();
    }
}
});