import { io } from 'socket.io-client';

export async function initSocket() {
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };
    return io("http://localhost:8080/", options)
}