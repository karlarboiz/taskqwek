export async function initTaskFunction(){
    $(document).ready(function(){
        $('#task-leader--container #task-form').change(function(e){
                console.log($("#project-options").val());

                $('#task-leader--container #task-form').submit();
        })
    })
}

