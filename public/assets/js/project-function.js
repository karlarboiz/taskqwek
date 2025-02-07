$(document).ready(function(){

    $(".child").draggable({
        revert:true
    });

    $(".child--1").draggable({
        revert:true
    });

    $(".child--2").draggable({
        revert:true
    });

    $(".parent").droppable({
        accept: '.child',
        drop: function(event, ui) {
          $(this).append($(ui.draggable));
        }
      });
  

    $("#save-changes").click(function(){
        console.log("Helo here");
    })
    
})