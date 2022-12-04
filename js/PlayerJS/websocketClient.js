// **********************************************************
// CONEXION CON EL SERVIDOR DE WEBSOCKETS
// **********************************************************

var ws = new WebSocket("ws://localhost:8008")

let defaultUsername = "default"

let msgFormat = {
    action: "none",
    userName: defaultUsername,
    songName: "some song name",
    songAuthor: "some author",
    newIdQueue: "some id"
}


// **********************************************************
// MANEJO DE EVENTOS DE LA CONECCION CON WEBSOCKETS
// **********************************************************

ws.addEventListener("open", () => {
    console.log("[SERVER] We are connected")
})

ws.addEventListener("message", ( {data} ) => {
    let infoDict = JSON.parse(data)

    if (infoDict.action != "none") {
        switch (infoDict.action) {
            case "pause-play":
                changePlayButtonState()
                return
            case "skip-forward":
                nextSong()
                return
            case "skip-backward":
                previousSong()
                return
            case "add-queue":
                console.log("Just send a song")
                addVideoToQueue(infoDict)
                addSongToList(infoDict.songName, infoDict.songAuthor, infoDict.userName)
            default:
                return
        }
    }
    
})

ws.addEventListener("close", () => {
    console.log("[SERVER] We are disconnected")
    reconnectionTry()
})

// **********************************************************
// FUNCIONES DE AYUDA
// **********************************************************

function reconnectionTry() {
    console.log("Retrying connection to server (not really)")
}


// Transforma el buffer de un mensaje (del cliente)
// a un diccionario de strings
function bufferToDictionary(buffer) {
    newString = buffer.toString()
    newDictionary = JSON.parse(newString)
    return newDictionary
}


// Envia el nombre del usuario y el nombre de una cancion
// return: el mensaje a enviar
function sendMusicInfo(action="", songName="",songAuthor="", websocket, videoIdQueue="") {
    msgFormat.action = action
    msgFormat.songName = songName
    msgFormat.songAuthor = songAuthor
    msgFormat.newIdQueue = videoIdQueue
    // console.log(msgFormat)
    websocket.send(JSON.stringify(msgFormat))
}
