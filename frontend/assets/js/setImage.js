console.log('setImage.js');

function setImage(val) {
    if (val && val != "undefined") {
        var img = 'data:image/jpeg;base64,' + val + '';
        $('.modal-body .photo-upload-img').attr('src', img).removeClass('dsp-none');
        // cropper js
        let doctorImage = $('#cropperjs')[0];
        cropper = new Cropper(doctorImage, {
            aspectRatio: 16 / 9,
            width: 328,
            height: 399,
            viewMode: 0,
            minContainerWidth: 618,
            minContainerHeight: 458,
            minCanvasWidth: 618,
            minCanvasHeight: 458,
            minCropBoxWidth: 100,
            minCropBoxHeight: 100,
            background: true,
            movable: true,
            zoomable: false,
            cropBoxResizable: true,
        });
        // media query for cropperjs
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        if (mediaQuery.matches) {
            cropper.destroy();
            let doctorImage = $('#cropperjs')[0];
            cropper = new Cropper(doctorImage, {
                aspectRatio: 16 / 9,
                width: 325,
                height: 458,
                viewMode: 0,
                minContainerWidth: 325,
                minContainerHeight: 458,
                minCanvasWidth: 325,
                minCanvasHeight: 458,
                minCropBoxWidth: 100,
                minCropBoxHeight: 100,
                background: true,
                movable: true,
                zoomable: false,
                cropBoxResizable: true,
            });
        }
        // cropper js
        $('.modal-btn-click').click();
    }
}

// save button
$('.save-btn').on('click', function (e) {
    let croppedImageDataURL = cropper.getCroppedCanvas()
    // console.log(croppedImageDataURL);
    let croppedImg = croppedImageDataURL.toDataURL("image/jpeg");
    $('.card-section-img').addClass('inputFileUpload');
    $('.photo-upload-img').attr('src', croppedImg).removeClass('dsp-none');
    $('#staticBackdrop').modal('hide');
})
// save button