// Code to make the input check for key presses
const inputSearch = document.getElementById("search-bar")
let typeCounter = 0
let typeCounterMax = 3

inputSearch.value = ""

inputSearch.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    ListSong()
    return
  }
  typeCounter += 1
  // console.log("Typing counter: " + typeCounter)
  if (typeCounter >= typeCounterMax) {
    listAutocompleteSearches()
    typeCounter = 0
  }
})

// Youtube API stuff
// var apiKey = "AIzaSyCHQfy5B9905FFtqVsANYObvEh9Y9GGZd8"
// var apiKey = "AIzaSyAM7kcyAPdVOcwUUaF_9QwzfqG079iCSpQ"
var apiKey = "AIzaSyD0bshPcvN0bkILxIM3sZQkgunVZFrTsNE"
var personalID = "VP6isH0l3nLU-NIJs875nw"

// var player;

// function onYouTubeIframeAPIReady() {
//   player = new YT.Player('video-youtube-empotrado', {
//     width: '400px',
//     height: '250px',
//     videoId: 'knp2WGkIpLw',
//     playerVars: {
//       color: 'white',
//       playlist: 'knp2WGkIpLw,qelGSWu4s_U'
//     },
//     events: { 
//       onReady: initializar
//     }
//   });
// }

// function initializar() {
//   // Update the controls on load
//   updateTimerDisplay();
//   updateProgressBar();

//   // Clear any old interval.
//   clearInterval(time_update_interval);

//   // Start interval to update elapsed time display and
//   // the elapsed part of the progress bar every second.
//   time_update_interval = setInterval(function () {
//     updateTimerDisplay();
//     updateProgressBar();
//   }, 1000);
// }
// // This function is called by initialize()
// function updateTimerDisplay() {
//   // Update current time text display.
//   $("#current-time").text(formatTime(player.getCurrentTime()));
//   $("#duration").text(formatTime(player.getDuration()));
// }

// function formatTime(time) {
//   time = Math.round(time);

//   var minutes = Math.floor(time / 60),
//     seconds = time - minutes * 60;

//   seconds = seconds < 10 ? "0" + seconds : seconds;

//   return minutes + ":" + seconds;
// }
// $("#progress-bar").on("mouseup touchend", function (e) {
//   // Calculate the new time for the video.
//   // new time in seconds = total duration in seconds * ( value of range input / 100 )
//   var newTime = player.getDuration() * (e.target.value / 100);

//   // Skip video to new time.
//   player.seekTo(newTime);
// });
// // This function is called by initialize()
// function updateProgressBar() {
//   // Update the value of our progress bar accordingly.
//   $("#progress-bar").val(
//     (player.getCurrentTime() / player.getDuration()) * 100
//   );
// }
// $("#play").on("click", function () {
//   player.playVideo();
// });

// $("#pause").on("click", function () {
//   player.pauseVideo();
// });
// $("#mute-toggle").on("click", function () {
//   var mute_toggle = $(this);

//   if (player.isMuted()) {
//     player.unMute();
//     mute_toggle.text("volume_up");
//   } else {
//     player.mute();
//     mute_toggle.text("volume_off");
//   }
// });
// $("#volume-input").on("change", function () {
//   player.setVolume($(this).val());
// });
// $("#speed").on("change", function () {
//   player.setPlaybackRate($(this).val());
// });
// $("#next").on("click", function () {
//   player.nextVideo();
// });

// $("#prev").on("click", function () {
//   player.previousVideo();
// });

// OWN CODE
// Actual functions
async function getSearchResults(querySearch, searchTypeDefault = "short", suggestionAmount = 10) {
  try {
    const respuesta = await axios.get("https://www.googleapis.com/youtube/v3/search?", {
      params: {
        key: apiKey,
        q: querySearch,
        part: "snippet",
        order: "relevance",
        maxResults: suggestionAmount,
        type: "music"
      }
    })
    if (respuesta.status === 200) {
      const busqueda = await respuesta.data.items
      // console.log(busqueda)
      if (searchTypeDefault === "short"){
        return listToSearchNames(busqueda)
      } else {
        return busqueda
      }
    } else {
      console.log("[ERROR] Ocurrio algo en la solicitud")
    }
  } catch (error) {
    console.log("API no autorizo peticion")   
  }
}


function listToSearchNames(resultsArray = []) {
  namesArray = resultsArray.map(x => {
    titleAuthorArray = [x.snippet.title, x.snippet.channelTitle]
    return titleAuthorArray
  })

  return namesArray
}


