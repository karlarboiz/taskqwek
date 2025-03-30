$(document).ready(function(){
    // $(".child").draggable({
    //     revert: "invalid",  // Prevent snapping back on valid drop
    //     start: function(event, ui) {
    //         $(this).css("opacity", "1"); // Reduce opacity while dragging
    //     },
    //     stop: function(event, ui) {
    //         $(this).css("opacity", "1"); // Restore opacity after drop
    //     }
    // });
    
    // $(".parent").droppable({
    //     accept: ".child",
    //     drop: function(event, ui) {
    //         let $dragged = $(ui.draggable);
    
    //         // Move to the new parent with animation
    //         $dragged.css({ position: "relative", top: 0, left: 0 })
    //             .appendTo($(this))
    //             .hide()
    //             .fadeIn(300);
    
    //         // Adjust the spacing of all children in the new parent smoothly
    //         let children = $(this).find(".child");
    //         children.each(function(index) {
    //             $(this).animate({ marginTop: "5px" }, 300);
    //         });
    //     }
    // });


    $('#project-form').on('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission
  
        $("#project-creation--loader-container").show();

        if($(".message").length > 0) {
          $(".message").remove();
        } 
  
        // Gather form data
        const data = {
          name: $('#project-name').val(),
          description: $('#project-description').val(),
          deadline: $('#project-deadline').val(),
        };
        
        // Make an AJAX POST request
        $.ajax({
          url: '/project/create-project', // Replace with your endpoint
          type: 'POST', 
          headers: {
              'X-CSRF-Token': $('#_csrf').val(), // CSRF token in header
            },
          contentType: 'application/json',
          data: JSON.stringify(data),
          success: function (response) {

            const {isSuccess,message,errorResult}=response;
            console.log(response);
            // $('#org-form').prepend(`<p class="message">${message}</p>`)
            $("#project-form").prepend(`<div class="message
              main-message--${isSuccess ? "success": "failure"} ">${message}</div>`);
            for (const [key,value] of Object.entries(errorResult)) {
              $(`.project-field--${key}`)
              .append(`<p class="message error-message">${value}</p>`)
            }
          },
          error: function (xhr, status, error) {     
            console.error(error);
          },
          complete: function(){
            $("#project-creation--loader-container").hide();
          }
        });
      });
    
  
    
})