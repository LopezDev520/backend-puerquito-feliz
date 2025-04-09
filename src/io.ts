import type { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { registerPedidoSocket } from "./sockets/pedidoSocket.js"
import { SocketListSingleton } from "./SocketList.ts";

export function socketIO(httpServer: HttpServer) {
    const sockets = SocketListSingleton.getInstance()
    const io = new Server(httpServer)

    io.on("connection", socket => {
        socket.on("identificar", (token) => {
            sockets.addSocket(token, socket);
            console.log(`Socket identificado con token: ${token}`);
        });

        registerPedidoSocket(socket)

        socket.on("disconnect", () => {
            for (const [token, s] of sockets.sockets.entries()) {
                if (s === socket) {
                    sockets.removeSocket(token);
                    console.log(`Socket desconectado: ${token}`);
                    break;
                }
            }
        });
    });

    const enviarMensaje = (token: string, evento: string, datos: any) => {
        const socket = sockets.getSocket(token);
        if (socket) {
            socket.emit(evento, datos);
        }
    };

    return { io, enviarMensaje };
}
