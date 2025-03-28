
import "reflect-metadata"
import express from "express"
import morgan from "morgan"
import fileUpload from "express-fileupload"
import { Server } from "socket.io"

import ClienteRouter from "./cliente/router.ts"
import AdminRouter from "./admin/router.ts"
import CajaRouter from "./caja/router.ts"
import { AppDataSource } from "./db.ts"
import { initAdminSettings } from "./functions.ts"
import path from "path"
import { createServer } from "http"
import { socketIO } from "./io.ts"

const PORT = 8000

const app = express()
const httpServer = createServer(app)
const io = socketIO(httpServer)

app.set("port", process.env.PORT || PORT)

// Middlewares
app.use(express.json())
app.use(fileUpload())
app.use(morgan("dev"))

app.use("/uploads/images", express.static(path.join(__dirname, "../images")))
app.use("/", express.static(path.join(__dirname, "static")))

// Routers
app.use("/api/cliente", ClienteRouter)
app.use("/api/admin", AdminRouter)
app.use("/api/caja", CajaRouter)
// Routers

AppDataSource.initialize().then(() => {
    initAdminSettings()
    // app.listen(app.get("port"), () => {
    //     console.log("Server on port", app.get("port"))
    // })

    httpServer.listen(app.get("port"), () => {
        console.log(`Server running at http://localhost:${app.get("port")}`)
    })
})