import { IRouter, Router } from "express";
import { cambiarContrasena, cambiarNumeroMesas } from "./controller";

const router: IRouter = Router()

router.post("/cambiar-contrasena", cambiarContrasena)
router.post("/cambiar-numero-mesas", cambiarNumeroMesas)

export default router