$(document).ready(function () {

    $('.signUp-btn').on('click', function (e) {
        loaderShow(true);
        let userName = $('#inputUserName').val();
        let userEmail = $('#inputEmail').val();
        let userRegion = $('#inputRegion').val();
        let userHQ = $('#inputHQ').val();
        let userFsoname = $('#inputFSOName').val();
        let userPassword = $('#inputPassword').val();

        requestObj = {
            "username": userName,
            "email": userEmail,
            "region": userRegion,
            "hq": userHQ,
            "fsoname": userFsoname,
            "password": userPassword,
            "confirmPassword": userPassword
        }

        console.log(requestObj);

        fetch('http://localhost:4001/register', {
            method: "POST",
            body: JSON.stringify(requestObj)
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                // let responseData = json;
                // if (responseData.message == true) {
                //     loaderShow(false);
                //     location.href = '/login.html';
                // } else {
                //     console.log('Please Fill All Details Again');
                // }
            });
    })


    // password click
    $('.password-icon-div').on('click', function (e) {
        if ($(this).parent().find('input').attr('type') && $(this).parents('.form-group').prev().find('input').attr('type') == 'password') {
            $(this).parent().find('input').attr('type', 'text');
            $(this).parents('.form-group').prev().find('input').attr('type', 'text');
        } else {
            $(this).parent().find('input').attr('type', 'password');
            $(this).parents('.form-group').prev().find('input').attr('type', 'password')
        }
    })
})

function loaderShow(bool) {
    if (bool) {
        $('.navbar.navbar-expand-lg').addClass('dsp-none');
        $('.form-section').addClass('dsp-none');
        $('.lds-dual-ring').addClass('active');
    } else {
        $('.navbar.navbar-expand-lg').addClass('dsp-none');
        $('.form-section').addClass('dsp-none');
        $('.lds-dual-ring').addClass('active');
    }
}
