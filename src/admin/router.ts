import { IRouter, Router } from "express";
import { verificarAdmin } from "./middlewares"
import { 
    cambiarContrasena, 
    cambiarNumeroMesas, 
    crearCategoria, 
    crearPlato, 
    iniciarSesion, 
    obtenerContrasena, 
    obtenerCategoriasPlatos, 
    obtenerPlato,
    obtenerCategorias,
    modificarPlato,
    eliminarPlato
} from "./controller";

const router: Router = Router()

router.post("/login", iniciarSesion)

router.get("/obtener-contrasena", verificarAdmin, obtenerContrasena)
router.post("/cambiar-contrasena", verificarAdmin, cambiarContrasena)

router.post("/cambiar-numero-mesas", verificarAdmin, cambiarNumeroMesas)

router.get("/obtener-categorias-platos", verificarAdmin, obtenerCategoriasPlatos)
router.post("/crear-categoria", verificarAdmin, crearCategoria)
router.post("/crear-plato", verificarAdmin, crearPlato)
router.post("/modificar-plato", verificarAdmin, modificarPlato)
router.delete("/eliminar-plato", verificarAdmin, eliminarPlato)
router.get("/obtener-plato", obtenerPlato)
router.get("/obtener-categorias", obtenerCategorias)

export default router