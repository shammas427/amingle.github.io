require("dotenv").config();

const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
cors: {
origin: "*"
}
});

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
res.sendFile(
path.join(__dirname, "public", "index.html")
);
});

let onlineUsers = 0;

io.on("connection", (socket) => {

onlineUsers++;

io.emit("online-users", onlineUsers);

console.log("User Connected");

socket.on("chat-message", (message) => {

```
io.emit("chat-message", {
  text: message,
  time: new Date().toLocaleTimeString()
});
```

});

socket.on("disconnect", () => {

```
onlineUsers--;

io.emit("online-users", onlineUsers);

console.log("User Disconnected");
```

});

});

server.listen(PORT, () => {

console.log(
`Server Running On Port ${PORT}`
);

});
