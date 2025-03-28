import type { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { registerPedidoSocket } from "./sockets/pedidoSocket.js"

export function socketIO(httpServer: HttpServer) {
    const sockets = new Map<string, Socket>();
    const io = new Server(httpServer)

    io.on("connection", socket => {
        socket.on("identificar", (token) => {
            sockets.set(token, socket);
            console.log(`Socket identificado con token: ${token}`);
        });

        registerPedidoSocket(socket)

        socket.on("disconnect", () => {
            for (const [token, s] of sockets.entries()) {
                if (s === socket) {
                    sockets.delete(token);
                    console.log(`Socket desconectado: ${token}`);
                    break;
                }
            }
        });
    });

    const enviarMensaje = (token: string, evento: string, datos: any) => {
        const socket = sockets.get(token);
        if (socket) {
            socket.emit(evento, datos);
        }
    };

    return { io, enviarMensaje };
}
