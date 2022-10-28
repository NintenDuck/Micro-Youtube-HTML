// **********************************************************
// YOUTUBE IFRAME API
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
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChanged
    }
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}
