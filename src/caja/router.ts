import { Router } from "express";
import { obtenerDatosPanel, obtenerPedido, obtenerPedidosActivos, realizarPago } from "./controller";

const router: Router = Router()

router.get("/obtener-pedidos-activos", obtenerPedidosActivos)
router.get("/obtener-pedido", obtenerPedido)
router.get("/obtener-datos-panel", obtenerDatosPanel)
router.post("/realizar-pago", realizarPago)

export default router
