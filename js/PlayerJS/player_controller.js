// **********************************************************
// HACER QUE EN CLICK CAMBIE WEA
// **********************************************************

const skipForwardBtn = document.getElementById("controls-next")
const skipPrevBtn = document.getElementById("controls-prev")
const playBtn = document.getElementById("controls-play")

playBtn.addEventListener("mousedown", () => {playBtn.src = "./resources/svg/ellipse.svg"})
playBtn.addEventListener("mouseup", () => {playBtn.src = "./resources/svg/play-circle-outline.svg"})
skipForwardBtn.addEventListener("mousedown", () => {skipForwardBtn.src = "./resources/svg/ellipse.svg"})
skipForwardBtn.addEventListener("mouseup", () => {skipForwardBtn.src = "./resources/svg/play-skip-forward-circle-outline.svg"})
skipPrevBtn.addEventListener("mousedown", () => {skipPrevBtn.src = "./resources/svg/ellipse.svg"})
skipPrevBtn.addEventListener("mouseup", () => {skipPrevBtn.src = "./resources/svg/play-skip-back-circle-outline.svg"})

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
  "Stopped": 0,
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
}

let currentBtnState = btnStates["Paused"]

function changePlayButtonState() {
  const playBtnElement = document.getElementById("controls-play")

  if (currentBtnState == btnStates["Paused"]){
    playBtnElement.src =  "./resources/svg/pause-circle-outline.svg"
    playBtnElement.style.height = "4rem"
    
    // currentBtnState = btnStates["Playing"]
    player.playVideo()
  } else if (currentBtnState == btnStates["Playing"]) {
    playBtnElement.src =  "./resources/svg/play-circle-outline.svg"
    playBtnElement.style.height = "4rem"
    
    // currentBtnState = btnStates["Paused"]
    player.pauseVideo()
  }

  return currentBtnState
}
