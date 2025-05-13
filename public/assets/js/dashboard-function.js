$(document).ready(function(){
    $.ajax({
        url:"/dashboard/data",
        type: "GET",
        contentType: 'application/json',
        success: function (response) {
        //   $("#loader-container").show();
        //   const {leaderOrgs} = response;
            console.log(response)
        //   for (let element of leaderOrgs) {
        //      $("#org-tbody").append(`
        //        <tr>
        //       <th scope="row">${element.name}</th>
        //       <td>${element.description}</td>
        //       <td>${element.population}</td>
        //       <td>${element.population}</td>
        //       <td><a href="org-page/details/${element._id}" class="btn btn-secondary">Edit</a>
        //      </td>
        //     </tr>`)
        //   }
  
          $("#loader-container").hide();
        },
      })

})