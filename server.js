const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let waitingUser = null;

io.on("connection", (socket) => {
  if (waitingUser) {
    socket.partner = waitingUser;
    waitingUser.partner = socket;
    socket.emit("matched");
    waitingUser.emit("matched");
    waitingUser = null;
  } else {
    waitingUser = socket;
  }

  socket.on("disconnect", () => {
    if (waitingUser === socket) waitingUser = null;
  });
});

server.listen(3000, () => console.log("Server running"));
