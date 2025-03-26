
import { Router, type IRouter } from "express";
import { enviarPedido, generarToken, obtenerNumeroMesas, obtenerMenu } from "./controller";

const router: IRouter = Router()

router.post("/generar-token", generarToken)
router.post("/enviar-pedido", enviarPedido)
router.get("/obtener-numero-mesas", obtenerNumeroMesas)
router.get("/obtener-menu", obtenerMenu)

export default router