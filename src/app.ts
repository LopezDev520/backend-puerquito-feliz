
import express from "express"

import ClienteRouter from "./cliente/router.ts"

const PORT = 8000

const app = express()

app.set("port", process.env.PORT || PORT)

// Routers
app.use("/api/cliente", ClienteRouter)
// Routers

app.listen(app.get("port"), () => {
    console.log("Server on port", app.get("port"))
})