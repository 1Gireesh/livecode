import { coderunner } from './coderunner';
import express from "express";
import http from "http";
import path from "path";
const app = express()
import { Server } from "socket.io";
import { controler } from "./controler";
import cors from "cors"

const server = http.createServer(app);

app.use(cors())
app.use(express.json())

// app.use((req, res, next) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
let c = 0;
app.get("/", (req, res) => { res.send("works") });
app.use("/run",coderunner)

const io = new Server(server);

controler(io);


server.listen(8080, () => {
    console.log("http://localhost:8080/");
})