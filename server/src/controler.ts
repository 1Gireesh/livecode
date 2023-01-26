import { Server, Socket } from "socket.io";

const userIdNameMap: { [key: string]: string } = {};
const userIdRoomMap: { [key: string]: string } = {};

function join(data: { id: string, username: string }, socket: Socket, io: Server) {
    userIdNameMap[socket.id] = data.username;
    socket.join(data.id);
    userIdRoomMap[socket.id] = data.id;
    let clients = Array
        .from(io.sockets.adapter.rooms.get(data.id) || [])
        .map((socketId, i) => ({ socketId, username: userIdNameMap[socketId] }))

    clients.forEach(({ socketId }) => io.to(socketId)
        .emit("joined", { socketId, username: data.username, clients }));
}

function leave(socket: Socket, io: Server) {
    const rooms = Array.from(socket.rooms);
    rooms.forEach((roomId) => {
        socket.in(roomId).emit("disconnected", { id: socket.id, uname: userIdNameMap[socket.id] });
    })
    delete userIdNameMap[socket.id];
    socket.leave(userIdRoomMap[socket.id]);
}


let sc = 0;

export function controler(io: Server) {

    io.on("connection", (socket) => {
        console.log("socket connected", ++sc, socket.id);
        socket.on("join", (data) => join(data, socket, io));
        socket.on("disconnecting", () => leave(socket, io))
    })

}