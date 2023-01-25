import express from "express";
import http from "http";
import path from "path";
const app = express()
import { Server } from "socket.io";
import { controler } from "./controler";

const server = http.createServer(app);


// app.use((req, res, next) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
let c = 0;
app.get("/", (req, res) => { res.send("works") });

const io = new Server(server);

controler(io);


server.listen(8080, () => {
    console.log("http://localhost:8080/");
})