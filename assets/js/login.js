$(document).ready(function () {

    fetch('http://localhost:3000/login')
        .then(response => response.json())
        .then(json => {
            $('.login-btn').on('click', function (e) {
                // login data
                loaderShow(true);
                let getLoginDataVar = json.Signup;
                getLoginDataVar.forEach(function (loginEleData) {
                    if ($('#inputEmail').val() == loginEleData.email && $('#inputPassword').val() == loginEleData.password) {
                        if (json.message) {
                            localStorage.setItem('profileLogin',true);
                            console.log('working');
                            loaderShow(false);
                            location.href = '/index.html';
                        } else {
                            console.log('Please Fill All Details Again');   
                        }
                    }
                })
            })
        });

    $('.signUp-btn').on('click', function (e) {
        loaderShow(true);

        fetch('http://localhost:4001/register', {
            method: "POST",
            body: JSON.stringify({
                'userName': $('#inputUserName').val(),
                'email': $('#inputEmail').val(),
                'password': $('#inputPassword').val(),
                'confirmPassword': $('#inputConfirmPassword').val(),
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
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
