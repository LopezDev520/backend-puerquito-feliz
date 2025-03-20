
import { Request, Response } from "express"
import { getAdminConfigRepository, getCategoriaRepository, getPlatoRepository } from "../db"
import { Categoria } from "../models/Categoria"
import { Plato } from "../models/Plato"
import { generateToken } from "../functions"

interface CambiarContrasenaRequest { nueva_contrasena: string }
interface CambiarNumeroMesaRequest { numero_mesas: number }
interface CrearCategoriaRequest { nombre: string }
interface IniciarSesionRequest { contrasena: string }
interface CrearPlatoRequest {
    nombre: string
    descripcion: string
    precio: number,
    categoria_id: number
}

const adminConfigRepository = getAdminConfigRepository()
const categoriaRepository = getCategoriaRepository()
const platoRepository = getPlatoRepository()

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

export async function crearCategoria(req: Request, res: Response) {
    const { nombre }: CrearCategoriaRequest = req.body

    const nuevaCategoria = new Categoria()
    nuevaCategoria.nombre = nombre
    const categoria = await categoriaRepository.save(nuevaCategoria)

    res.status(200).json(categoria)
}

export async function crearPlato(req: Request, res: Response) {
    const { nombre, precio, descripcion, categoria_id }: CrearPlatoRequest = req.body

    const nuevoPlato = new Plato()
    nuevoPlato.imagen = "/plato-tal"
    nuevoPlato.nombre = nombre
    nuevoPlato.precio = precio
    nuevoPlato.descripcion = descripcion
    nuevoPlato.disponible = true

    const categoria = await categoriaRepository.findOneBy({ id: categoria_id })
    nuevoPlato.categoria = categoria

    const plato = await platoRepository.save(nuevoPlato)
    res.status(200).json(plato)
}

export async function iniciarSesion(req: Request, res: Response) {
    const { contrasena }: IniciarSesionRequest = req.body

    const contrasenaConfig = await adminConfigRepository.findOne({ where: { field: "contrasena" } })

    if (contrasena == contrasenaConfig.value) {
        const token = generateToken()

        const adminTokenConfig = await adminConfigRepository.findOne({ where: { field: "admin-token" } })
        adminTokenConfig.value = token
        await adminConfigRepository.save(adminTokenConfig)

        res.status(200).send(token)
    } else res.status(401).send("La contraseña no es correcta")
}