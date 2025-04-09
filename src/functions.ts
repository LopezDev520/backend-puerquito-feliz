import { UploadedFile } from "express-fileupload";
import { getAdminConfigRepository } from "./db";
import { AdminConfig } from "./models/AdminConfig";
import path from "path";

const adminConfigRepository = getAdminConfigRepository()

export async function initAdminSettings() {
    const mesasConfig = await adminConfigRepository.findOne({ where: { field: "numero-de-mesas" } })
    
    if (!mesasConfig) {
        const mesasConfig = new AdminConfig()
        mesasConfig.field = "numero-de-mesas"
        mesasConfig.value = "8"
        await adminConfigRepository.save(mesasConfig)
    }

    const contrasenaConfig = await adminConfigRepository.findOne({ where: { field: "contrasena" } })

    if (!contrasenaConfig) {
        const contrasenaConfig = new AdminConfig()
        contrasenaConfig.field = "contrasena"
        contrasenaConfig.value = "12345678"
        await adminConfigRepository.save(contrasenaConfig)
    }

    const adminTokenConfig = await adminConfigRepository.findOne({ where: { field: "admin-token" } })

    if (!adminTokenConfig) {
        const adminTokenConfig = new AdminConfig()
        adminTokenConfig.field = "admin-token"
        adminTokenConfig.value = ""
        await adminConfigRepository.save(adminTokenConfig)
    }
}

export function generateToken(longitud: number = 32): string {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";

    for (let i = 0; i < longitud; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        token += caracteres[indice];
    }

    return token + Date.now().toString(36); // Agregar timestamp para mayor unicidad
}

export function moveImages(imagen: UploadedFile, pathImagenes: string) {
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

        return nombreImagen
}