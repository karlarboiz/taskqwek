$(document).ready(function () {
    $('#org-form').on('submit', function (event) {
      event.preventDefault(); // Prevent the default form submission

      $("#loader-container").show();
      $(".message").remove();
      $(".error-message").remove();

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
          
          const {message,isSuccess,errorMessage}=response;
          $('#org-form').prepend(`<p class="message">${message}</p>`)
          
          for (const [key,value] of Object.entries(errorMessage)) {
            $(`.org-field--${key}`)
            .append(`<p class="error-message">${value}</p>`)
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


    $.ajax({
      url:"/org/org-list",
      type: "GET",
      contentType: 'application/json',
      success: function (response) {
        $("#loader-container").show();
        const {leaderOrgs} = response;

        for (let element of leaderOrgs) {
           $("#org-tbody").append(`
             <tr>
            <th scope="row">${element.name}</th>
            <td>${element.description}</td>
            <td>${element.population}</td>
            <td>${element.population}</td>
            <td><a href="org-page/details/${element._id}" class="btn btn-secondary">Edit</a>
           </td>
          </tr>`)
        }

        $("#loader-container").hide();
      },
    })



  });