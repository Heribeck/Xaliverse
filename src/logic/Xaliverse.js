// |--- 0. Las Clases (Los Moldes)
class Xaliburz {
    constructor(nombre, vida, img) {
        this.nombre = nombre
        this.vida = vida
        this.img = img
        this.ataques = []
        this.ancho = 80
        this.alto = 80
        this.x = Aleatoriedad(0, canvasMapa.width - this.ancho)
        this.y = Aleatoriedad(0, canvasMapa.height - this.alto)
        console.log(canvasMapa.width, "ancho del canvas")
        console.log(canvasMapa.height, "alto del canvas")
        console.log(Aleatoriedad(0, canvasMapa.width - this.ancho), Aleatoriedad(0, canvasMapa.height - this.alto))
        this.mapa = new Image()
        this.mapa.src = img
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarPersonaje(){  
        lienzo.drawImage(
            this.mapa,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
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
const spnVictoriasJugador = $("#victorias-jugador")
const spnVictoriasEnemigo = $("#victorias-enemigo")
const sAnuncioCombateJugador = $("#resultado-jugador")
const sAnuncioCombateEnemigo = $("#resultado-enemigo")
const imgJugador = $("#img-jugador")
const imgEnemigo = $("#img-enemigo")
const canvasMapa = $("#Mapa")
const sectionMapa = $("#idMapa")


// --- VARIABLES GLOBALES
let name;
let mascotaEnemiga;
let mascotaJugador;
let resultadoEnemigo = "";
let resultadoJugador = "";
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let ataquesMascotas;
let btnAgua;
let btnFuego;
let btnTierra;
let indexAtaqueEnemigo;
let indexAtaqueJugador;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let lienzo = canvasMapa.getContext("2d");
let intervalo;
let fotoMapa = new Image();
let mascotaJugadorObjeto;
fotoMapa.src = "./assets/mapaPlatzi.png";
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoMapa = 800

if (anchoDelMapa > anchoMaximoMapa) {
    anchoDelMapa = anchoMaximoMapa - 20 
    console.log(anchoDelMapa, "ancho del canvas ajustado")
}

alturaQueBuscamos = anchoDelMapa * 600 / 800
canvasMapa.width = anchoDelMapa
canvasMapa.height = alturaQueBuscamos

// --- ARRAYS
let mascotas = []
let botonesAtaques = []
let ataqueJugador = []
let ataqueEnemigo = []

// --- Integración de Objetos en los Arrays
let ukato = new Xaliburz("Ukato", 3, "https://img.pokemondb.net/sprites/black-white/normal/bisharp.png")
let tinkaton = new Xaliburz("Tinkaton", 3, "https://img.pokemondb.net/sprites/scarlet-violet/normal/tinkaton.png")
let ratigueya = new Xaliburz("Ratigueya", 3, "./assets/mokepons_mokepon_ratigueya_attack.png")

let ukatoEnemigo = new Xaliburz("Ukato", 3, "https://img.pokemondb.net/sprites/black-white/normal/bisharp.png")
let tinkatonEnemigo = new Xaliburz("Tinkaton", 3, "https://img.pokemondb.net/sprites/scarlet-violet/normal/tinkaton.png")
let ratigueyaEnemigo = new Xaliburz("Ratigueya", 3, "./assets/mokepons_mokepon_ratigueya_attack.png")


// --- Pensar en esta sección???
ukato.ataques.push(
    { nombre: "Fuego", id: "boton-fuego" },
    { nombre: "Fuego", id: "boton-fuego" },
    { nombre: "Fuego", id: "boton-fuego" },
    { nombre: "Agua", id: "boton-agua" },
    { nombre: "Tierra", id: "boton-tierra" }
)

tinkaton.ataques.push(
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

mascotas.push(ukato, tinkaton, ratigueya)



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
sectionMapa.style.display = "none"

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

    inputTinkaton = $("#Tinkaton")
    inputUkato = $("#Ukato")
    inputRatigueya = $("#Ratigueya")
})

// --- FUNCION SELECCIÓN DE LA MASCOTA DEL JUGADOR
function seleccionarMascotaJugador() {

    if (inputTinkaton.checked) {
        mascotaJugador = inputTinkaton.id
        idMascotaJugador.textContent = mascotaJugador
    } else if (inputUkato.checked) {
        mascotaJugador = inputUkato.id
        idMascotaJugador.textContent = mascotaJugador
    } else if (inputRatigueya.checked) {
        mascotaJugador = inputRatigueya.id
        idMascotaJugador.textContent = mascotaJugador
    }

    sectionSeleccionarMascota.style.display = "none"
    sectionMapa.style.display = "flex"
    extraerAtaques(mascotaJugador)
    settingsMapa()
    secuenciaAtaques()
    mostrarImgJugador()
}

// --- FUNCION SELECCIÓN DE LA MASCOTA DEL ENEMIGO
function seleccionarMascotaEnemigo(enemigo) {
 
    const idMascotaEnemiga = $("#mascota-enemiga")
    idMascotaEnemiga.innerHTML = enemigo.nombre
    
}

function objetoMascotaJugador() {
    for (let i = 0; i < mascotas.length; i++) {
        if (mascotas[i].nombre === mascotaJugador) {
            return mascotas[i]
        }
    }
}

function settingsMapa() {
    

    intervalo = setInterval(drawMap, 50)

    window.addEventListener("keydown", pressKey)
    window.addEventListener("keyup", detenerMovimiento)
}

function drawMap() {
    mascotaJugadorObjeto = objetoMascotaJugador()

    mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, canvasMapa.width, canvasMapa.height)
    
    lienzo.drawImage(
        fotoMapa,
        0,
        0,
        canvasMapa.width,
        canvasMapa.height
    )
    mascotaJugadorObjeto.pintarPersonaje()
    tinkatonEnemigo.pintarPersonaje()
    ukatoEnemigo.pintarPersonaje()
    ratigueyaEnemigo.pintarPersonaje()
    if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
        revisarColision(tinkatonEnemigo)
        revisarColision(ukatoEnemigo)
        revisarColision(ratigueyaEnemigo)
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const izquierdaEnemigo = enemigo.x
    const derechaEnemigo = enemigo.x + enemigo.ancho

    const arribaJugador = mascotaJugadorObjeto.y
    const abajoJugador = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const izquierdaJugador = mascotaJugadorObjeto.x
    const derechaJugador = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    
    if (
        abajoJugador < arribaEnemigo ||
        arribaJugador > abajoEnemigo ||
        derechaJugador < izquierdaEnemigo ||
        izquierdaJugador > derechaEnemigo
    ) {
        return;
    }
    detenerMovimiento();
    clearInterval(intervalo);
    sectionPerfilJugadores.style.display = "flex";
    sectionSeleccionarAtaque.style.display = "flex";
    sectionMapa.style.display = "none";
    console.log(enemigo);
    mascotaEnemiga = enemigo.nombre;
    mostrarImgEnemigo();
    seleccionarMascotaEnemigo(enemigo);
}

function moveRight () {
    mascotaJugadorObjeto.velocidadX = 5
}

function moveLeft () {
    mascotaJugadorObjeto.velocidadX = -5
}

function moveUp () {
    mascotaJugadorObjeto.velocidadY = -5
}

function moveDown () {
    mascotaJugadorObjeto.velocidadY = 5
}

function pressKey(event) {
    switch (event.key) {
        case "ArrowRight":
            moveRight()
            break;
        case "ArrowLeft":
            moveLeft()
            break;
        case "ArrowUp":
            moveUp()
            break;
        case "ArrowDown":
            moveDown()
            break;
    }
}

function detenerMovimiento () {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function mostrarImgJugador() {
  
    imgJugador.src = mascotas.find(mascota => mascota.nombre === mascotaJugador).img
}

function mostrarImgEnemigo() {
   
    imgEnemigo.src = mascotas.find(mascota => mascota.nombre === mascotaEnemiga).img
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
 
    let ataqueAleatorio = Aleatoriedad(1, 3)
    
    if (ataqueAleatorio === 3) {
        ataqueEnemigo.push("Tierra")
        console.log(ataqueEnemigo)
    } else if (ataqueAleatorio === 1) {
        ataqueEnemigo.push("Agua")
        console.log(ataqueEnemigo)
    } else {
        ataqueEnemigo.push("Fuego")
        console.log(ataqueEnemigo)
    }   
    iniciarCombate()
}                              

function iniciarCombate() {
    if (ataqueJugador.length === 5) {
        logicaCombate()
        sectionAnuncioCombate.style.display = "flex"
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
            spnVictoriasJugador.textContent = victoriasJugador
        } else {
            calcularResultados(i, i)
            anuncioCombate("Perdiste")
            victoriasEnemigo++
            spnVictoriasEnemigo.textContent = victoriasEnemigo
        }
    }
    checkVictorias()
}

// --- FUNCION VERIFICAR VICTORIAS
function checkVictorias() {
    if (victoriasJugador ===  victoriasEnemigo) {
        resultadoJugador = "<strong>EMPATE! :( </strong>"
        resultadoEnemigo = "<strong>EMPATE! :( </strong>"
        anuncioFinalCombate()
        sectionSeleccionarAtaque.style.display = "none"
        btnReiniciar.style.display = "flex"
    } else if (victoriasJugador > victoriasEnemigo) {
        resultadoEnemigo = "<strong>PERDEDOR!!:(</strong>"
        resultadoJugador = "<strong>GANADOR!!:)</strong>"
        anuncioFinalCombate()
        sectionSeleccionarAtaque.style.display = "none"
        btnReiniciar.style.display = "flex"
    }else {
        resultadoJugador = "<strong>PERDEDOR!!:(</strong>"
        resultadoEnemigo = "<strong>GANADOR!!:)</strong>"
        anuncioFinalCombate()
        sectionSeleccionarAtaque.style.display = "none"
        btnReiniciar.style.display = "flex"
    }
    
}

// --- FUNCION ANUNCIO DEL COMBATE
function anuncioCombate(resultadoCombate) {

    const sAnuncioCombate = $("#anuncio-combate")

    let parrafo = document.createElement("p") 
    parrafo.innerHTML = mascotaJugador + " ataco con " + indexAtaqueJugador + " y " + mascotaEnemiga + " ataco con " + indexAtaqueEnemigo + " - " + resultadoCombate

    sAnuncioCombate.appendChild(parrafo)

}

// --- FUNCION ANUNCIO FINAL DEL COMBATE
function anuncioFinalCombate() {

    let parrafo = document.createElement("p") 
    parrafo.innerHTML = resultadoJugador

    sAnuncioCombateJugador.appendChild(parrafo)

    let parrafo2 = document.createElement("p") 
    parrafo2.innerHTML = resultadoEnemigo

    sAnuncioCombateEnemigo.appendChild(parrafo2)

    //sectionSeleccionarAtaque.style.display = "none"
    //sectionReinicio.style.display = "block"
}

function reiniciarJuego() {
    location.reload()
}


// |--- 3. EVENTOS ---|
btnSeleccionarMascotaJugador.addEventListener("click", seleccionarMascotaJugador)
btnReiniciar.addEventListener("click", reiniciarJuego)



