$("#restart-form").validate({
    rules: {
        uname: {
            required: true
        },       
        old_psw: {
            required: true,          
        },
        new_psw: {
            required: true,
            minlength: 8          
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

function serializeSendingForm(form) {
    let formData = {
        username: form.uname.value,
        psw: form.old_psw.value
    };

    return formData;

}function serializeNewPassword(form) {
    let newPsw = {
        username: form.uname.value,
        newPassword: form.new_psw.value
    };
    return newPsw;
}

function apiFormHandler(form, event) {
    event.preventDefault();
    blockUi("#restart-form");

    const storedUser = Utils.get_from_localstorage('user');
    const enteredUsername = form.uname.value;

    if (storedUser && storedUser.username === enteredUsername) {
        editUser(serializeNewPassword(form));
    } else {
        showErrorMessage("Invalid username or not logged in");
        unblockUi("#restart-form");
    }
}

function editUser(newPassword) {
    RestClient.put("beckend/users/edit", JSON.stringify(newPassword), function(response) {
        showSuccessMessage("Password Changed");
        setTimeout(function() {
            window.location.href = '#login';
        }, 2000);
    }, function() {
        showErrorMessage("Failed to restart a password");
        unblockUi("#restart-form");
    });
}

