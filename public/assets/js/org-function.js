$(document).ready(function () {
    $('#org-form').on('submit', function (event) {
      event.preventDefault(); // Prevent the default form submission


      $("#loader-container").show();
      // Gather form data
      const data = {
        name: $('#org-name').val(),
        description: $('#org-description').val(),
        population: $('#org-population').val(),
      };

      // Make an AJAX POST request
      $.ajax({
        url: '/org/org-creation/json', // Replace with your endpoint
        type: 'POST', 
        headers: {
            'X-CSRF-Token': $('#_csrf').val(), // CSRF token in header
          },
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (response) {
          console.log(response);
        },
        error: function (xhr, status, error) {
          console.error(error);
        },
        complete: function(){
            
            $("#loader-container").hide();
        }
      });
    });
  });