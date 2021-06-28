const select = e.target.files[0];
var MIMEType = select.type;
console.log(MIMEType);
const render = new FileReader();
render.readAsBinaryString(select);
// render.readAsDataURL(select);

render.onloadend = function (readerEvt) {
  // This is done just for the proof of concept
  var binaryString = readerEvt.target.result;
  var base64 = btoa(binaryString);
  var blobfile = atob(base64);

  window.blobFromBlobFile = b64toBlob(base64, MIMEType, 512);
  window.blobURL = URL.createObjectURL(window.blobFromBlobFile);
  console.log(window.blobURL);

  const Photo = { src: "", date: "", name: "" };
  Photo.src = window.blobURL;
  // console.log(render.result.width)
  Photo.date = CurrentTime;
  Photo.name = `${usernameCapital} ${lastnameCapital}`;
  console.log(Photo.src);
  // {
  //   src:window.blobURL,
  //   date:CurrentTime,
  //   name: `${usernameCapital} ${lastnameCapital}`
  // }

  console.log(Photo);
  duplicate[Index].photos.push({
    src:window.blobURL,
    date:CurrentTime,
    name: `${usernameCapital} ${lastnameCapital}`
  });
  resp.photos.push({
    src:window.blobURL,
    date:CurrentTime,
    name: `${usernameCapital} ${lastnameCapital}`
  });
  // uploadedPhoto.push(Photo);
  console.log(uploadedPhoto)
  
  
  localStorage.setItem(`Users`, JSON.stringify(duplicate));
  localStorage.setItem("Active_User", JSON.stringify(resp));
  setUploadedPhoto([...uploadedPhoto,{
    src:window.blobURL,
    date:CurrentTime,
    name: `${usernameCapital} ${lastnameCapital}`
  }]);
  console.log(uploadedPhoto)
 
  
  
  // localStorage.setItem("Users", JSON.stringify(duplicate));
};
//////////////////////////////////////////////////////////
 
      // localStorage.setItem("Users", JSON.stringify(duplicate));
    

    // render.onloadend = () => {
    //   const Photo = { src: "", date: "", name: "" };
    //   const url = render.result;
    //   Photo.src = render.result;
    //   // console.log(render.result.width)
    //   Photo.date = CurrentTime;
    //   Photo.name = `${usernameCapital} ${lastnameCapital}`;
    //   console.log(Photo.src);

    //   console.log(Photo);
    //   duplicate[Index].photos.push(Photo);
    //   resp.photos.push(Photo);

    //   localStorage.setItem("Active_User", JSON.stringify(resp));
    //   localStorage.setItem(`Users`, JSON.stringify(duplicate));
    //   setUploadedPhoto([...uploadedPhoto, Photo]);
    //   // localStorage.setItem("Users", JSON.stringify(duplicate));
    // };
    // }

function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || "";
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
}