import type { Request, Response } from "express";

export function generarToken (req: Request, res: Response) {
    res.status(200).send("Generar token funcionando")
}

export function enviarPedido (req: Request, res: Response) {
    res.status(200).send("Pedido enviado")
}