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
        // location.reload();
        // $('.modal-btn-click').off('click');
    })
    // modal close

    $('.cancel-btn').on('click', function (e) {
        $('input').val('');
    })

    var btnIncreament = 18;
    var addIncreament = $('.add-btn-div').position().top + 20;
    $('.card-section').css('transform', 'translateY(0px)')
    // add btn click

    $('.add-btn-div').on('click', function (e) {

        $('.card-section').addClass('cloned');
        $('.minus-btn-div').removeClass('dsp-none');
        let cloneEle;
        if ($('.card-section').length == 1) {
            cloneEle = $('.card-section').clone();
        } else {
            cloneEle = $('.card-section').eq(0).clone();
        }
        $('.form-section .container').append(cloneEle.clone(true));
        $('.card-section:first-child').removeClass('cloned');
        let iValue = $('.card-section').length;
        let paddingBottomEle = parseInt($('.form-section.main').css('padding-bottom').replace('px', '')) + 15;
        $('.form-section.main').css('padding-bottom', paddingBottomEle);
        $('.card-section:nth-child(' + iValue + ')').css('transform', 'translateY(' + btnIncreament + 'px)');
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        if (mediaQuery.matches) {
            $('.add-btn-div').css('top', addIncreament - 10 + 'px');
            $('.minus-btn-div').css('top', addIncreament - 10 + 'px');
        } else {
            $('.add-btn-div').css('top', addIncreament + 'px');
            $('.minus-btn-div').css('top', addIncreament + 'px');
        }
        btnIncreament += 18;
        addIncreament += 18;


        // card id attribute data-id
        var cardInc = 0;
        let sideBarNav;
        $('.sideBar-cardClone').removeClass('i-dsp-none')
        if ($('.sideBar-cardClone .select-item') == 1) {
            sideBarNav = $('.sideBar-cardClone .select-item').clone();
        } else {
            sideBarNav = $('.sideBar-cardClone .select-item').eq(0).clone();
        }

        $('.sideBar-cardClone').append(sideBarNav);
        $('.card-section').each(function () {
            var newID = 'card-' + cardInc;
            $(this).attr('data-id', newID);
            $(this).find('.heading-title>.form-number').text(cardInc + 1)
            $('[data-id=' + newID + '] #change-img').addClass('dsp-none')
            $('[data-id=' + newID + '] .card-section-img').removeClass('inputFileUpload')
            $('[data-id=' + newID + '] #change-img').attr('src', '');
            cardInc++;
        })

        $('.sideBar-cardClone .select-item a').text(cardInc);
        $('.sideBar-cardClone .select-item a').each(function (selectEle) {
            $(this).text(selectEle + 1);
        })

        // sideclone bar
        Array.from($('.sideBar-cardClone .select-item')).forEach(function (sideBarEle) {
            $(sideBarEle).on('click', function (e) {
                $('.sideBar-cardClone .select-item').removeClass('active');
                if ($(this).find('a').text() == 1) {
                    $(this).parents('.form-section').find('.card-section[data-id=card-0]').addClass('comesForward');
                } else {
                    $(this).parents('.form-section').find('.card-section[data-id=card-0]').removeClass('comesForward');
                }
                $(this).addClass('active');
                let lengthNav = parseInt($('.sideBar-cardClone .select-item.active').find('a').text()) - 1;
                console.log(lengthNav);
                $('.card-section').removeClass('comesForward');
                $('.card-section').eq(lengthNav).addClass('comesForward');

                if (!$(this).is(':last-child')) {
                    $('.add-btn-div').addClass('dsp-none');
                    $('.minus-btn-div').addClass('dsp-none');
                } else {
                    $('.add-btn-div').removeClass('dsp-none');
                    $('.minus-btn-div').removeClass('dsp-none');
                }
            })
        })

        // input clear
        $('input').val('');

        $('.sideBar-cardClone .select-item').removeClass('active');
        $('.sideBar-cardClone .select-item:last-child').addClass('active');

    })

    // minus btn click
    $('.minus-btn-div').on('click', function (e) {

        addIncreament = $('.add-btn-div').position().top - 20;

        $('.card-section:last-child').remove();
        let dataIdVar = parseInt($('.card-section:last-child').attr('data-id').split('-')[1]) + 2

        Array.from($('.sideBar-cardClone .select-item')).forEach(function (selectItemEle) {
            if (dataIdVar - 1 == 1) {
                $('.sideBar-cardClone .select-item:first-child').removeClass('active');
                $('.add-btn-div').css('top', '70px');
                $('.minus-btn-div').addClass('dsp-none');
                $('.sideBar-cardClone').addClass('i-dsp-none');
            }
            if ($(selectItemEle).find('a').text() == dataIdVar) {
                $(selectItemEle).remove();
            }
        })
        $('.sideBar-cardClone .select-item:last-child').addClass('active');

        let paddingBottomEle = parseInt($('.form-section.main').css('padding-bottom').replace('px', '')) - 10;
        $('.form-section.main').css('padding-bottom', paddingBottomEle);
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        if (mediaQuery.matches) {
            $('.add-btn-div').css('top', addIncreament - 10 + 'px');
            $('.minus-btn-div').css('top', addIncreament - 10 + 'px');
        } else {
            $('.add-btn-div').css('top', addIncreament + 'px');
            $('.minus-btn-div').css('top', addIncreament + 'px');
        }

        addIncreament += 18;
        btnIncreament -= 18;
    })

    // form submit data into database
    $('.btn.submit-btn').on('click', function (e) {

        let doctorName = $('#inputDoctorName').val();
        let userEmail = $('#inputEmail').val();
        let userRegion = $('#inputRegion').val();
        let userHQ = $('#inputHQ').val();
        let userFsoName = $('#inputFSOName').val();
        let userMobileNumber = $('#inputDoctorNumber').val();
        let userImage = $('#change-img').attr('src');

        const image = URL.createObjectURL(new Blob([userImage], { type: 'text/plain' }));

        axios.post('http://localhost:4001/forms', {
            name: doctorName,
            email: userEmail,
            region: userRegion,
            hq: userHQ,
            fsoname: userFsoName,
            doctorNumber: userMobileNumber,
            image: image,
        })
            .then(function (response) {
                let data = response.data;
                if (data.data == 'successfully data saved') {
                    loaderShow(false);
                    alert(data.data);
                } else {
                    alert(error);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
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