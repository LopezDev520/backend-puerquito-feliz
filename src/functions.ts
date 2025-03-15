function generateToken(longitud: number = 32): string {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";

    for (let i = 0; i < longitud; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        token += caracteres[indice];
    }

    return token + Date.now().toString(36); // Agregar timestamp para mayor unicidad
}

export { generateToken }