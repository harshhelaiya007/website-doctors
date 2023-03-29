$(document).ready(function () {

    var profileLogin = localStorage.getItem('profileLogin');
    profileLogin = JSON.parse(localStorage.getItem('profileLogin'));

    if (!profileLogin == "") {

        if (profileLogin.admin) {
            $('.mobile-d-flex .nav-item').eq(1).removeClass('dsp-none');
            $('.mobile-d-flex .nav-item').eq(2).addClass('dsp-none');
        } else {
            var authToken = profileLogin.token;
            var userDetails = profileLogin.user.user;
            var userRegion = userDetails.region;
            var userHQ = userDetails.hq;
            var userFsoName = userDetails.fsoname;
        }

        $('.nav-item.dropdown').removeClass('dsp-none');
        $('.mobile-d-flex .nav-item:last-child').addClass('dsp-none');
        $('.mobile-d-flex .nav-item').eq(0).removeClass('dsp-none');
    } else {
        if (window. location. href.split('/')[3] == 'index.html') {
            window.open('/login.html','_self')
        } else {
            window.open('','_self');
        }
        console.log('Not Login Try Again');
        $('.nav-item.dropdown').addClass('dsp-none');
        $('.mobile-d-flex .nav-item').eq(0).addClass('dsp-none');
        $('.mobile-d-flex .nav-item:last-child').removeClass('dsp-none');
    }

    $('.dropdown-item').on('click', function (e) {
        location.href = '/login.html';
        localStorage.setItem('profileLogin', '')
    })

    $('#inputRegion').prev().addClass('input-focus input-active')
    $('#inputHQ').prev().addClass('input-focus input-active')
    $('#inputFSOName').prev().addClass('input-focus input-active')
    $('#inputRegion').val(userRegion);
    $('#inputHQ').val(userHQ);
    $('#inputFSOName').val(userFsoName);

    $(".dropdown-menu .dropdown-item").on('click', function (e) {
        loaderShow(true);
        axios.post('/logout', {
            email: userEmail,
            token: authToken
        })
            .then(function (response) {
                if (response.logout) {
                    localStorage.setItem('profileLogin', '');
                    location.href = '/signup.html';
                    loaderShow(false);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    })

})