// **********************************************************
// YOUTUBE IFRAME API
// **********************************************************

function onload(){
    onYouTubeIframeAPIReady()
}

var player
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '400px',
    width: '250',
    videoId: 'bmVCETBG1DQ',
    // playerVars: {
    //     playlist: 'knp2WGkIpLw,qelGSWu4s_U'
    // },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChanged
    }
  })
}


function onPlayerStateChanged(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    currentBtnState = btnStates["Playing"]
  }
  else if (event.data == YT.PlayerState.PAUSED) {
    currentBtnState = btnStates["Paused"]
  }
  // TODO: Make this thing play next song
  else if ( event.data == YT.PlayerState.ENDED ) {
    loadNextVideo()
  }
}


function onPlayerReady(event) {
  event.target.setVolume(100)
  // event.target.playVideo()
}
