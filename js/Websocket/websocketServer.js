const WebSocket = require("ws")

const wss = new WebSocket.Server({port: 8008})

wss.on("connection", (ws) => {
    console.log("New client connected!")

    ws.on("message", data => {
        console.log(`Client just sent this message: ${data}`)

        ws.send(data.toString())
    })
    
    ws.on("close", () => {
        console.log("Client has disconnected")
    })
})
