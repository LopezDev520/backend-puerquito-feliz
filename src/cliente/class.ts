
import { Request, Response, Router } from "express";
import { getClienteRepository } from "../db";
import { Cliente } from "../models/Cliente";

class ClienteRouter {
    private readonly router: Router = Router()
    private readonly clienteRepository = getClienteRepository()

    constructor() {
        this.router.get("/", this.index.bind(this))
        this.router.post("/", this.agregar.bind(this))
    }

    async index(req: Request, res: Response) {
        const clients = await this.clienteRepository.find();
        res.status(200).json(clients);
    }

    async agregar(req: Request, res: Response) {
        interface Req {
            nombre: string
            num_mesa: number
        }

        const cliente: Req = req.body

        const nuevoCliente = new Cliente()
        nuevoCliente.nombre = cliente.nombre
    }
}
