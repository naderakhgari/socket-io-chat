import express from "express";
import http from "http";
const app = express();
const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server);
const port = 3001;

server.listen(port, () => {
  console.log(`server is listening to the port: ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/javascript", (req, res) => {
  res.sendFile(__dirname + "/public/javascript.html");
});

app.get("/react", (req, res) => {
  res.sendFile(__dirname + "/public/react.html");
});

app.get("/nodejs", (req, res) => {
  res.sendFile(__dirname + "/public/nodejs.html");
});

const tech = io.of('/tech')

tech.on("connection", (socket) => {
  socket.on('join', (data)=>{
    socket.join(data.room)
    tech.in(data.room).emit('chat message',`New user joined ${data.room} room!`)
  })
  socket.on("chat message", (data) => {
    tech.in(data.room).emit("chat message", data.msg);
  });

  socket.on('disconnect', ()=>{
    tech.emit('chat message', 'User disconnected!')
  })
});
