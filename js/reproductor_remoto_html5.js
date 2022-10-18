var apiKey = "AIzaSyCveHlrpaGLt35eFLOrX2WeemPJS1GZDv4"
var personalID = "VP6isH0l3nLU-NIJs875nw"

function load() {
  onYouTubeIframeAPIReady();
}
var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('video-youtube-empotrado', {
    width: '400px',
    height: '250px',
    videoId: 'l4A1EzoXzFw',
    playerVars: {
      color: 'white',
      playlist: 'l4A1EzoXzFw,l4A1EzoXzFw'
    },
    events: {
      onReady: initializar
    }
  });
}

function initializar() {
  // Update the controls on load
  updateTimerDisplay();
  updateProgressBar();

  // Clear any old interval.
  clearInterval(time_update_interval);

  // Start interval to update elapsed time display and
  // the elapsed part of the progress bar every second.
  time_update_interval = setInterval(function () {
    updateTimerDisplay();
    updateProgressBar();
  }, 1000);
}
// This function is called by initialize()
function updateTimerDisplay() {
  // Update current time text display.
  $("#current-time").text(formatTime(player.getCurrentTime()));
  $("#duration").text(formatTime(player.getDuration()));
}

function formatTime(time) {
  time = Math.round(time);

  var minutes = Math.floor(time / 60),
    seconds = time - minutes * 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;

  return minutes + ":" + seconds;
}
$("#progress-bar").on("mouseup touchend", function (e) {
  // Calculate the new time for the video.
  // new time in seconds = total duration in seconds * ( value of range input / 100 )
  var newTime = player.getDuration() * (e.target.value / 100);

  // Skip video to new time.
  player.seekTo(newTime);
});
// This function is called by initialize()
function updateProgressBar() {
  // Update the value of our progress bar accordingly.
  $("#progress-bar").val(
    (player.getCurrentTime() / player.getDuration()) * 100
  );
}
$("#play").on("click", function () {
  player.playVideo();
});

$("#pause").on("click", function () {
  player.pauseVideo();
});
$("#mute-toggle").on("click", function () {
  var mute_toggle = $(this);

  if (player.isMuted()) {
    player.unMute();
    mute_toggle.text("volume_up");
  } else {
    player.mute();
    mute_toggle.text("volume_off");
  }
});
$("#volume-input").on("change", function () {
  player.setVolume($(this).val());
});
$("#speed").on("change", function () {
  player.setPlaybackRate($(this).val());
});
$("#next").on("click", function () {
  player.nextVideo();
});

$("#prev").on("click", function () {
  player.previousVideo();
});

// OWN CODE


async function foo() {
  console.log("love lain")
  // searchBox = document.getElementById("search-bar")
  // searchQuery = searchBox.value
  const respuesta = await axios.get("https://www.googleapis.com/youtube/v3/search?",
  {
      params: {
          key: apiKey,
          q: "minecraft",
          part: "snippet",
          order: "relevance",
          maxResults: 5,
          type: "music"
      }
  })
  if (respuesta.status === 200){
      const busqueda = await respuesta.data.items
      console.log(busqueda)
      return busqueda
  } else {
      console.log("[ERROR] Ocurrio algo en la solicitud")
  }
}


function addSongToList(songName, authorName, userName) {
  let playListContainer = document.getElementById("playlist-container")

  // new 'Song-List'
  let newListSong = document.createElement("div")
  newListSong.className = "item-reproduccion"

  // Create and assign value to new elements
  heartIcon = document.createElement("img")
  heartIcon.src = "./resources/svg/heart-outline.svg"
  heartIcon.style.height = "2rem"
  heartIcon.addEventListener("mouseover", () => {
    heartIcon.style.cursor = "pointer"
  })
  songNameElement = document.createElement("div")
  songNameElement.id = "song-name"
  songNameElement.textContent = songName
  authorNameElement = document.createElement("div")
  authorNameElement.id = "artist-name"
  authorNameElement.textContent = authorName
  userNameElement = document.createElement("div")
  userNameElement.id = "user-name"
  userNameElement.textContent = userName
  trashIcon = document.createElement("img")
  trashIcon.id = "trash-btn"
  trashIcon.src = "./resources/svg/trash-outline.svg"
  trashIcon.style.height = "2rem"
  trashIcon.addEventListener("mouseover", () => {
    trashIcon.style.cursor = "pointer"
  })
  trashIcon.addEventListener("click", () => {
    newListSong.remove()
  })

  // Add All Elements to 'newListSong'
  newListSong.appendChild(heartIcon)
  newListSong.appendChild(songNameElement)
  newListSong.appendChild(authorNameElement)
  newListSong.appendChild(userNameElement)
  newListSong.appendChild(trashIcon)

  // Add newListofSongs to PlayListContainer
  playListContainer.appendChild(newListSong)
}

function listarCanciones() {
  addSongToList("That's Life", "Frank Sinatra", "@Lain_Iwakura")
  addSongToList("I love you Baby", "Frank Sinatra", "@Lain_Iwakura")
  addSongToList("Bohemian Raphsody", "Queen", "@Lain_Iwakura")
  addSongToList("Killer Queen", "Queen", "@Lain_Iwakura")
  addSongToList("Another One Bites the Dust", "Queen", "@Lain_Iwakura")
}



function listSearches(){
  loremList = [
    "lain",
    "lorem",
    "ipsum",
    "lenneth"
  ]

  searchDataList = document.getElementById("you-search-datalist")
  newSearchList = loremList

  deleteDatalistOptions(searchDataList)
  addNewOptions(newSearchList)
	console.log("DataList Updated")
}

function deleteDatalistOptions(parentDataList) {
  dataListChildren = parentDataList.childNodes
  
  for (let i = 0; i < 5; i++) {
    dataListChildren.forEach(children => {
      children.remove()
    })
  }

  console.log(dataListChildren)
  console.log("[REMOVED] Removed all elements from datalist")

}

function addNewOptions(newOptionList) {
  searchDataList = document.getElementById("you-search-datalist")
  newOptionList.forEach(search => {
    newOption = document.createElement("option")
    newOption.value = search
		searchDataList.appendChild(newOption)
  });

	console.log(searchDataList.childNodes)
}


function searchSong() {
  inputElement = document.getElementById("search-bar")
  inputContent = inputElement.value
  
  if ( inputContent == "" ) return

  alert("Searching: " + inputContent + "...")
}


const loremNames = [
  "Ayla",
  "Jake",
  "Sean",
  "Henry",
  "Brad",
  "Stephen",
  "Taylor",
  "Timmy",
  "Cathy",
  "John",
  "Amanda",
  "Amara",
  "Sam",
  "Sandy",
  "Danny",
  "Ellen",
  "Camille",
  "Chloe",
  "Emily",
  "Nadia",
  "Mitchell",
  "Harvey",
  "Lucy",
  "Amy",
  "Glen",
  "Peter",
 ]
