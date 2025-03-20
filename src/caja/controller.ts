
import type { Request, Response } from "express";
import { getPagoRepository, getPedidoRepository } from "../db";
import { Pago } from "../models/Pago";

const pedidoRepository = getPedidoRepository()
const pagoRepository = getPagoRepository()

interface RealizarPagoRequest {
    pedido_id: number
    dinero_recibido: number
}

export async function obtenerPedidosActivos(req: Request, res: Response) {
    const pedidosActivos = await pedidoRepository.find({ 
        where: { activado: true }, 
        relations: { cliente: true, pedidoPlatos: true } 
    })
    
    res.status(200).json(pedidosActivos)
}

export async function obtenerPedido(req: Request, res: Response) {
    const id = Number(req.query.id)

    const pedido = await pedidoRepository.findOne({
        where: { id },
        relations: { cliente: true, pedidoPlatos: true }
    })

    res.status(200).json(pedido)
}

export async function realizarPago(req: Request, res: Response) {
    const { pedido_id, dinero_recibido }: RealizarPagoRequest = req.body
    const pedido = await pedidoRepository.findOne({
        where: { id: pedido_id },
        relations: { pedidoPlatos: { plato: true }, pago: true }
    })

    if (pedido.pago) {
        res.status(200).send("El pago ya fue realizado")
        return
    }

    const pago = new Pago()
    pago.pedido = pedido

    let total = 0
    for (let pedidoPlato of pedido.pedidoPlatos) total += pedidoPlato.cantidad * pedidoPlato.plato.precio

    if (dinero_recibido < total) {
        res.json("El dinero recibido es menor que el total de la factura")
        return
    }

    pago.total = total
    pago.dineroRecibido = dinero_recibido
    pago.cambio = dinero_recibido - total

    pedido.activado = false
    pedido.pago = pago

    await pedidoRepository.save(pedido)
    const pagoDB = await pagoRepository.save(pago)
    delete pagoDB.pedido

    res.status(200).json(pagoDB)
}