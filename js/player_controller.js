// **********************************************************
// FUNCIONES PARA CONTROLAR REPRODUCTOR
// **********************************************************

function playSong() {
    changePlayButtonState()
}

function nextVideo() {
    player.nextVideo()
    changePlayButtonState()
  }
  
  function previousVideo() {
    player.previousVideo()
    changePlayButtonState()
}

function pauseSong() {
    player.pauseVideo();
}

// MANEJO DEL BOTON DE REPRODUCCION
const btnStates = {
  "Stopped":0,
  "Playing": 1,
  "Paused": 2
}

function onPlayerStateChanged(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    currentBtnState = btnStates["Playing"]
  }
  else if (event.data == YT.PlayerState.PAUSED) {
    currentBtnState = btnStates["Paused"]
  }
  else console.log("[REPRODUCTOR] Me encuentro en el estado: " + event.data)
}

let currentBtnState = btnStates["Paused"]

function changePlayButtonState() {
  const playBtnElement = document.getElementById("controls-play")

  if (currentBtnState == btnStates["Paused"]){
    playBtnElement.src =  "./resources/svg/pause.png"
    playBtnElement.style.height = "2.5rem"
    
    // currentBtnState = btnStates["Playing"]
    player.playVideo()
  } else if (currentBtnState == btnStates["Playing"]) {
    playBtnElement.src =  "./resources/svg/play-outline.svg"
    playBtnElement.style.height = "4rem"
    
    // currentBtnState = btnStates["Paused"]
    player.pauseVideo()
  }

  return currentBtnState
}
