// **********************************************************
// FUNCIONES PARA CONTROLAR REPRODUCTOR
// **********************************************************

function playVideo() {
    player.playVideo()
    changePlayButtonState()
}

function nextVideo() {
    player.nextVideo()
}

function previousVideo() {
    player.previousVideo()
}

function stopVideo() {
    player.stopVideo();
  }

  // btnStates[0] = Reproduciendo
  // btnStates[1] = Pausado
let btnStates = ["Play", "Paused"]
let currentBtnState = "Paused"

function changePlayButtonState() {
  const playBtnElement = document.getElementById("controls-play")

  if (currentBtnState == btnStates[1]){
    playBtnElement.src =  "./resources/svg/pause.png"
    playBtnElement.style.height = "3rem"
    currentBtnState = btnStates[0]
  } else if (currentBtnState == btnStates[0]) {
    playBtnElement.src =  "./resources/svg/play-outline.svg"
    playBtnElement.style.height = "4rem"
    currentBtnState = btnStates[1]
  }
  console.log("Current butto state: " + currentBtnState)
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
