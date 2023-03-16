function setImage(val) {
    if (val && val != "undefined") {
        var img = 'data:image/jpeg;base64,' + val + '';
        $('.modal-body .photo-upload-img').attr('src', img).removeClass('dsp-none');
        // cropper js
        let doctorImage = $('.photo-upload-img')[0];
        const cropper = new Cropper(doctorImage, {
            aspectRatio: 16 / 9,
            width: 328,
            height: 399,
            viewMode: 0,
            minContainerWidth: 618,
            minContainerHeight: 458,
            minCanvasWidth : 618,
            minCanvasHeight :458,
            minCropBoxWidth: 100,
            minCropBoxHeight: 100,
            background: true,
            movable: true,
            zoomable: false,
            cropBoxResizable: true,
        });
        // cropper js
        $('.modal-btn-click').click();
    }
}