import type { Request, Response } from "express";
import { Cliente } from "../models/Cliente";
import { generateToken } from "../functions";
import { getAdminConfigRepository, getCategoriaRepository, getClienteRepository, getPedidoPlatoRepository, getPedidoRepository, getPlatoRepository } from "../db";
import { Pedido } from "../models/Pedido";
import { PedidoPlato } from "../models/PedidoPlato";

interface ClienteRequest {
    nombre: string
    num_mesa: number
}

interface EnviarPedidoRequest {
    pedido_id?: number
    pedidos: PedidoRequest[]
}

interface PedidoRequest {
    plato_id: number
    cantidad: number
    anotacion: string
}

const clienteRepository = getClienteRepository()
const adminConfigRepository = getAdminConfigRepository()
const categoriaRepository = getCategoriaRepository()
const platoRepository = getPlatoRepository()
const pedidoRepository = getPedidoRepository()
const pedidoPlatoRepository = getPedidoPlatoRepository()

export async function generarToken(req: Request, res: Response) {
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

export async function obtenerMenu(req: Request, res: Response) {
    const menu = await categoriaRepository.find({ where: { platos: { activo: true } }, relations: { platos: true } })
    res.status(200).json(menu)
}

export async function enviarPedido(req: Request, res: Response) {
    const { pedido_id, pedidos }: EnviarPedidoRequest = req.body
    const token = req.get("Authorization")

    console.log(pedidos)

    let pedido: Pedido
    const cliente = await clienteRepository.findOneBy({ token })

    if (pedido_id) pedido = await pedidoRepository.findOneBy({ id: pedido_id })
    else {
        pedido = new Pedido()
        pedido.fecha = new Date().toLocaleDateString("ES-ES")
        pedido.cliente = cliente
        pedido.estado = "Pendiente"
        await pedidoRepository.save(pedido)
    }

    for (let pedidoReq of pedidos) {
        const pedidoPlato = new PedidoPlato()
        const plato = await platoRepository.findOneBy({ id: pedidoReq.plato_id })
        
        pedidoPlato.pedido = pedido
        pedidoPlato.plato = plato
        pedidoPlato.cantidad = pedidoReq.cantidad
        pedidoPlato.anotacion = pedidoReq.anotacion
        pedidoPlato.subtotal = pedidoReq.cantidad * plato.precio

        await pedidoPlatoRepository.save(pedidoPlato)
    }

    res.status(200).send(pedido)
}

export async function obtenerNumeroMesas(req: Request, res: Response) {
    const mesasConfig = await adminConfigRepository.findOne({ where: { field: "numero-de-mesas" } })
    res.status(200).send(mesasConfig.value)
}