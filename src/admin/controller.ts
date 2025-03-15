
import { Request, Response } from "express"
import { getAdminConfigRepository } from "../db"

interface CambiarContrasenaRequest { nueva_contrasena: string }
interface CambiarNumeroMesaRequest { numero_mesas: number }

const adminConfigRepository = getAdminConfigRepository()

export async function cambiarContrasena(req: Request, res: Response) {
    const { nueva_contrasena }: CambiarContrasenaRequest = req.body

    const contrasenaConfig = await adminConfigRepository.findOne({ where: { field: "contrasena" } })
    contrasenaConfig.value = nueva_contrasena

    adminConfigRepository.save(contrasenaConfig)

    res.status(200).send("Contrasena cambiada correctamente")
}

export async function cambiarNumeroMesas(req: Request, res: Response) {
    const { numero_mesas }: CambiarNumeroMesaRequest = req.body

    const numeroMesasConfig = await adminConfigRepository.findOne({ where: { field: "numero-de-mesas" } })
    numeroMesasConfig.value = `${numero_mesas}`

    adminConfigRepository.save(numeroMesasConfig)

    res.status(200).send("Numero de mesas actualizado")
}