// **********************************************************
// CONEXION CON EL SERVIDOR DE WEBSOCKETS
// **********************************************************

var ws = new WebSocket("ws://localhost:8008")

let defaultUsername = "default"
let msgFormat = {
    userName: defaultUsername,
    songData: ""
}


// **********************************************************
// MANEJO DE EVENTOS DE LA CONECCION CON WEBSOCKETS
// **********************************************************

ws.addEventListener("open", () => {
    console.log("[SERVER] We are connected")
})

ws.addEventListener("message", ( {data} ) => {
    console.log(data)
})

ws.addEventListener("close", () => {
    console.log("[SERVER] We are disconnected")
    reconnectionTry()
})

// **********************************************************
// FUNCIONES DE AYUDA
// **********************************************************

// TODO: Make client constantly reconnect to server
function reconnectionTry() {
    console.log("Retrying connection to server (not really)")
}

// Envia el nombre del usuario y el nombre de una cancion
// return: el mensaje a enviar
function sendMusicInfo(songData="", websocket) {
    msgFormat.songData = songData
    let messageSent = websocket.send(JSON.stringify(msgFormat))
    return messageSent
}
