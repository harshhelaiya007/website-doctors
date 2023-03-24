$(document).ready(function() {

    var profileLogin = localStorage.getItem('profileLogin');
    if (profileLogin) {
        $('.nav-item.dropdown').removeClass('dsp-none');
        $('.mobile-d-flex .nav-item:last-child').addClass('dsp-none');
    } else {
        console.log('Not Login Try Again');
        $('.nav-item.dropdown').addClass('dsp-none');
        $('.mobile-d-flex .nav-item:last-child').removeClass('dsp-none');
    }

    $('.dropdown-item').on('click', function(e) {
        location.href = '/login.html';
        localStorage.setItem('profileLogin','')
    })

})