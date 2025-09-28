export async function initTaskFunction(){
    $(document).ready(function(){
        $('#task-leader--container #task-form').change(function(e){
                const projectOption = $("#project-options").val();
                const orgOption = $("#organization-options").val();
                const memberOption = $("#member-options").val();
                if(projectOption || orgOption || memberOption){ 
                    $('#task-leader--container #task-form').submit();
                }       
        })
    })
}

