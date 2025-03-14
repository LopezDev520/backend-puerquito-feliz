
import { Router, type IRouter } from "express";
import { enviarPedido, generarToken } from "./controller";

const router: IRouter = Router()

router.post("/generar-token", generarToken)
router.post("/enviar-pedido", enviarPedido)

export default router