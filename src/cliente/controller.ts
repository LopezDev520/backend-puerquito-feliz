import type { Request, Response } from "express";
import { Cliente } from "../models/Cliente";
import { generateToken } from "../functions";
import { getClienteRepository } from "../db";

interface ClienteRequest {
    nombre: string
    num_mesa: number
}

const clienteRepository = getClienteRepository()

export function generarToken (req: Request, res: Response) {
    const { nombre, num_mesa }: ClienteRequest = req.body

    const cliente = new Cliente()
    cliente.nombre = nombre
    cliente.num_mesa = num_mesa
    cliente.token = generateToken()

    clienteRepository.save(cliente)

    res.status(200).json({
        status: "OK",
        token: cliente.token
    })
}

export function enviarPedido (req: Request, res: Response) {
    res.status(200).send("Pedido enviado")
}