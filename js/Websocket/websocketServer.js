const WebSocket = require("ws")

const wss = new WebSocket.Server({
    port: 8008
})

usersConnected = 0

wss.on("connection", (ws) => {
    countUsersConnected(ws)

    ws.on("message", data => {onMessage(data, ws)})

    ws.on("close", () => {onCloseConnection()})
})


function countUsersConnected(websocket) {
    usersConnected += 1
    serverMessage("New client just connected")
    serverMessage("Clients connected: " + usersConnected)
}
function onMessage(messageData, websocket) {
    serverMessage("Client just sent this message:")
    console.log(messageData)

    websocket.send("[SERVER] You have connected succesfully to the server!")
}
function onCloseConnection() {
    console.log("Client has disconnected")
    usersConnected -= 1
    serverMessage(`[SERVER] Clients connected: ${usersConnected}`)
}


function serverMessage(message) {
    console.log(`[SERVER] ${message}`)
}
