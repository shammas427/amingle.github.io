const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let waiting = null;

io.on("connection", (socket) => {
  if (waiting) {
    socket.partner = waiting;
    waiting.partner = socket;

    socket.emit("matched");
    waiting.emit("matched");

    waiting = null;
  } else {
    waiting = socket;
  }

  socket.on("message", (msg) => {
    if (socket.partner) {
      socket.partner.emit("message", msg);
    }
  });

  socket.on("disconnect", () => {
    if (waiting === socket) waiting = null;
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
