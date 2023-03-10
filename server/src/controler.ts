import { Socket, Server } from "socket.io";
const userIdNameMap: { [key: string]: string } = {};
const userIdRoomMap: { [key: string]: string } = {};
const roomCodeMap: { [key: string]: string } = {};
const roomAdminMap: { [key: string]: string } = {};

function join(
  data: { id: string; username: string },
  socket: Socket,
  io: Server
) {
  userIdNameMap[socket.id] = data.username;
  socket.join(data.id);
  userIdRoomMap[socket.id] = data.id;
  if (!roomAdminMap[data.id]) {
    roomAdminMap[data.id] = data.username;
  }
  let clients = Array.from(io.sockets.adapter.rooms.get(data.id) || []).map(
    (socketId, i) => ({
      socketId,
      username: userIdNameMap[socketId],
      admin: roomAdminMap[data.id],
    })
  );

  socket.emit("prevcode", roomCodeMap[data.id]);

  clients.forEach(({ socketId }) =>
    io.to(socketId).emit("joined", {
      socketId,
      username: data.username,
      clients,
      admin: userIdNameMap[roomAdminMap[data.id]],
    })
  );
}

function leave(socket: Socket, io: Server) {
  const rooms = Array.from(socket.rooms);
  rooms.forEach((roomId) => {
    socket
      .in(roomId)
      .emit("disconnected", { id: socket.id, uname: userIdNameMap[socket.id] });
  });
  delete userIdNameMap[socket.id];
  socket.leave(userIdRoomMap[socket.id]);
}

function type(
  data: { id: string; username: string; code: string },
  socket: Socket,
  io: Server
) {
  roomCodeMap[data.id] = data.code;
  Array.from(io.sockets.adapter.rooms.get(data.id) || []).forEach((socket) => {
    io.to(socket).emit("typed", { ...data });
  });
}

function readOnly(
  data: {
    socketId: string;
    username: string;
    userId: string;
    room: string;
  },
  socket: Socket,
  io: Server
) {
  console.log(userIdNameMap[data.userId], data.userId);
  Array.from(io.sockets.adapter.rooms.get(data.room) || []).forEach(
    (socket) => {
      if (socket == data.userId) {
        if (roomAdminMap[data.room] == data.username)
          io.to(socket).emit("nowrite", true, userIdNameMap[socket]);
        else io.to(socket).emit("nowrite", false, userIdNameMap[socket]);
      }
    }
  );
}

function clear(id: string, socket: Socket, io: Server) {
  Array.from(io.sockets.adapter.rooms.get(id) || []).forEach((socket) => {
    io.to(socket).emit("typed", "");
  });
  roomCodeMap[id] = "";
}

let sc = 0;

export function controler(io: Server) {
  io.on("connection", (socket: Socket) => {
    socket.on("join", (data) => join(data, socket, io));
    socket.on("disconnecting", () => leave(socket, io));
    socket.on("type", (data) => type(data, socket, io));
    socket.on("readonly", (data) => readOnly(data, socket, io));
    socket.on("clear", (data) => clear(data, socket, io));
  });
}
