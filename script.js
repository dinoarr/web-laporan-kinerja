function captureModal() {
   var video = document.querySelector("#video");
   if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
         .getUserMedia({
            video: {
               facingMode: "environment",
            },
         })
         .then(function (stream) {
            video.srcObject = stream;
         })
         .catch(function (error) {
            console.log("Something went wrong!");
         });
   }
}

const videoElement = document.getElementById("video");

function flipCamera() {
   const constraints = {
      video: {
         facingMode:
            videoElement.srcObject.getVideoTracks()[0].getSettings()
               .facingMode === "user"
               ? "environment"
               : "user",
      },
   };

   videoElement.srcObject.getTracks().forEach((track) => {
      track.stop();
   });
   navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
         videoElement.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing camera:", err));
}

const flipButton = document.getElementById("flipButton");
flipButton.addEventListener("click", flipCamera);

var resultb64 = "";

var btnCapture = document.getElementById("btnCapture");
var btnResetCapture = document.getElementById("btnResetCapture");

function capture() {
   var canvas = document.getElementById("canvas");
   var video = document.getElementById("video");
   var videoQuery = document.querySelector("#video");

   var videoWidth = video.videoWidth;
   var videoHeight = video.videoHeight;

   var canvasSize = Math.min(videoWidth, videoHeight);
   canvas.width = canvasSize;
   canvas.height = canvasSize;

   var offsetX = (videoWidth - canvasSize) / 2;
   var offsetY = (videoHeight - canvasSize) / 2;

   canvas
      .getContext("2d")
      .drawImage(
         video,
         offsetX,
         offsetY,
         canvasSize,
         canvasSize,
         0,
         0,
         canvas.width,
         canvas.height
      );

   resultb64 = canvas.toDataURL();

   document.getElementById("image_activity").value = resultb64.split(",")[1];
   video.style.display = "none";
   canvas.style.display = "block";
   btnCapture.style.display = "none";
   btnResetCapture.style.display = "block";
   if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
         .getUserMedia({
            video: false,
         })
         .then(function (stream) {
            videoQuery.srcObject = stream;
         })
         .catch(function (error) {
            console.log("Something went wrong!");
         });
   }
}

document
   .getElementById("btnResetCapture")
   .addEventListener("click", function () {
      document.getElementById("image_activity").value = "";
      video.style.display = "block";
      canvas.style.display = "none";
      btnCapture.style.display = "block";
      btnResetCapture.style.display = "none";
      if (navigator.mediaDevices.getUserMedia) {
         navigator.mediaDevices
            .getUserMedia({
               video: true,
            })
            .then(function (stream) {
               video.srcObject = stream;
            })
            .catch(function (error) {
               console.log("Something went wrong!");
            });
      }
   });

document.addEventListener("DOMContentLoaded", function () {
   document
      .getElementById("imageFile")
      .addEventListener("change", function (event) {
         var file = event.target.files[0];
         var reader = new FileReader();
         reader.onloadend = function () {
            document.getElementById("image_activity").value =
               reader.result.split(",")[1];
         };
         reader.readAsDataURL(file);
      });
});
