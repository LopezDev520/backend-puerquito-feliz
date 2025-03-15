
import { DataSource } from "typeorm"
import { AdminConfig } from "./models/AdminConfig"
import { Categoria } from "./models/Categoria"
import { Cliente } from "./models/Cliente"
import { Pedido } from "./models/Pedido"
import { PedidoPlato } from "./models/PedidoPlato"
import { Plato } from "./models/Plato"

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "appdatabase",
    entities: [Cliente, Pedido, AdminConfig, Categoria, PedidoPlato, Plato],
    synchronize: true,
    logging: true
})

const getClienteRepository = () => AppDataSource.getRepository(Cliente)
const getPedidoRepository = () => AppDataSource.getRepository(Pedido)
const getAdminConfigRepository = () => AppDataSource.getRepository(AdminConfig)
const getCategoriaRepository = () => AppDataSource.getRepository(Categoria)
const getPedidoPlatoRepository = () => AppDataSource.getRepository(PedidoPlato)
const getPlatoRepository = () => AppDataSource.getRepository(Plato)

export {
    AppDataSource, 
    getAdminConfigRepository,
    getCategoriaRepository, 
    getClienteRepository, 
    getPedidoPlatoRepository, 
    getPedidoRepository, 
    getPlatoRepository
}
