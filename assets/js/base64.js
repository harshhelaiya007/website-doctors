// console.log(" Base 64 JS ");

function convertToBase64(files, skipMetadata) {
  if (files instanceof FileList) {
    files = Array.from(files);
  } else if (!Array.isArray(files)) {
    return Promise.reject("Invalid file array");
  }

  function truncateMetadata(base64String) {
    if (skipMetadata === true) {
      var base64StrArr = base64String.split("base64,");
      return base64StrArr.length > 1 ? base64StrArr[1] : "";
    }
    return base64String;
  }

  return Promise.all(
    files.map(async (file) => {
      const dataUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result);
        };
      });
      return truncateMetadata(dataUrl);
    })
  );
}
