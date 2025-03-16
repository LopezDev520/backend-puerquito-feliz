import type { Request, Response } from "express";
import { Cliente } from "../models/Cliente";
import { generateToken } from "../functions";
import { getAdminConfigRepository, getClienteRepository } from "../db";

interface ClienteRequest {
    nombre: string
    num_mesa: number
}

const clienteRepository = getClienteRepository()
const adminConfigRepository = getAdminConfigRepository()

export async function generarToken (req: Request, res: Response) {
    const { nombre, num_mesa }: ClienteRequest = req.body

    const cliente = new Cliente()
    cliente.nombre = nombre
    cliente.num_mesa = num_mesa
    cliente.token = generateToken()

    await clienteRepository.save(cliente)

    res.status(200).json({
        status: "OK",
        token: cliente.token
    })
}

export function enviarPedido (req: Request, res: Response) {
    res.status(200).send("Pedido enviado")
}

export async function obtenerNumeroMesas (req: Request, res: Response) {
    const mesasConfig = await adminConfigRepository.findOne({ where: { field: "numero-de-mesas" } })
    res.status(200).send(mesasConfig.value)
}