import { getAdminConfigRepository } from "./db";
import { AdminConfig } from "./models/AdminConfig";

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
