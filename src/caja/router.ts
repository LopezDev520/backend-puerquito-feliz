import { Router } from "express";
import { obtenerDatosPanel, obtenerPedido, obtenerPedidosActivos, realizarPago, obtenerPedidos, cambiarEstadoPedido } from "./controller";

const router: Router = Router()

router.get("/obtener-pedidos-activos", obtenerPedidosActivos)
router.get("/obtener-pedido", obtenerPedido)
router.get("/obtener-datos-panel", obtenerDatosPanel)
router.get("/obtener-pedidos", obtenerPedidos)

router.post("/realizar-pago", realizarPago)
router.post("/cambio-estado-pedido", cambiarEstadoPedido)


export default router
