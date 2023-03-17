console.log('validation js');

// show success
function showSuccess(inputEle) {
    $(inputEle).addClass('valid');
    $(inputEle).parent().siblings().removeClass('show');
    $(inputEle).parent().siblings().find('p').text('');
    $(inputEle).parents('.form-group').removeClass('error-show');
    // $(inputEle).parents('.form-group').addClass('success');
}

// show error
function showError(inputEle, msg) {
    $(inputEle).addClass('error');
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
        $('.btn.btn-color').prop('disabled', true);
    } else {
        $('.btn.btn-color').prop('disabled', false);
    }
}

// $('input').on('input blur', function (e) {
//     buttonDisable($(this));
// })

// doctors name
$('#inputDoctorName').on('input blur', function (e) {
    let docRegx = /^[a-zA-Z]+[a-zA-Z\s]+$/;
    let inputValue = e.target.value;
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
    if (!inputValue == '' && regionRegx.test(inputValue)) {
        showSuccess($(this));
    } else {
        showError($(this), 'Region is Required', 'Please Enter Valid Region.');
    }
})

// HQ
$('#inputHQ').on('input blur', function (e) {
    let inputValue = e.target.value;
    if (!inputValue == '') {
        showSuccess($(this));
    } else {
        showError($(this), 'HQ is Required', 'Please Enter Valid HQ.');
    }
})

// FSO Name
$('#inputFSOName').on('input blur', function (e) {
    let inputValue = e.target.value;
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
    if (!inputValue == '' && docNumberRegx.test(inputValue)) {
        showSuccess($(this));
    } else {
        showError($(this), 'Docots Number is Required', 'Please Enter Valid Docots Number.');
    }
})