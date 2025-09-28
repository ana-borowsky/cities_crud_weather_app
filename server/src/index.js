import express from "express"
import userRoutes from "./Routes/cities.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/cities", userRoutes)

app.listen(8800)
