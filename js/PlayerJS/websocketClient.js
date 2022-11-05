var ws = new WebSocket("ws://localhost:8008")

let defaultUsername = "default"
let msgFormat = {
    userName: defaultUsername,
    songData: ""
}


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

// TODO: Make client constantly reconnect to server
function reconnectionTry() {
    console.log("Retrying connection to server (not really)")
}

function sendMusicInfo(songData="", websocket) {
    msgFormat.songData = songData
    let messageSent = websocket.send(JSON.stringify(msgFormat))
    return messageSent
}
