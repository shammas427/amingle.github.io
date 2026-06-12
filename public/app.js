const socket = io();

const messages =
document.getElementById("messages");

const input =
document.getElementById("messageInput");

/* ======================
   CAMERA AUTO START
====================== */

async function startCamera() {

  try {

    const stream =
    await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });

    document.getElementById(
      "localVideo"
    ).srcObject = stream;

  } catch (err) {

    alert(
      "Camera permission denied"
    );

    console.log(err);

  }

}

window.onload = () => {

  startCamera();

  updateOnline();

};

/* ======================
   ONLINE USERS
====================== */

socket.on("online-users", (count) => {

  const online =
  document.getElementById("online");

  if (online) {
    online.innerText =
    count + "+";
  }

});

/* ======================
   CHAT RECEIVE
====================== */

socket.on("chat-message", (data) => {

  const div =
  document.createElement("div");

  div.innerHTML =
  "👤 Stranger: " +
  data.text;

  messages.appendChild(div);

  messages.scrollTop =
  messages.scrollHeight;

});

/* ======================
   SEND MESSAGE
====================== */

function sendMessage() {

  const msg =
  input.value;

  if (!msg) return;

  socket.emit(
    "chat-message",
    msg
  );

  const div =
  document.createElement("div");

  div.innerHTML =
  "🙂 You: " +
  msg;

  messages.appendChild(div);

  input.value = "";

  messages.scrollTop =
  messages.scrollHeight;

}

/* ======================
   NEXT USER
====================== */

function nextUser() {

  messages.innerHTML =
  "<div>🔄 Finding stranger...</div>";

  setTimeout(() => {

    messages.innerHTML +=
    "<div>✅ Connected</div>";

  }, 2000);

}

/* ======================
   REPORT USER
====================== */

function reportUser() {

  alert(
    "🚩 User Reported"
  );

}

/* ======================
   FAKE ONLINE COUNT
====================== */

function updateOnline() {

  const users =
  Math.floor(
    Math.random() * 5000
  ) + 10000;

  const online =
  document.getElementById(
    "online"
  );

  if (online) {

    online.innerHTML =
    users + "+";

  }

}

setInterval(
  updateOnline,
  5000
);
