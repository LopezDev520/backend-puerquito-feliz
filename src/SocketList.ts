import { Socket } from "socket.io"


export class SocketList {
    sockets = new Map()

    addSocket(token: string, socket: Socket) {
        this.sockets.set(token, socket)
    }

    getSocket(token: string): Socket {
        return this.sockets.get(token)
    }

    removeSocket(token: string) {
        this.sockets.delete(token)
    }
}

export class SocketListSingleton {

    static instance: SocketList = null

    static getInstance() {
        if (this.instance == null) {
            this.instance = new SocketList()
        }

        return this.instance
    }

}