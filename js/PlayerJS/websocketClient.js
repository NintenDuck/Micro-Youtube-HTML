const ws = new WebSocket("ws://localhost:8008")

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


function sendJsonMessage(message="", websocket) {
    msgFormat.message = message
    let messageSent = websocket.send(JSON.stringify(msgFormat))
    return messageSent
}
