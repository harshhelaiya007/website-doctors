console.log('validation js');

// show success
function showSuccess(inputEle) {
    $(inputEle).parents('form').addClass('valid');
    $(inputEle).parents('form').removeClass('error');
    $(inputEle).addClass('valid');
    $(inputEle).removeClass('error');
    $(inputEle).parent().siblings().removeClass('show');
    $(inputEle).parent().siblings().find('p').text('');
    $(inputEle).parents('.form-group').removeClass('error-show');
    // $(inputEle).parents('.form-group').addClass('success');
}

// show error
function showError(inputEle, msg) {
    $(inputEle).parents('form').addClass('error');
    $(inputEle).parents('form').removeClass('valid');
    $(inputEle).addClass('error');
    $(inputEle).removeClass('valid');
    $(inputEle).parent().siblings().addClass('show');
    $(inputEle).parent().siblings().find('p').text(msg);
    $(inputEle).parents('.form-group').addClass('error-show');
    // $(inputEle).parents('.form-group').removeClass('success');
}

function showRequired(inputEle, requiredMsg, validationMsg) {
    if (inputEle.val() == '') {
        showError($(inputEle), requiredMsg);
    } else {
        showError($(inputEle), validationMsg);
    }
}

function buttonDisable(inputEle) {
    if (inputEle.hasClass('error') || inputEle.val() == '') {
        $('.btn.btn-color.submit-btn').prop('disabled', true);
        $('.btn.btn-color.signUp-btn').prop('disabled', true);
    } else {
        Array.from($('input.input-field')).forEach(function (ele) {
            if ($(ele).hasClass('valid')) {
                $('.btn.btn-color.submit-btn').prop('disabled', false);
                $('.btn.btn-color.signUp-btn').prop('disabled', false);
            } else {
                $('.btn.btn-color.submit-btn').prop('disabled', true);
                $('.btn.btn-color.signUp-btn').prop('disabled', true);
            }
        })
        // $('.btn.btn-color').prop('disabled', false);
    }
}

// $('input').on('input blur', function (e) {
//     buttonDisable($(this));
// })

// doctors name
$('#inputDoctorName, #inputUserName').on('input blur', function (e) {
    let docRegx = /^[a-zA-Z]+[a-zA-Z\s]+$/;
    let inputValue = e.target.value;
    buttonDisable($(this));
    if (!inputValue == '' && docRegx.test(inputValue)) {
        showSuccess($(this));
    } else {
        showRequired($(this), 'Name is Required.', 'Please Enter Valid Name.');
    }
})

// email
$('#inputEmail').on('input blur', function (e) {
    let emailRegx = /\S+@\S+\.\S+/;
    let inputValue = e.target.value;
    buttonDisable($(this));
    if (!inputValue == '' && emailRegx.test(inputValue)) {
        showSuccess($(this));
    } else {
        showRequired($(this), 'Email is Required.', 'Please Enter Valid Email Address.');
    }
})

// dob
$('#inputDob').on('input blur', function (e) {
    let dobRegx = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    let inputValue = e.target.value;
    buttonDisable($(this));
    if (!inputValue == '' && dobRegx.test(inputValue)) {
        showSuccess($(this));
    } else {
        showRequired($(this), 'Date of Birth is Required.', 'Please Enter Valid Date.');
    }
})

// region
$('#inputRegion').on('input blur keyup', function (e) {
    $(this).val($(this).val().replace(/[^a-z\s]/ig, ''));
    let regionRegx = /^[a-zA-Z]+[a-zA-Z\s]+$/;
    let inputValue = e.target.value;
    buttonDisable($(this));
    if (!inputValue == '' && regionRegx.test(inputValue)) {
        showSuccess($(this));
    } else {
        showError($(this), 'Region is Required', 'Please Enter Valid Region.');
    }
})

// HQ
$('#inputHQ').on('input blur', function (e) {
    let inputValue = e.target.value;
    buttonDisable($(this));
    if (!inputValue == '') {
        showSuccess($(this));
    } else {
        showError($(this), 'HQ is Required', 'Please Enter Valid HQ.');
    }
})

// FSO Name
$('#inputFSOName').on('input blur', function (e) {
    let inputValue = e.target.value;
    buttonDisable($(this));
    if (!inputValue == '') {
        showSuccess($(this));
    } else {
        showError($(this), 'FSO Name is Required', 'Please Enter Valid FSO Name.');
    }
})

// docots mobile
$('#inputDoctorNumber').on('input blur', function (e) {
    $(this).val($(this).val().replace((/[^0-9]/g), ''));
    let docNumberRegx = /^[0-9]*$/;
    let inputValue = e.target.value;
    buttonDisable($(this));
    if (!inputValue == '' && docNumberRegx.test(inputValue)) {
        showSuccess($(this));
    } else {
        showError($(this), 'Docots Number is Required', 'Please Enter Valid Docots Number.');
    }
})

// img
// $('#inputFile').on('click', function (e) {
//     let inputValue = e.target.value;
//     buttonDisable($(this));
//     if (!$('#change-img').attr('src') == '') {
//         showSuccess($(this))
//     } else {
//         showError($(this), 'Doctors Photo is Required', 'Please Select Doctors Photo.');
//     }
// })

// password
$('#inputPassword, #inputConfirmPassword').on('input blur', function (e) {
    let inputValue = e.target.value;
    buttonDisable($(this));
    if (!inputValue == '') {
        showSuccess($(this));
    } else {
        showError($(this), 'FSO Name is Required', 'Please Enter Valid FSO Name.');
    }
})

$(document).on("click", ":submit", function (e) {

    if ($('form').hasClass('error')) {
        e.preventDefault();
    }

})