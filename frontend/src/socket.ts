import { io } from 'socket.io-client';
let ip = "3.108.58.22"
ip = "127.0.0.1"
export async function initSocket() {
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };
    return io(`http://${ip}:8080/`, options)
}
// http://3.108.58.22:8080/