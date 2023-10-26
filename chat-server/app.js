import express from "express";
const app = express()
import { Server } from "socket.io";
import {createServer} from 'http'


const users = [{}]
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*'
    }
})

io.on("connection", (socket)=>{
    console.log("a user is connected")

    socket.on('joined', ({user}, callback)=>{
        users[socket.id]= user
        console.log(`${user} has joined` )
        callback(socket.id);
        socket.broadcast.emit('userJoined', {
            user: "Admin:",
            message: `Welcome to the chat, ${users[socket.id]}`
        })
    })
    socket.on('chat', (payload)=>{
        console.log(payload)
        io.emit("chat", payload)
    })

    socket.on('disconnect', ()=>{
        socket.broadcast.emit('leave', {
            user: "Admin:",
            message: `${users[socket.id]} has left the chat`
        })
    })
})

server.listen(4500, ()=>{
    console.log("server is live on port 4500")
})