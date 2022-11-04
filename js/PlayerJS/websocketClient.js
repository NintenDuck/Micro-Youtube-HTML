let ws = new WebSocket("ws://localhost:8008")

let username = "Lain"
let msgFormat = {
    userName: username,
    message: ""
}


ws.addEventListener("open", () => {
    console.log("[SERVER] We are connected")
    
    sendJsonMessage("Something", ws)
})

ws.addEventListener("message", ( {data} ) => {
    console.log(data)
})

ws.addEventListener("close", () => {
    console.log("[SERVER] We are disconnected")
    reconnectionTry()
})

// TODO: Make client constantly reconnect to server
function reconnectionTry() {
    console.log("Retrying connection to server (not really)")
}

function sendJsonMessage(message="", websocket) {
    msgFormat.message = message
    let messageSent = websocket.send(JSON.stringify(msgFormat))
    return messageSent
}
