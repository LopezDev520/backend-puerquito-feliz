
import { Request, Response } from "express"
import { getAdminConfigRepository, getCategoriaRepository, getPlatoRepository } from "../db"
import { Categoria } from "../models/Categoria"
import { Plato } from "../models/Plato"
import { generateToken } from "../functions"
import path from "path"
import crypto from "crypto"

import type { UploadedFile } from "express-fileupload"

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

interface ModificarPlatoRequest extends CrearPlatoRequest {
    id: number
    categoria: number
}

const adminConfigRepository = getAdminConfigRepository()
const categoriaRepository = getCategoriaRepository()
const platoRepository = getPlatoRepository()

const pathImagenes = path.join(__dirname, "../../images")

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
    let { imagen } = req.files
    const { nombre, precio, descripcion, categoria_id }: CrearPlatoRequest = req.body

    imagen = imagen as UploadedFile

    const extension = imagen.name.split(".").at(-1);
    const nombreLimpio = imagen.name
        .replace(/\s+/g, "_") // Reemplaza espacios con "_"
        .replace(/[^a-zA-Z0-9._-]/g, ""); // Elimina caracteres especiales

    // Agrega un hash único al nombre para evitar duplicados
    const hash = crypto.randomUUID(); // Genera un UUID único
    const nombreImagen = `${path.parse(nombreLimpio).name}_${hash}.${extension}`;
    const pathImagen = path.join(pathImagenes, nombreImagen);

    imagen.mv(pathImagen, (err) => {
        if (err) {
            console.error("Error al mover la imagen:", err);
        } else {
            console.log("Imagen guardada en:", pathImagen);
        }
    });


    const nuevoPlato = new Plato()
    nuevoPlato.imagen = "/uploads/images/" + nombreImagen
    nuevoPlato.nombre = nombre
    nuevoPlato.precio = precio
    nuevoPlato.descripcion = descripcion
    nuevoPlato.activo = true

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

export async function obtenerContrasena(req: Request, res: Response) {
    const contrasenaConfig = await adminConfigRepository.findOne({ where: { field: "contrasena" } })
    res.status(200).send(contrasenaConfig.value)
}

export async function obtenerCategoriasPlatos(req: Request, res: Response) {
    const categorias = await categoriaRepository.createQueryBuilder("categoria")
        .leftJoinAndSelect("categoria.platos", "plato", "plato.activo = :activo", { activo: true })
        .getMany();

    res.status(200).send(categorias)
}

export async function obtenerPlato(req: Request, res: Response) {
    const { id } = req.query
    const plato = await platoRepository.findOne({ where: { id: Number(id) }, relations: { categoria: true } })
    res.status(200).json(plato)
}

export async function obtenerCategorias(req: Request, res: Response) {
    const categorias = await categoriaRepository.find();
    res.status(200).send(categorias)
}

export async function modificarPlato(req: Request, res: Response) {
    let { imagen } = req.files
    const { id, nombre, precio, descripcion, categoria }: ModificarPlatoRequest = req.body

    imagen = imagen as UploadedFile

    const extension = imagen.name.split(".").at(-1);
    const nombreLimpio = imagen.name
        .replace(/\s+/g, "_") // Reemplaza espacios con "_"
        .replace(/[^a-zA-Z0-9._-]/g, ""); // Elimina caracteres especiales

    // Agrega un hash único al nombre para evitar duplicados
    const hash = crypto.randomUUID(); // Genera un UUID único
    const nombreImagen = `${path.parse(nombreLimpio).name}_${hash}.${extension}`;
    const pathImagen = path.join(pathImagenes, nombreImagen);

    imagen.mv(pathImagen, (err) => {
        if (err) {
            console.error("Error al mover la imagen:", err);
        } else {
            console.log("Imagen guardada en:", pathImagen);
        }
    });

    const platoModificado = await platoRepository.findOneBy({ id })
    platoModificado.imagen = "/uploads/images/" + nombreImagen
    platoModificado.nombre = nombre
    platoModificado.precio = precio
    platoModificado.descripcion = descripcion

    const categoriaMod = await categoriaRepository.findOneBy({ id: categoria })
    platoModificado.categoria = categoriaMod

    const plato = await platoRepository.save(platoModificado)
    res.status(200).json(plato)
}

export async function eliminarPlato(req: Request, res: Response) {
    const { id } = req.query
    const platoAEliminar = await platoRepository.findOneBy({ id: Number(id) })
    platoAEliminar.activo = false
    await platoRepository.save(platoAEliminar)
    res.status(200).send("El plato ha sido eliminado correctamente")
}