// |--- 0. Configuraciones Del Codigo!
// --- Configuración de Supabase
const supabaseUrl = 'https://lpmtedwdwmdwvozgsymb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwbXRlZHdkd21kd3ZvemdzeW1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0OTE1NDAsImV4cCI6MjA5NDA2NzU0MH0.9B9qYSMRpfjz9e_PKso1A3QMYIM1vagQKM2vzOJqCdA';
const supabaseConexion = supabase.createClient(supabaseUrl, supabaseKey);

// --- Clases (Los Moldes) 
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
const spnVictoriasJugador = $("#victorias-jugador")
const spnVictoriasEnemigo = $("#victorias-enemigo")
const sAnuncioCombateJugador = $("#resultado-jugador")
const sAnuncioCombateEnemigo = $("#resultado-enemigo")
const imgJugador = $("#img-jugador")
const imgEnemigo = $("#img-enemigo")

// --- VARIABLES GLOBALES
let name;
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
let victoriasJugador = 0
let victoriasEnemigo = 0

// --- ARRAYS
let mascotas = []
let botonesAtaques = []
let ataqueJugador = []
let ataqueEnemigo = []

// --- Integración de Objetos en los Arrays
let ukato = new Xaliburz("Ukato", 3, "https://img.pokemondb.net/sprites/black-white/normal/bisharp.png")
let tinkaton = new Xaliburz("Tinkaton", 3, "https://img.pokemondb.net/sprites/scarlet-violet/normal/tinkaton.png")
let ratigueya = new Xaliburz("Ratigueya", 3, "./assets/mokepons_mokepon_ratigueya_attack.png")

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

    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
}

// --- FUNCION SELECCIÓN DE LA MASCOTA DEL ENEMIGO
function seleccionarMascotaEnemigo() {
 
    const idMascotaEnemiga = $("#mascota-enemiga")
    let mascotaAleatoriaEnemiga = Aleatoriedad(0, mascotas.length - 1)
    
    idMascotaEnemiga.innerHTML = mascotas[mascotaAleatoriaEnemiga].nombre
    mascotaEnemiga = mascotas[mascotaAleatoriaEnemiga].nombre

    sectionSeleccionarMascota.style.display = "none"
    sectionPerfilJugadores.style.display = "flex"
    sectionSeleccionarAtaque.style.display = "flex"
    
    secuenciaAtaques()
    mostrarImgJugador()
    mostrarImgEnemigo()
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
 
    let ataqueAleatorio = Aleatoriedad(0, ataqueEnemigo.length - 1)
    
    if (ataqueAleatorio === 0 || ataqueAleatorio === 1) {
        ataqueEnemigo.push("Fuego")
        console.log(ataqueEnemigo)
    } else if (ataqueAleatorio === 2 || ataqueAleatorio === 3) {
        ataqueEnemigo.push("Agua")
        console.log(ataqueEnemigo)
    } else {
        ataqueEnemigo.push("Tierra")
        console.log(ataqueEnemigo)
    }   
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

async function probarConexion() {
    // Intentamos pedir los perfiles (aunque la tabla esté vacía)
    const { data, error } = await supabase
        .from('perfiles')
        .select('*');

    if (error) {
        console.log("❌ Error de conexión:", error.message);
    } else {
        console.log("✅ ¡Conexión exitosa! Datos recibidos:", data);
    }
}
probarConexion();
