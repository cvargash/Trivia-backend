const express = require("express")//cargar libreria
const app = express()//iniicializar la libreria
const port = 4035 //Puerto
const cors = require("cors")
require('dotenv').config()
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URL)

const gameRouter = require("./src/game")
const playerRouter = require("./src/player")
app.use(express.json()) //El servidor acepte peticion json
app.use(cors())
app.use(gameRouter)
app.use(playerRouter)

app.listen(port,()=>{
    console.log("Servidor iniciado en el puerto: ", port)
})



