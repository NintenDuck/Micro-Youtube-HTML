// **********************************************************
// FUNCIONES PARA CONTROLAR REPRODUCTOR
// **********************************************************

function playSong() {
    
    changePlayButtonState()
}

function nextVideo() {
    player.nextVideo()
}

function previousVideo() {
    player.previousVideo()
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

// TODO: Make functions modular
let currentBtnState = btnStates["Paused"]

function changePlayButtonState() {
  const playBtnElement = document.getElementById("controls-play")

  if (currentBtnState == btnStates["Paused"]){
    playBtnElement.src =  "./resources/svg/pause.png"
    playBtnElement.style.height = "3rem"
    
    currentBtnState = btnStates["Playing"]
    player.playVideo()
  } else if (currentBtnState == btnStates["Playing"]) {
    playBtnElement.src =  "./resources/svg/play-outline.svg"
    playBtnElement.style.height = "4rem"
    
    currentBtnState = btnStates["Paused"]
    player.pauseVideo()
  }

  return currentBtnState
}

// **********************************************************
// CODIGO IFRAME API
// **********************************************************

function onload(){
    onYouTubeIframeAPIReady()
}

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '400px',
    width: '250',
    videoId: 'knp2WGkIpLw',
    playerVars: {
        playlist: 'knp2WGkIpLw,qelGSWu4s_U'
    },
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}
