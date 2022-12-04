let currentQueueId = -1
let videoQueue = []

function loadPrevVideo() {
  currentQueueId -= 1

  let newVideoId = videoQueue[currentQueueId].newIdQueue
  newVideoId = newVideoId.split(" ").join("")
  player.loadVideoById( newVideoId, 0, "small" )

  let newVideoName = videoQueue[currentQueueId].songName
  let newVideoAuthor = videoQueue[currentQueueId].songAuthor
  updateVideoData(newVideoName, newVideoAuthor)
}


function updateVideoData(videoName = "Some Video", videoOwner = "Owner") {
  let songNameElem = document.getElementById("id-nombre-cancion")
  let songAuthorElem = document.getElementById("id-nombre-artista")
  songNameElem.textContent = videoName
  songAuthorElem.textContent = videoOwner
}


function clearPlaylist() {
  console.log("Aun no implementado")
}


function loadNextVideo() {
  currentQueueId += 1

  let newVideoId = videoQueue[currentQueueId].newIdQueue
  newVideoId = newVideoId.split(" ").join("")
  player.loadVideoById( newVideoId, 0, "small" )

  let newVideoName = videoQueue[currentQueueId].songName
  let newVideoAuthor = videoQueue[currentQueueId].songAuthor
  updateVideoData(newVideoName, newVideoAuthor)
}

function addVideoToQueue(youtubeDictionary) {
  videoQueue.push(youtubeDictionary)
  console.log(videoQueue)
}
