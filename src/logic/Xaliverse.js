// |--- 0. Las Clases (Los Moldes)
class Xaliburz {
    constructor(nombre, vida, img) {
        this.nombre = nombre
        this.vida = vida
        this.img = img
        this.ataques = []
    }
}

// |--- 1. CONFIGURACIÓN Y DOM ---|
// --- ATAJOS / HELPERS
const $ = (ID) => document.querySelector(ID)

// --- Selectores del DOM (Conexión con HTML)
const btnSeleccionarMascotaJugador = $("#btn-seleccionar-mascota")
const btnReiniciar = $("#boton-reiniciar")
const sectionSeleccionarAtaque = $("#seleccionar-ataque")
const sectionSeleccionarMascota = $("#seleccionar-mascota")
const layoutXaliburz = $("#layout-xaliburz")
const sectionPerfilJugadores = $("#perfil-jugadores")
const idMascotaJugador = $("#mascota-jugador")
const sectionAnuncioCombate = $("#anuncio-combate")
const sectionReinicio = $("#reinicio")
const layoutBtnAtaque = $("#layout-btn-ataque")
const spnVidasJugador = $("#vidas-jugador")
const spnVidasEnemigo = $("#vidas-enemigo")

// --- VARIABLES GLOBALES
let name;
let vidasJugador = 3
let vidasEnemigo = 3
let mascotaEnemiga = ""
let mascotaJugador = ""
let resultadoEnemigo = ""
let resultadoJugador = ""
let inputHipodoge
let inputCapipepo
let inputRatigueya
let ataquesMascotas
let btnAgua
let btnFuego
let btnTierra
let indexAtaqueEnemigo
let indexAtaqueJugador
let victoriasJugador
let victoriasEnemigo



// --- ARRAYS
let mascotas = []
let botonesAtaques = []
let ataqueJugador = []
let ataqueEnemigo = []

// --- Integración de Objetos en los Arrays
let capipepo = new Xaliburz("Capipepo", 3, "./assets/mokepons_mokepon_capipepo_attack.png")
let hipodoge = new Xaliburz("Hipodoge", 3, "./assets/mokepons_mokepon_hipodoge_attack.png")
let ratigueya = new Xaliburz("Ratigueya", 3, "./assets/mokepons_mokepon_ratigueya_attack.png")

// --- Pensar en esta sección???
capipepo.ataques.push(
    { nombre: "Fuego", id: "boton-fuego" },
    { nombre: "Fuego", id: "boton-fuego" },
    { nombre: "Fuego", id: "boton-fuego" },
    { nombre: "Agua", id: "boton-agua" },
    { nombre: "Tierra", id: "boton-tierra" }
)

hipodoge.ataques.push(
    { nombre: "Agua", id: "boton-agua" },
    { nombre: "Agua", id: "boton-agua" },
    { nombre: "Agua", id: "boton-agua" },
    { nombre: "Fuego", id: "boton-fuego" },
    { nombre: "Tierra", id: "boton-tierra" }
)

ratigueya.ataques.push(
    { nombre: "Tierra", id: "boton-tierra" },
    { nombre: "Tierra", id: "boton-tierra" },
    { nombre: "Tierra", id: "boton-tierra" },
    { nombre: "Fuego", id: "boton-fuego" },
    { nombre: "Agua", id: "boton-agua" }
)

mascotas.push(capipepo, hipodoge, ratigueya)



// |--- 2. LÓGICA Y FUNCIONAMIENTO ---|
// --- FUNCION ALEATORIEDAD
function Aleatoriedad(min, max) {
    return Math.floor(Math.random()*(max - min + 1) + min)
}

// --- OCULTAR SECCIONES INICIALES
sectionSeleccionarAtaque.style.display = "none"
sectionPerfilJugadores.style.display = "none"
sectionAnuncioCombate.style.display = "none"    
btnReiniciar.style.display = "none"

// --- ForEach para agregar mascotas HTML(va dentro de una funcion ojo con eso)
mascotas.forEach(mascota => {
    plantillaMascotas = `
        <input type="radio" name="mascota" id="${mascota.nombre}" />
        <label for="${mascota.nombre}" class="mascota-jugador">
            <img src="${mascota.img}" alt="${mascota.nombre}" />
            <p>${mascota.nombre}</p>
        </label>
    `
    layoutXaliburz.innerHTML += plantillaMascotas

    inputHipodoge = $("#Hipodoge")
    inputCapipepo = $("#Capipepo")
    inputRatigueya = $("#Ratigueya")
})

// --- FUNCION SELECCIÓN DE LA MASCOTA DEL JUGADOR
function seleccionarMascotaJugador() {

    if (inputHipodoge.checked) {
        mascotaJugador = inputHipodoge.id
        idMascotaJugador.textContent = mascotaJugador
    } else if (inputCapipepo.checked) {
        mascotaJugador = inputCapipepo.id
        idMascotaJugador.textContent = mascotaJugador
    } else if (inputRatigueya.checked) {
        mascotaJugador = inputRatigueya.id
        idMascotaJugador.textContent = mascotaJugador
    }

    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
}

// --- FUNCION SELECCIÓN DE LA MASCOTA DEL ENEMIGO
function seleccionarMascotaEnemigo() {
 
    const idMascotaEnemiga = $("#mascota-enemiga")
    let mascotaAleatoriaEnemiga = Aleatoriedad(0, mascotas.length - 1)
    
    idMascotaEnemiga.innerHTML = mascotas[mascotaAleatoriaEnemiga].nombre
    ataqueEnemigo = mascotas[mascotaAleatoriaEnemiga].ataques

    sectionSeleccionarMascota.style.display = "none"
    sectionPerfilJugadores.style.display = "flex"
    sectionSeleccionarAtaque.style.display = "flex"
    
    secuenciaAtaques()
}

