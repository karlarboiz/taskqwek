export async function initTaskFunction(){
    $(document).ready(function(){
        $('#task-leader--container #task-form').change(function(e){
                console.log($("#organization-options").val());
        })
    })
}

