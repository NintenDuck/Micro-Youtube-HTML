// **********************************************************
// DECLARACION DEL SERVIDOR
// **********************************************************

const WebSocket = require("ws")

const wss = new WebSocket.Server({
    port: 8008
})

usersConnected = 0

wss.on("connection", (ws) => {
    countUsersConnected()

    ws.on("message", data => {onMessage(data, ws)})
    ws.on("close", reason => {onCloseConnection(reason)})
})

// **********************************************************
// FUNCIONES PARA CONTROLAR LOS ESTADOS DEL WEBSOCKET SERVER
// **********************************************************

function countUsersConnected() {
    usersConnected += 1
    serverMessage("New client just connected")
    serverMessage("Clients connected: " + usersConnected)
}

function onMessage(messageData, websocket) {
    msgDict = bufferToDictionary(messageData)

    wss.clients.forEach(client => {
        let finalMessage = JSON.stringify(msgDict)
        client.send(finalMessage)
    });

    serverMessage("Client just sent this data:")
    console.log(msgDict)
}
function onCloseConnection(disconnectReason) {
    serverMessage("Client has disconnected")
    usersConnected -= 1
    serverMessage(`Clients connected: ${usersConnected}`)
}

// **********************************************************
// FUNCIONES DE AYUDA
// **********************************************************

// Transforma el buffer de un mensaje (del cliente)
// a un diccionario de strings
function bufferToDictionary(buffer) {
    newString = buffer.toString()
    newDictionary = JSON.parse(newString)
    return newDictionary
}

// Funcion debug para imprimir algo como "Servidor"
function serverMessage(message) {
    console.log(`[SERVER] ${message}`)
}
