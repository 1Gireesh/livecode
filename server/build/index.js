"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const coderunner_1 = require("./coderunner");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)();
const socket_io_1 = require("socket.io");
const controler_1 = require("./controler");
const cors_1 = __importDefault(require("cors"));
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json());
let c = 0;
app.get("/", (req, res) => { res.send("works"); });
app.use("/run", coderunner_1.coderunner);
const io = new socket_io_1.Server(server, {});
(0, controler_1.controler)(io);
server.listen(8080, () => {
    console.log("http://localhost:8080/");
});
