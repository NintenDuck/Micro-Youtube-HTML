const ws = new WebSocket("ws://localhost:8008")

let username = "Lain"
let msgFormat = {
    userName: username,
    message: ""
}

// let stringifiedMsg = JSON.stringify(msgFormat)
// console.log(stringifiedMsg)
// console.log(typeof(stringifiedMsg))

ws.addEventListener("open", () => {
    console.log("We are connected")
    
    ws.send(JSON.stringify(msgFormat))
})

ws.addEventListener("message", ({ dataReceived }) => {
  console.log(JSON.stringify(dataReceived))
})
