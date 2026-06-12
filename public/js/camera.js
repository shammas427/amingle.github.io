const video =
document.getElementById("localVideo");

navigator.mediaDevices
.getUserMedia({
video:true,
audio:true
})
.then(stream=>{
video.srcObject = stream;
});
