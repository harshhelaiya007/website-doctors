$(document).ready(function () {

    // air datepicker
    new AirDatepicker('#inputDob', {
        locale: {
            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            today: 'Today',
            clear: 'Clear',
            dateFormat: 'dd/MM/yyyy',
            timeFormat: 'hh:mm aa',
            firstDay: 0
        },
    });
    // air datepicker

    $('.input-field').on('click input', function (e) {
        $(this).prev().addClass('input-focus')
        if (e.target.value == '') {
            $(this).prev().removeClass('input-active');
        } else {
            $(this).prev().addClass('input-active');
        }
    })

    $('.input-field').on('blur', function (e) {
        if (e.target.value == '') {
            $(this).prev().removeClass('input-focus')
            $(this).prev().removeClass('input-active')
        } else {
            $(this).prev().addClass('input-active')
        }
    })

    $('#inputFile').on('input', function (e) {
        console.log(this.value);
        var file = this.files;
        console.log(file);
        convertToBase64(file, true).then(function (data) {
            localStorage.setItem("profileImage", data)
            console.log(data);
            profileBase64 = data;
            setImage(profileBase64);
        }).catch(function (er) {
            console.error(er);
        })
        // if (!e.target.value == '') {
        //     $(this).parents('.card-section-img').addClass('inputFileUpload')
        //     $(this).parent().addClass('dsp-none');
        // }
    })

    // dataTable
    // $('#example').DataTable();
    // dataTable

    // modal close
    $('.modal-close-btn').on('click', function () {
        location.reload();
    })
    // modal close

    $('.cancel-btn').on('click', function (e) {
        $('input').val('');
    })


    let btnIncreament = 18;
    let addIncreament = $('.add-btn-div').position().top + 20;
    $('.card-section').css('transform','translateY(0px)')
    $('.add-btn-div').on('click', function (e) {
        $('.card-section').addClass('cloned');
        let cloneEle;
        if ($('.card-section').length == 1) {
            cloneEle = $('.card-section').clone();
        } else {
            cloneEle = $('.card-section').eq(0).clone();
        }
        $('.form-section .container').append(cloneEle.clone(true));
        $('.card-section:first-child').removeClass('cloned');
        let iValue = $('.card-section').length;
        $('.card-section:nth-child('+iValue+')').css('transform','translateY('+btnIncreament+'px)');
        $('.add-btn-div').css('top',addIncreament+'px');
        btnIncreament+=18;
        addIncreament+=18;
    })

})