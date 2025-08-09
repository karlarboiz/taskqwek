
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
        
          const {_isSuccess:isSuccess,_errorResult:errorMessage}=response;
          
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

        if(leaderOrgs.length !==0){
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
                      <h5 class="modal-title text-danger font-weight-bold" id="modal-org--item-${element._id}">DO YOU WANT TO DELETE THIS ORGANIZATION?</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div id="project-creation--loader-container" style="display: none;">
                            <div class="loader"></div>
                        </div>
                        <div class="modal-body">
                          <span class="text-info"> Status: ${!element.deleteFlg ? "Active" : "Inactive"}</span>
                          <p  class="text-dark">${element.name}</p>
                            
                        </div>

                        <div class="modal-footer">
                          <button type="button" id="form-project--button-reset" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button id="form-project--button-save--${element._id}" class="btn btn-danger text-white" value="${element._id}">Delete </button>
                        </div>

                    </div>
                </div>
          
              </td>
            </tr>`)

              /**
                 * 
                 * This is the part when deleting 
                 * org by clicking save button
                 */

              $(`#form-project--button-save--${element._id}`).on("click",function(e){
                // Make an AJAX POST request
                  $.ajax({
                    url: `/org/org-page/delete/${e.target.value}`, // Replace with your endpoint
                    type: 'PUT', 
                    headers: {
                        'X-CSRF-Token': $('#_csrf').val(), // CSRF token in header
                      },
                    contentType: 'application/json',
                    success: function (response) {
                      const {_isSuccess:isSuccess,_errorResult} = response;
                      
                      if(isSuccess){
                        location.reload();
                      }
                    },
                    error: function (xhr, status, error) {     
                      console.error(error);
                    },
                    complete: function(){
                      
                    }
                  });
              });

          }
        }else {
          $("#org-leader--page-container").after("<h5 class='mt-4'>No Org List Active</h5>")
        }

        $("#loader-container").hide();
      },
    })

    

 


  });


}