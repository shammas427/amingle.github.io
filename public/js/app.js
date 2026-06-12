const socket = io();

const messages =
document.getElementById("messages");

const input =
document.getElementById("messageInput");

socket.on("online",(count)=>{
document.getElementById("online")
.innerText = count + "+";
});

socket.on("chat-message",(msg)=>{

const div =
document.createElement("div");

div.innerHTML =
"👤 Stranger: " + msg;

messages.appendChild(div);

messages.scrollTop =
messages.scrollHeight;

});

function sendMessage(){

const msg =
input.value;

if(!msg) return;

socket.emit(
"chat-message",
msg
);

const div =
document.createElement("div");

div.innerHTML =
"🙂 You: " + msg;

messages.appendChild(div);

input.value = "";

messages.scrollTop =
messages.scrollHeight;

}

function nextUser(){

messages.innerHTML =
"<div>🔄 Finding new stranger...</div>";

setTimeout(()=>{

messages.innerHTML =
"<div>✅ Connected to stranger</div>";

},2000);

}

async function startChat(){

try{

const stream =
await navigator.mediaDevices.getUserMedia({
video:true,
audio:true
});

document.getElementById("localVideo")
.srcObject = stream;

}catch(err){

alert("Camera permission denied");

}

}

function reportUser(){

alert("User Reported");

}
