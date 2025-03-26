import type { Request, Response } from "express";
import { getClienteRepository, getPagoRepository, getPedidoPlatoRepository, getPedidoRepository } from "../db";
import { Pago } from "../models/Pago";

const pedidoRepository = getPedidoRepository()
const pagoRepository = getPagoRepository()
const clienteRepositoy = getClienteRepository()
const pedidoPlatoRepository = getPedidoPlatoRepository()

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
        relations: { cliente: true, pedidoPlatos: { plato: true } }
    })

    res.status(200).json(pedido)
}

export async function realizarPago(req: Request, res: Response) {
    const { pedido_id, dinero_recibido }: RealizarPagoRequest = req.body

    const pedido = await pedidoRepository.findOne({
        where: { id: pedido_id },
        relations: { pedidoPlatos: { plato: true }, pago: true, cliente: true }
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
    pedido.cliente.activo = false
    pedido.pago = pago

    await pedidoRepository.save(pedido)
    await clienteRepositoy.save(pedido.cliente)
    const pagoDB = await pagoRepository.save(pago)
    delete pagoDB.pedido

    res.status(200).json(pagoDB)
}

export async function obtenerDatosPanel(req: Request, res: Response) {

    const hoy = new Date().toLocaleDateString("ES-ES")

    const clientesDelDia = await clienteRepositoy.count({ where: { fecha: hoy } })
    const ventaDelDia = await pagoRepository.sum("total", { fecha: hoy })
    const dineroEnCaja = await pagoRepository.sum("dineroRecibido", { fecha: hoy })
    const clientesEnLugar = await clienteRepositoy.count({ where: { fecha: hoy, activo: true } })
    const pedidosPagados = await pedidoRepository.count({ where: { fecha: hoy, pago: true } })

    // Obtener platos más vendidos del día
    const platosVendidos = await pedidoPlatoRepository
        .createQueryBuilder("pedidoPlato")
        .innerJoinAndSelect("pedidoPlato.plato", "plato")
        .leftJoin("pedidoPlato.pedido", "pedido")
        .where("pedido.fecha = :fecha", { fecha: hoy })
        .select([
            "plato.id as plato_id",
            "plato.nombre as plato_nombre",
            "plato.precio as plato_precio",
            "plato.descripcion as plato_descripcion",
            "plato.imagen as plato_imagen",
            "SUM(pedidoPlato.cantidad) as cantidad"
        ])
        .groupBy("plato.id, plato.nombre, plato.precio, plato.descripcion, plato.imagen")
        .orderBy("cantidad", "DESC")
        .limit(5)
        .getRawMany();

    // Formatear el resultado para una mejor estructura
    const platosFormateados = platosVendidos.map(raw => ({
        plato: {
            id: raw.plato_id,
            nombre: raw.plato_nombre,
            precio: raw.plato_precio,
            descripcion: raw.plato_descripcion,
            imagen: raw.plato_imagen
        },
        cantidad: parseInt(raw.cantidad)
    }));

    // const masVendidos = await pedidoRepository.find({
    //     where: { fecha: hoy },
    //     relations: { pedidoPlatos: true }
    // })

    res.status(200).json({
        clientesDelDia,
        ventaDelDia,
        dineroEnCaja,
        clientesEnLugar,
        pedidosPagados,
        platosVendidos: platosFormateados
    })

}