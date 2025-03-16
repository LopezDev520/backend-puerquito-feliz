import { NextFunction, Request, Response } from "express";
import { getAdminConfigRepository } from "../db";

const adminConfigRepository = getAdminConfigRepository()

export async function verificarAdmin(req: Request, res: Response, next: NextFunction) {
    const adminTokenHeader = req.get("Authorization")

    if (!adminTokenHeader) {
        res.status(401).send("Falta el token de autorizacion")
        return
    }

    const adminTokenConfig = await adminConfigRepository.findOne({ where: { field: "admin-token" } })

    if (adminTokenHeader == adminTokenConfig.value) {
        next()
        return
    }
    
    else res.status(401).send("El token no es del administrador")
}