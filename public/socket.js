const socket = io();

function sendMessage(){

const msg =
document.getElementById("message").value;

socket.emit(
"chat-message",
msg
);

}

socket.on(
"chat-message",
(msg)=>{

document
.getElementById("messages")
.innerHTML +=
`<p>${msg}</p>`;

});
