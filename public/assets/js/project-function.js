$(document).ready(function(){
    $(".child").draggable({
        revert: "invalid",  // Prevent snapping back on valid drop
        start: function(event, ui) {
            $(this).css("opacity", "1"); // Reduce opacity while dragging
        },
        stop: function(event, ui) {
            $(this).css("opacity", "1"); // Restore opacity after drop
        }
    });
    
    $(".parent").droppable({
        accept: ".child",
        drop: function(event, ui) {
            let $dragged = $(ui.draggable);
    
            // Move to the new parent with animation
            $dragged.css({ position: "relative", top: 0, left: 0 })
                .appendTo($(this))
                .hide()
                .fadeIn(300);
    
            // Adjust the spacing of all children in the new parent smoothly
            let children = $(this).find(".child");
            children.each(function(index) {
                $(this).animate({ marginTop: "5px" }, 300);
            });
        }
    });
    
  
    
})