$(document).ready(function(){

    $('#invite-form').on('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission
  
        $("#loader-container").show();
        $(".message").remove();
        $(".error-message").remove();
  
        // Gather form data
        const data = {
          email: $('#email').val(),
          orgId: $('#org-name').val()

        };
        
        // Make an AJAX POST request
        $.ajax({
          url: '/invite/send', // Replace with your endpoint
          type: 'POST', 
          headers: {
              'X-CSRF-Token': $('#_csrf').val(), // CSRF token in header
            },
          contentType: 'application/json',
          data: JSON.stringify(data),
          success: function (response) {
            console.log(response)            
            const {message,isSuccess,errorMessage}=response;
            $('#invite-form').prepend(`<p class="error-message">${message}</p>`)
            
            // for (const [key,value] of Object.entries(errorMessage)) {
            //   $(`.org-field--${key}`)
            //   .append(`<p class="error-message">${value}</p>`)
            // }
          },
          error: function (xhr, status, error) {     
            console.error(error);
          },
          complete: function(){
              $("#loader-container").hide();
          }
        });
      });

})