export default function initVerificationFunction(){
    $(document).ready(function(){

        // Auto-move to next or previous box
        $(".code-box").on("input", function() {
            this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); // Allow only A-Z, 0-9
            if (this.value.length === 1) {
            $(this).next(".code-box").focus();
            }
        });

        $(".code-box").on("keydown", function(e) {
            if (e.key === "Backspace" && this.value === "") {
            $(this).prev(".code-box").focus();
            }
        });

        // Handle paste (allow alphanumeric)
        $(".code-box").first().on("paste", function(e) {
            e.preventDefault();
            let pasteData = (e.originalEvent || e).clipboardData.getData("text").trim();
            let chars = pasteData.replace(/[^A-Za-z0-9]/g, '').toUpperCase().split("").slice(0, 6); // Keep letters + numbers

            $(".code-box").each(function(i) {
            $(this).val(chars[i] || "");
            });

            // Focus next empty
            let firstEmpty = $(".code-box").filter(function(){ return !this.value; }).first();
            if (firstEmpty.length) {
            firstEmpty.focus();
            } else {
            $(".code-box").last().focus();
            }
        });

        // Form validation
        $("#org-member--join").on("submit", function(e) {
            e.preventDefault();

            let code = "";
            let allFilled = true;

            $(".code-box").each(function(){
            if ($(this).val().trim() === "") {
                allFilled = false;
            }
            code += $(this).val();
            });

           

            $("#org-member--join .alert--placeholder").empty();

        

            const alertTemplatePartOne = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
               
               
            `;

            const alertTemplatePartTwo = `
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `;
            if (!allFilled) {
                const combinedTemplate = alertTemplatePartOne + "Please enter all 6 characters of the code." + alertTemplatePartTwo;

                $("#org-member--join .alert--placeholder").append(
                        combinedTemplate
                );
            return;
            }

            // Make an AJAX POST request
            $.ajax({
            url: '/member/join-org/json', // Replace with your endpoint
            type: 'POST', 
            headers: {
                'X-CSRF-Token': $('#_csrf').val(), // CSRF token in header
                },
            contentType: 'application/json',
            data: JSON.stringify({otpCode:code}),
            success: function (response) {
                
                console.log(response)
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