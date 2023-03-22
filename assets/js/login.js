const { debug } = require("console");

$(document).ready(function () {


    fetch('http://localhost:3000/login')
        .then(response => response.json())
        .then(json => {
            $('.login-btn').on('click', function() {
                getLoginData(json)
            })
        });

    $('.signUp-btn').on('click', function (e) {

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
            .then(json => console.log(json));
    })


    function getLoginData(data) {
        let getLoginDataVar = data.Signup;
        console.log(getLoginDataVar);
    }
})