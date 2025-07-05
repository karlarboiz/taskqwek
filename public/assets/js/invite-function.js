
  
  export default function initInviteFunction(){
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
            
            const {message,isSuccess,errorResult}=response;
            $('#invite-form').prepend(`<p class="${isSuccess ? "success-message": "error-message"}">${message}</p>`);

            for (const [key,value] of Object.entries(errorResult)) {
          
              $(`.invite-field--${key}`)
              .append(`<p class="error-message">${value}</p>`)
            }
            if(isSuccess){
              
              const modal = new bootstrap.Modal(document.getElementById('successModal'), {
                backdrop: 'static',    // Prevent close when clicking outside
                keyboard: false        // Prevent close on Esc key
              });
              
              modal.show();
            }
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
  }