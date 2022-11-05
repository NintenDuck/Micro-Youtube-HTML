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


function countUsersConnected() {
    usersConnected += 1
    serverMessage("New client just connected")
    serverMessage("Clients connected: " + usersConnected)
}

function onMessage(messageData, websocket) {
    msgDict = bufferToDictionary(messageData)
    serverMessage("Client just sent this data:")
    console.log(msgDict)
    websocket.send("[SERVER] You are connected to the server")
}
function onCloseConnection(disconnectReason) {
    serverMessage("Client has disconnected")
    usersConnected -= 1
    serverMessage(`Clients connected: ${usersConnected}`)
}


function bufferToDictionary(buffer) {
    newString = buffer.toString()
    newDictionary = JSON.parse(newString)
    return newDictionary
}

function serverMessage(message) {
    console.log(`[SERVER] ${message}`)
}
