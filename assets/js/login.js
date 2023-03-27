$(document).ready(function () {

    // account creation
    $('.signUp-btn').on('click', async function (e) {
        loaderShow(true);
        let userName = $('#inputUserName').val();
        let userEmail = $('#inputEmail').val();
        let userRegion = $('#inputRegion').val();
        let userHQ = $('#inputHQ').val();
        let userFsoname = $('#inputFSOName').val();
        let userPassword = $('#inputPassword').val();

        axios.post('http://localhost:4001/register', {
            username: userName,
            email: userEmail,
            region: userRegion,
            hq: userHQ,
            fsoname: userFsoname,
            password: userPassword
        })
            .then(function (response) {
                let data = response.data;
                if (data.registerd) {
                    loaderShow(true);
                    location.href = '/login.html';
                } else {
                    alert(error);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    })

    // login
    $('.login-btn').on('click', async function (e) {
        loaderShow(true);
        let userEmail = $('#inputEmail').val();
        let userPassword = $('#inputPassword').val();

        axios.post('http://localhost:4001/login', {
            email: userEmail,
            password: userPassword
        })
            .then(function (response) {
                let data = response.data;
                localStorage.setItem('profileLogin',JSON.stringify(data));
                location.href = '/index.html';
                loaderShow(false)
            })
            .catch(function (error) {
                console.log(error);
            });
    })


    // password click signup
    $('.signup.login-box .password-icon-div').on('click', function (e) {
        if ($(this).parent().find('input').attr('type') && $(this).parents('.form-group').prev().find('input').attr('type') == 'password') {
            $(this).parent().find('input').attr('type', 'text');
            $(this).parents('.form-group').prev().find('input').attr('type', 'text');
        } else {
            $(this).parent().find('input').attr('type', 'password');
            $(this).parents('.form-group').prev().find('input').attr('type', 'password')
        }
    })

    // password check for login
    $('.login-box .password-icon-div').on('click', function (e) {
        if ($(this).parent().find('input').attr('type') == 'password') {
            $(this).parent().find('input').attr('type', 'text');
        } else {
            $(this).parent().find('input').attr('type', 'password');
        }
    })
})

function loaderShow(bool) {
    if (bool) {
        $('.navbar.navbar-expand-lg').addClass('dsp-none');
        $('.form-section').addClass('dsp-none');
        $('.lds-dual-ring').addClass('active');
    } else {
        $('.navbar.navbar-expand-lg').removeClass('dsp-none');
        $('.form-section').removeClass('dsp-none');
        $('.lds-dual-ring').removeClass('active');
    }
}