// --- FUNCIONES DE LOS ATAQUES DEL JUGADOR
function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mascotas.length; i++) {
        if (mascotas[i].nombre === mascotaJugador) {
            ataques = mascotas[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach(ataque => {
        ataquesMascotas = `
        <button id="${ataque.id}" class="btn-ataque">${ataque.nombre}</button>
        `
        layoutBtnAtaque.innerHTML += ataquesMascotas
    })
    
    btnFuego = $("#boton-fuego")
    btnAgua = $("#boton-agua")
    btnTierra = $("#boton-tierra")
    botonesAtaques = document.querySelectorAll(".btn-ataque")

}

function secuenciaAtaques() {
    botonesAtaques.forEach(boton => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "Agua") {
                ataqueJugador.push("Agua")
                boton.disabled = true
                boton.style.backgroundColor = "#112f58"
                console.log(ataqueJugador)
            } else if (e.target.textContent === "Fuego") {
                ataqueJugador.push("Fuego")
                boton.disabled = true
                boton.style.backgroundColor = "#112f58"
                console.log(ataqueJugador)
            } else if (e.target.textContent === "Tierra") {
                ataqueJugador.push("Tierra")
                boton.disabled = true
                boton.style.backgroundColor = "#112f58"
                console.log(ataqueJugador)
            }
            ataqueAleatorioEnemigo()
        })
    })
}

// --- FUNCION ATAQUE ALEATORIO DEL ENEMIGO
function ataqueAleatorioEnemigo() {
 
    let ataqueAleatorio = Aleatoriedad(0, ataqueEnemigo.length - 1)
    
    if (ataqueAleatorio === 0 || ataqueAleatorio === 1) {
        ataqueEnemigo.push("Fuego")
    } else if (ataqueAleatorio === 2 || ataqueAleatorio === 3) {
        ataqueEnemigo.push("Agua")
    } else {
        ataqueEnemigo.push("Tierra")
    }   

    console.log(ataqueEnemigo)
    iniciarCombate()
    sectionAnuncioCombate.style.display = "flex"
}                              

function iniciarCombate() {
    if (ataqueJugador.length === 5) {
        logicaCombate()
    }
}

function calcularResultados(jugador, enemigo) {
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
    indexAtaqueJugador = ataqueJugador[jugador]
}

// --- FUNCION LOGICA DEL COMBATE
function logicaCombate() {

    for (let i = 0; i < ataqueJugador.length; i++) {
        if (ataqueJugador[i] === ataqueEnemigo[i]) {
            calcularResultados(i, i)
            anuncioCombate("Empate")
        } else if (ataqueJugador[i] === "Fuego" && ataqueEnemigo[i] === "Tierra" || ataqueJugador[i] === "Agua" && ataqueEnemigo[i] === "Fuego" || ataqueJugador[i] === "Tierra" && ataqueEnemigo[i] === "Agua") {
            calcularResultados(i, i)
            anuncioCombate("Ganaste")
            victoriasJugador++
            spnVidasJugador.textContent = victoriasJugador
        } else {
            calcularResultados(i, i)
            anuncioCombate("Perdiste")
            victoriasEnemigo++
            spnVidasEnemigo.textContent = victoriasEnemigo
        }
    }
}

// --- FUNCION VERIFICAR VIDA
function checkVidas() {
    if (victoriasJugador ===  victoriasEnemigo) {
        resultadoJugador = "<strong>EMPATE!:(</strong>"
        resultadoEnemigo = "<strong>EMPATE!:(</strong>"
        anuncioFinalCombate()
        sectionSeleccionarAtaque.style.display = "none"
        btnReiniciar.style.display = "flex"
    } else if (victoriasJugador > victoriasEnemigo) {
        resultadoEnemigo = "<strong>PERDEDOR!!:(</strong>"
        resultadoJugador = "<strong>GANADOR!!:)</strong>"
        anuncioFinalCombate()
        sectionSeleccionarAtaque.style.display = "none"
        btnReiniciar.style.display = "flex"
    }
    
}

// --- FUNCION ANUNCIO DEL COMBATE
function anuncioCombate(resultadoCombate) {

    const sAnuncioCombate = $("#anuncio-combate")

    let parrafo = document.createElement("p") 
    parrafo.innerHTML = mascotaJugador + " ataco con " + ataqueJugador + " y " + mascotaEnemiga + " ataco con " + ataqueEnemigo + " - " + resultadoCombate

    sAnuncioCombate.appendChild(parrafo)

}

// --- FUNCION ANUNCIO FINAL DEL COMBATE
function anuncioFinalCombate() {
    
    const sAnuncioCombateJugador = $("#resultado-jugador")
    const sAnuncioCombateEnemigo = $("#resultado-enemigo")

    let parrafo = document.createElement("p") 
    parrafo.innerHTML = resultadoJugador

    sAnuncioCombateJugador.appendChild(parrafo)

    let parrafo2 = document.createElement("p") 
    parrafo2.innerHTML = resultadoEnemigo

    sAnuncioCombateEnemigo.appendChild(parrafo2)

    btnAgua.disabled = true
    btnFuego.disabled = true
    btnTierra.disabled = true

    //sectionSeleccionarAtaque.style.display = "none"
    //sectionReinicio.style.display = "block"
}

function reiniciarJuego() {
    location.reload()
}


// |--- 3. EVENTOS ---|
btnSeleccionarMascotaJugador.addEventListener("click", seleccionarMascotaJugador)
btnReiniciar.addEventListener("click", reiniciarJuego)



