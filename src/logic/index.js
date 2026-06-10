const express = require("express")
const cors = require("cors")
const app = express()
const port = 8080
const jugadores = []

class Jugador {
    constructor(id) {
        this.id = id
    }

    asignarMascota(xaliburz) {
        this.xaliburz = xaliburz
    }

    actualizarPosicion(x, y) {
        this.x = x
        this.y = y
    }

    asignarAtaques(ataques) {
        this.ataques = ataques
    }
}

class Mascota {
    constructor(nombre) {
        this.nombre = nombre
    }
}

app.use(cors())
app.use(express.json())

app.get("/login", (req, res) => {
    const id = `${Math.floor(Math.random() * 10000)}`
    const jugador = new Jugador(id)

    jugadores.push(jugador)

    res.send({ id })
})

app.post("/mascota/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.nombre || ""
    const mascota = new Mascota(nombre)

    const mascotaJugador = jugadores.findIndex((jugador) => jugador.id === jugadorId)

    if (mascotaJugador >= 0) {
        jugadores[mascotaJugador].asignarMascota(mascota)                                          
    }

    console.log(jugadores)    
    res.end()
})

app.post("/mascota/:jugadorId/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0
    
    const mascotaJugador = jugadores.findIndex((jugador) => jugador.id === jugadorId)

    if (mascotaJugador >= 0) {
        jugadores[mascotaJugador].actualizarPosicion(x, y)                                          
    }

    const enemigos = jugadores.filter((jugador) => jugador.id !== jugadorId)

    res.send({
        enemigos 
    })
})

app.post("/mascota/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const ataques = req.body.ataques || []
    
    const mascotaJugador = jugadores.findIndex((jugador) => jugador.id === jugadorId)

    if (mascotaJugador >= 0) {
        jugadores[mascotaJugador].asignarAtaques(ataques)                                          
    }

    res.end()
})

app.get("/mascota/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    
    const mascotaJugador = jugadores.find((jugador) => jugador.id === jugadorId)
   
    res.send({
        ataques: mascotaJugador.ataques || []
    })
    
})

app.listen(port, () => {
    console.log(`Servidor Funcionando! 🚀 ${port}`)
})