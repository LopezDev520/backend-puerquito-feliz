
import { Router, type IRouter } from "express";
import { enviarPedido, generarToken, obtenerNumeroMesas } from "./controller";

const router: IRouter = Router()

router.post("/generar-token", generarToken)
router.post("/enviar-pedido", enviarPedido)
router.get("/obtener-numero-mesas", obtenerNumeroMesas)

export default router