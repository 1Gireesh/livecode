"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controler = void 0;
const userIdNameMap = {};
const userIdRoomMap = {};
const roomCodeMap = {};
const roomAdminMap = {};
function join(data, socket, io) {
    userIdNameMap[socket.id] = data.username;
    socket.join(data.id);
    userIdRoomMap[socket.id] = data.id;
    if (!roomAdminMap[data.id]) {
        roomAdminMap[data.id] = data.username;
    }
    let clients = Array.from(io.sockets.adapter.rooms.get(data.id) || []).map((socketId, i) => ({
        socketId,
        username: userIdNameMap[socketId],
        admin: roomAdminMap[data.id],
    }));
    socket.emit("prevcode", roomCodeMap[data.id]);
    clients.forEach(({ socketId }) => io.to(socketId).emit("joined", {
        socketId,
        username: data.username,
        clients,
        admin: userIdNameMap[roomAdminMap[data.id]],
    }));
}
function leave(socket, io) {
    const rooms = Array.from(socket.rooms);
    rooms.forEach((roomId) => {
        socket
            .in(roomId)
            .emit("disconnected", { id: socket.id, uname: userIdNameMap[socket.id] });
    });
    delete userIdNameMap[socket.id];
    socket.leave(userIdRoomMap[socket.id]);
}
function type(data, socket, io) {
    roomCodeMap[data.id] = data.code;
    Array.from(io.sockets.adapter.rooms.get(data.id) || []).forEach((socket) => {
        io.to(socket).emit("typed", Object.assign({}, data));
    });
}
function readOnly(data, socket, io) {
    console.log(userIdNameMap[data.userId], data.userId);
    Array.from(io.sockets.adapter.rooms.get(data.room) || []).forEach((socket) => {
        if (socket == data.userId) {
            if (roomAdminMap[data.room] == data.username)
                io.to(socket).emit("nowrite", true, userIdNameMap[socket]);
            else
                io.to(socket).emit("nowrite", false, userIdNameMap[socket]);
        }
    });
}
function clear(id, socket, io) {
    Array.from(io.sockets.adapter.rooms.get(id) || []).forEach((socket) => {
        io.to(socket).emit("typed", "");
    });
    roomCodeMap[id] = "";
}
let sc = 0;
function controler(io) {
    io.on("connection", (socket) => {
        socket.on("join", (data) => join(data, socket, io));
        socket.on("disconnecting", () => leave(socket, io));
        socket.on("type", (data) => type(data, socket, io));
        socket.on("readonly", (data) => readOnly(data, socket, io));
        socket.on("clear", (data) => clear(data, socket, io));
    });
}
exports.controler = controler;
