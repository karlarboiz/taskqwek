export default function initDashboardFunction(){
    $(document).ready(function(){
          $("#loader-container").show();
            $.ajax({
                url:"/dashboard/data",
                type: "GET",
                contentType: 'application/json',
                success: function (response) {
                
                    const { data, isSuccess } = response;
                
                    if (isSuccess) {
                        let $row = $("<div class='row justify-content-start mt-3'></div>");
                        $("#admin-dashboard").append($row);

                        for (const key in data) {
                            const count = data[key]["content"].length;
                            const title = data[key]["title"];
                            const url = data[key]["url"];
                            
                            const $col = $(`
                                <a href='${url}' class="col-md-4 mb-4">
                                    <div class="border rounded p-3 shadow-sm h-100 bg-light text-center">
                                        <h5>${title}</h5>
                                        <p class="display-6">${count}</p>
                                    </div>
                                </a>
                            `);
                            
                            $row.append($col);
                        }
                    }
                },
                complete: function(){
                    $("#loader-container").hide();
                }
            });
        });

}