
import "reflect-metadata"
import express from "express"
import morgan from "morgan"
import fileUpload from "express-fileupload"

import ClienteRouter from "./cliente/router.ts"
import AdminRouter from "./admin/router.ts"
import { AppDataSource } from "./db.ts"
import { initAdminSettings } from "./functions.ts"
import path from "path"

const PORT = 8000

const app = express()

app.set("port", process.env.PORT || PORT)

// Middlewares
app.use(express.json())
app.use(fileUpload())
app.use(morgan("dev"))

app.use("/uploads/images", express.static(path.join(__dirname, "../images")))

// Routers
app.use("/api/cliente", ClienteRouter)
app.use("/api/admin", AdminRouter)
// Routers

AppDataSource.initialize().then(() => {
    initAdminSettings()
    app.listen(app.get("port"), () => {
        console.log("Server on port", app.get("port"))
    })
})