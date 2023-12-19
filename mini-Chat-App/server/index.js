const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
  },
});

io.on("connection", (socket)=>{
    console.log(`User has connect ${socket.id}`);

    socket.on("join_room", (data, username)=>
    {
      console.log(`User with id ${username} joined room ${data}`)
      socket.join(data);
    })
    socket.on("send_message", (messageData)=>{
      socket.to(messageData.room).emit("recive_message", messageData );
    })
    socket.on("disconnect", ()=> {
        console.log("User desonnected", socket.id)
    });
})

server.listen(3001, () => {
  console.log("Server is running...");
});
