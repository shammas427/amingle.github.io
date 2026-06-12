const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server,{
  cors:{
    origin:"*"
  }
});

io.on("connection",(socket)=>{

  console.log("User Connected");

  socket.on("chat-message",(msg)=>{

    socket.broadcast.emit(
      "chat-message",
      msg
    );

  });

  socket.on("disconnect",()=>{

    console.log("User Left");

  });

});

server.listen(3000,()=>{
  console.log("Running");
});