function addSongToList(songName, authorName, userName) {
  const playListContainer = document.getElementById("playlist-container")

  // new 'Song-List'
  const newListSong = document.createElement("div")
  newListSong.className = "item-reproduccion"

  // Create and assign value to new elements
  const heartIcon = document.createElement("img")
  heartIcon.src = "./resources/svg/heart-dislike-outline.svg"
  heartIcon.style.height = "2rem"
  heartIcon.addEventListener("mouseover", () => {
    heartIcon.style.cursor = "pointer"
  })

  let hearthIconState = false

  heartIcon.addEventListener("click", () => {
    if (hearthIconState === false) {
      heartIcon.src = "resources/svg/heart-outline.svg"
      hearthIconState = true
    } else {
      heartIcon.src = "resources/svg/heart-dislike-outline.svg"
      hearthIconState = false
    }
  })

  const songNameElement = document.createElement("div")
  songNameElement.id = "song-name"
  songNameElement.textContent = songName
  const authorNameElement = document.createElement("div")
  authorNameElement.id = "artist-name"
  authorNameElement.textContent = authorName
  const userNameElement = document.createElement("div")
  userNameElement.id = "user-name"
  userNameElement.textContent = userName
  const trashIcon = document.createElement("img")
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


function ListSong() {
  inputValue = inputSearch.value
  sName = inputValue.split(",")
  if (inputValue === "") return

  addSongToList(sName[0], sName[1], "@Andres")
  inputSearch.value = ""
}


async function listAutocompleteSearches() {
  searchDataList = document.getElementById("you-search-datalist")
  searchQuery = inputSearch.value

  deleteDatalistOptions(searchDataList)

  newSearchList = await getSearchResults(searchQuery, "short", 10)
  // Aqui hay que hacer que se imprima el nombre de la cancion
  // y despues el autor

  // newSearchList = newSearchList.sort()
  // console.log(newSearchList)

  addNewDatalistOptions(newSearchList)
}


function deleteDatalistOptions(parentDataList) {
  dataListChildren = parentDataList

  for (let i = 0; i < 7; i++) {
    deleteAllChildren(dataListChildren)
  }
}

function deleteAllChildren(parentElement) {
  parentElement.innerHTML = ""
}

function addNewDatalistOptions(newOptionList) {
  searchDataList = document.getElementById("you-search-datalist")
  newOptionList.forEach(search => {
    newOption = document.createElement("option")
    // search[0] = song title
    // search[1] = song channel/author
    newOption.value = search[0] + ", " + search[1]
    searchDataList.appendChild(newOption)
  });
}


// BUSQUEDA DE RESULTADOS EN LISTA (LA WEA QUE TIENE OVERFLOW)

async function listYTResults() {
  const ytResultListElement = document.getElementById("search-list-box")

  deleteAllChildren(ytResultListElement)
  
  console.log("En teoria se deberia haber limpiado el input lmao")
  // Mostramos la caja de resultados
  ytResultListElement.style.display = "flex"
  // Llamamos la busqueda de la API (y sus resultados)
  let ytSearchResults = await getSearchResults(inputSearch.value, "full", 20)
  inputSearch.value = ""
  // console.log(ytSearchResults)
  // Por cada resultado en la busqueda
  ytSearchResults.forEach(result => {
    // Asignamos: Resultado, Nombre del canal y Thumbnail a variables
    let videoName = result.snippet.title
    let videoChannel = result.snippet.channelTitle
    let videoImageURL = result.snippet.thumbnails.default.url

    // console.log("Video: " + videoName + "Channel: " + videoChannel + "Image URL: " + videoImageURL)
    // Creamos una elemento dentro de la caja de busqueda
    createYoutubeListElement(videoName, videoChannel, videoImageURL, ytResultListElement)
  });
}


function createYoutubeListElement(videoName = "", channelName = "", imageURL = "", outputElement) {
  // Creamos los elementos necesarios
  const elementContainer = document.createElement("div")
  const imageElement = document.createElement("img")
  const infoContainer = document.createElement("div")
  const paragraphTitle = document.createElement("p")
  const paragraphChannel = document.createElement("p")
  const addButton = document.createElement("button")
  const addListSongBtn = document.createElement("button")
  
  // Asignamos clases e id's
  elementContainer.className = "search-elements-container"
  imageElement.style.height = "6rem"
  infoContainer.className = "search-element-info"
  
  // Asignamos los valores a los elementos correspondientes (vease: nombre del video, canal y thumbnail)
  imageElement.src = imageURL
  paragraphTitle.textContent = videoName
  paragraphChannel.textContent = channelName
  paragraphChannel.style.color = "antiquewhite"
  addButton.textContent = "Add Song"
  addButton.style.backgroundColor = "palegreen"
  addButton.addEventListener("click", () => {
    addSongToList(videoName, channelName, "@Andres")
  })
  addListSongBtn.style.backgroundColor = "crimson"
  addListSongBtn.textContent = "Close"
  addListSongBtn.color = "white"
  addListSongBtn.addEventListener("click", () => {
    outputElement.style.display = "none"
  })
  // Adjuntamos los nuevos elementos al HTML
  infoContainer.appendChild(paragraphTitle)
  infoContainer.appendChild(paragraphChannel)
  elementContainer.appendChild(imageElement)
  elementContainer.appendChild(infoContainer)
  elementContainer.appendChild(addButton)
  elementContainer.appendChild(addListSongBtn)
  outputElement.appendChild(elementContainer)
}