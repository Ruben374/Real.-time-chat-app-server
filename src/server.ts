import app from "./app";
const port = process.env.PORT;
import mongoose from "mongoose";
const dbuser = process.env.DBUSER;
const dbpass = process.env.DBPASSWORD;
import http from "http";
import { Server } from "socket.io";
const Message = require("./models/Messages.model");
const User = require("./models/Users.model");
const jwt = require("jsonwebtoken");

mongoose.set("strictQuery", false);
/////////////////////////////////////////////////////////////

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});
const onlineUsers: Array<any> = [];
io.on("connection", async (socket: any) => {
  console.log("user conected:", socket.id);
  /* 
  tratamento da conexão do usuario
   */
  socket.on("token", async (token: String) => {
    const { Credential } = jwt.verify(token, process.env.JWT_SECRET ?? "");
    const user = {
      id: socket.id,
      email: Credential,
    };
    onlineUsers.push(user);
    if (onlineUsers.length >= 2) {
      onlineUsers[1].email = "rubandre15@gmail.com";
      console.log(onlineUsers)
    }
    
  });
  /* 
  quando é emitida uma mensagem
   */
  socket.on("chat message", function (obj: any) {
    console.log("message: " + obj.body);
    console.log(obj);
    //broadcast message to everyone in port:5000 except yourself.
    const index = onlineUsers.findIndex(
      (user: any) => user.email === obj.receiver
    );
    //socket.broadcast.emit("received", obj);
    console.log(onlineUsers[index]);
    const receiverSocketId = onlineUsers[index].id;
    io.to(receiverSocketId).emit("received", obj);
    //save chat to the database
    let message = new Message({
      type: obj.type,
      body: obj.body,
      author: obj.author,
      receiver: obj.receiver,
      chatId: obj.chatId,
    });
    message.save();
  });
  /* 
  quando o usuario se desconecta do socket
   */
  socket.on("disconnect", function () {
    //console.log(`o usuario ${socket.id} saiu`);
    const index = onlineUsers.findIndex((user: any) => user.id === socket.id);
    onlineUsers.splice(index);
    console.log(onlineUsers);
  });
});
mongoose
  .connect(
    `mongodb+srv://${dbuser}:${dbpass}@cluster0.aab9zko.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    server.listen(port, () => {
      console.log("App listen in: ", port);
    });
    console.log("conectou ao banco");
  })
  .catch((err) => console.log(err));
