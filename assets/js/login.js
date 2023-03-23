$(document).ready(function () {

    fetch('http://localhost:3000/login')
        .then(response => response.json())
        .then(json => {
            $('.login-btn').on('click', function() {
                getLoginData(json)
            })
        });

    $('.signUp-btn').on('click', function (e) {
        loaderShow(true);

        fetch('http://localhost:3000/signUp', {
            method: "POST",
            body: JSON.stringify({
                'username': $('#inputUserName').val(),
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
                let responseData = json;
                if (responseData.message == true) {
                    loaderShow(false);
                    location.href = '/login.html';
                } else {
                    console.log('Please Fill All Details Again');
                }
            });
    })


    function getLoginData(data) {
        let getLoginDataVar = data.Signup;
        console.log(getLoginDataVar);
        getLoginDataVar.forEach(function(loginEleData) {
            console.log($('#inputEmail').val() == loginEleData.email);
            if ($('#inputEmail').val() == loginEleData.email) {
                console.log(loginEleData);
            }
        })
    }
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