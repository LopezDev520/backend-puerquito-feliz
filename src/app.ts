
import "reflect-metadata"
import express from "express"
import morgan from "morgan"

import ClienteRouter from "./cliente/router.ts"
import { AppDataSource } from "./db.ts"

const PORT = 8000

const app = express()

app.set("port", process.env.PORT || PORT)

// Middlewares
app.use(morgan("dev"))

// Routers
app.use("/api/cliente", ClienteRouter)
// Routers

AppDataSource.initialize().then(() => {
    app.listen(app.get("port"), () => {
        console.log("Server on port", app.get("port"))
    })
})