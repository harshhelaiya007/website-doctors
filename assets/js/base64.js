// console.log(" Base 64 JS ");

function convertToBase64(files, skipMetadata) {
    // console.log("in convert");
    // console.log(files);
    // console.log(skipMetadata);
    if ((files instanceof FileList)) {
        files = Array.from(files);
    } else if (!Array.isArray(files)) {
        return new Promise(function (resolve, reject) {
            reject("Invalid file array");
        });
    };


    function truncateMetadata(base64String) {
        if (skipMetadata === true) {
            var base64StrArr = String(base64String).split("base64,");
            return base64StrArr.length > 1 ? base64StrArr[1] : "";
        }
        return base64String;
    }
    
    return new Promise(function (resolve, reject) {
        var filesLoadCount = 0;
        var fileArray = new Array(files.length);
        files.forEach(function (file, index) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                fileArray[index] = truncateMetadata(reader.result);
                filesLoadCount++;
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        });
        var intervalId;
        intervalId = setInterval(function () {
            if (filesLoadCount === fileArray.length) {
                resolve(fileArray);
                clearInterval(intervalId);
            }
        }, 500);
    });
}