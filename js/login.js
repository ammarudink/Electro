$("#login-form").validate({
    rules: {
        uname: {
            required: true
        },       
        psw: {
            required: true
        }
    }, 
    submitHandler: function(form, event) {
        apiFormHandler(form, event);
    }
});

function showSuccessMessage(message) {
    toastr.success(message);
}

function showErrorMessage(message) {
    toastr.error(message);
}

function blockUi(element) {
    $(element).block({
        message: '<div class="spinner-border text-primary" role="status"></div>',
        css: {
            backgroundColor: "transparent",
            border: "0",
        },
        overlayCSS: {
            backgroundColor: "#000",
            opacity: 0.25,
        },
    });
}

function unblockUi(element) {
    $(element).unblock({});
}

function serializeForm(form) {
    let formData = {
        username: form.uname.value,
        psw: form.psw.value
    };

    return formData;
}

function apiFormHandler(form, event) {
    event.preventDefault();
    blockUi("#login-form");
    let data = serializeForm(form);

    $.ajax({
        url: "beckend/auth/login",
        type: "POST",
        data: data,
        contentType: "application/json",
        dataType: "json",
        success: function(response) {
            if (response.token && response.username) {
                $("#login-form")[0].reset();
                showSuccessMessage("Login successful!");
                console.log("Login successful");

                Utils.set_to_localstorage('user', response);

                setTimeout(function() {
                    window.location.href = '#home';
                }, 2000);
            } else {
                showErrorMessage("Invalid username or password");
            }
        },
        error: function() {
            showErrorMessage("Failed to login");
        },
        complete: function() {
            unblockUi("#login-form");
        }
    });
    
}
