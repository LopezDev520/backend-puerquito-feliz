import { IRouter, Router } from "express";
import { verificarAdmin } from "./middlewares"
import { 
    cambiarContrasena, 
    cambiarNumeroMesas, 
    crearCategoria, 
    crearPlato, 
    iniciarSesion, 
    obtenerContrasena, 
    obtenerCategoriasPlatos 
} from "./controller";

const router: Router = Router()

router.post("/login", iniciarSesion)

router.get("/obtener-contrasena", verificarAdmin, obtenerContrasena)
router.post("/cambiar-contrasena", verificarAdmin, cambiarContrasena)

router.post("/cambiar-numero-mesas", verificarAdmin, cambiarNumeroMesas)

router.get("/obtener-categorias-platos", verificarAdmin, obtenerCategoriasPlatos)
router.post("/crear-categoria", verificarAdmin, crearCategoria)
router.post("/crear-plato", verificarAdmin, crearPlato)

export default router