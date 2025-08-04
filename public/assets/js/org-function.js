
export default function initOrgFunction(){

  $(document).ready(function () {
   
  /**
   * 
   * This is the leader part of the function
   */
    $('#create-org--form').on('submit', function (event) {
      event.preventDefault(); // Prevent the default form submission
      $("#loader-container").show();
  
      $(".error-message").remove();

      console.log($('#project-options').val());
      // Gather form data
      const data = {
        name: $('#org-name').val(),
        description: $('#org-description').val(),
        project: $('#project-options').val(),
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
        
          const {isSuccess,errorMessage}=response;
          
          if(!isSuccess){
            for (const [key,value] of Object.entries(errorMessage)) {
              $(`#create-org--form .org-input--${key}`)
              .append(`<p class="error-message">${value}</p>`)
            }
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
      success: function(response) {
        $("#loader-container").show();
        const {leaderOrgs} = response;

        $("#org-leader--page-container").after(`<table class="table mt-4"> 
            <thead>
              <tr>
                <th scope="col">Org Name</th>
                <th scope="col">Description</th>
                <th scope="col">Population</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>

            <tbody id="org-tbody">

            </tbody>
          </table>`)

        for (let element of leaderOrgs) {
           $("#org-tbody").append(`
             <tr>
            <th scope="row">${element.name}</th>
            <td>${element.description}</td>
            <td>${element.population}</td>
           
            <td><a href="org-page/details/${element._id}" class="btn btn-secondary">Edit</a>
            <td>
            <button class="btn-org--${element._id} btn btn-danger"
            data-bs-toggle="modal" data-bs-target="#modal-org--item-${element._id}">🗑️</button>
              

            <div class="modal fade" id="modal-org--item-${element._id}" tabindex="-1" aria-labelledby="modal-org--item-${element._id}">
              <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                  <div class="modal-content">
                      <div class="modal-header">
                     <h5 class="modal-title text-danger font-weight-bold" id="modal-org--item-${element._id}">Do you want to delete this Project?</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div id="project-creation--loader-container" style="display: none;">
                          <div class="loader"></div>
                      </div>
                      <div class="modal-body">
                        <p class="text-dark">${element.name}</p>
                          
                      </div>

                      <div class="modal-footer">
                        <button type="button" id="form-project--button-reset" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <a href="org/org-page/details/${element._id}/delete" class="btn btn-primary">Save </a>
                      </div>

                  </div>
              </div>
        
            </td>
          </tr>`)
        }

        $("#loader-container").hide();
      },
    })

    /**
   * 
   * This is the member part of the function
   */

    $('#org-member--join').on('submit', function (event) {
      event.preventDefault(); // Prevent the default form submission

      $("#loader-container").show();
      $(".message").remove();
      $(".error-message").remove();
      $("#org-member--join_input").css("border-color", "none");
   
      const data = {
        otpCode: $('#org-member--join_input').val(),

      };
   
      // Make an AJAX POST request
      $.ajax({
        url: '/member/join-org/json', // Replace with your endpoint
        type: 'POST', 
        headers: {
            'X-CSRF-Token': $('#_csrf').val(), // CSRF token in header
          },
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (response) {
          
          const {message,isSuccess,errorMessage}=response;
          
          $('#org-member--join').prepend(`<p class="error-message">${message}</p>`)
          $("#org-member--join_input").css("border-color", "red");
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
  });
}