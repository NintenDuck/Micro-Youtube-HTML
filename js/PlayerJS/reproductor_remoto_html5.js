  // **********************************************************
// CODE TO MAKE THE INPUT CHECK FOR KEY PRESSES
// (MOSTLY TO WASTE LESS REQUESTS FROM THE YOUTUBE API)
// **********************************************************
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
var apiKey = "AIzaSyCHQfy5B9905FFtqVsANYObvEh9Y9GGZd8"
// var apiKey = "AIzaSyAM7kcyAPdVOcwUUaF_9QwzfqG079iCSpQ"
// var apiKey = "AIzaSyD0bshPcvN0bkILxIM3sZQkgunVZFrTsNE"
var personalID = "VP6isH0l3nLU-NIJs875nw"


// OWN CODE

// **********************************************************
// FUNCION PARA LLAMAR RESULTADOS DE YOUTUBE
// **********************************************************
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


// REGRESA UN ARREGLO CON EL TITULO, EL NOMBRE DEL CANAL DE LA BUSQUEDA
// Y EL ID DE EL MISMO VIDEO EN UN ARRAY
function listToSearchNames(resultsArray = []) {
  namesArray = resultsArray.map(x => {
    titleAuthorArray = [x.snippet.title, x.snippet.channelTitle, x.id.videoId]
    return titleAuthorArray
  })

  return namesArray
}

// ADIERE UNA CANCION A LA LISTA DE REPRODUCCION
// CON LOS SIGUIENTES PARAMETROS:
// @songName: nombre de la cancion:             STRING
// @authorName: nombre del artista:             STRING
// userName: nombre del usuario que la envio:   STRING
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


// TOMA LO QUE HAY EN EL INPUT DEL BUSCADOR
// Y LO ADIERE A LA LISTA DE REPRODUCCION DE ABAJO

function ListSong() {
  inputValue = inputSearch.value
  sName = inputValue.split(",")
  if (inputValue === "") return
  sendMusicInfo("add-queue", sName[0],sName[1], ws, sName[2])
  inputSearch.value = ""
}

// ACTUALIZA LA LISTA DE BUSQUEDAS
// EN EL ELEMENTO DE AUTOCOMPLETE

async function listAutocompleteSearches() {
  searchDataList = document.getElementById("you-search-datalist")
  searchQuery = inputSearch.value

  deleteDatalistOptions(searchDataList)

  newSearchList = await getSearchResults(searchQuery, "short", 10)

  addNewDatalistOptions(newSearchList)
}


// ELIMINA LOS DATOS PREVIOS DEL DATALIST (BUSQUEDAS DE YOUTUBE ANTERIORES)

function deleteDatalistOptions(parentDataList) {
  dataListChildren = parentDataList

  for (let i = 0; i < 7; i++) {                                 // HOT-FIX: HACE UN BUCLE VARIAS VECES
    deleteAllChildren(dataListChildren)                         //          PARA QUE PUEDA ACTUALIZARSE
  }                                                             //          CORRECTAMENTE
}

// ELIMINA TODOS LOS HIJOS DE UN ELEMENTO
// (PRINCIPALMENTE USADO EN LA BUSQUEDA AMPLIADA)

function deleteAllChildren(parentElement) {
  parentElement.innerHTML = ""
}


// ADIERE NUEVOS ELEMENTOS (BUSQUEDAS)
// APARTIR DE UN ARREGLO DE STRINGS

function addNewDatalistOptions(newOptionList) {
  searchDataList = document.getElementById("you-search-datalist")
  newOptionList.forEach(search => {
    newOption = document.createElement("option")
    newOption.value = search[0] + ", " + search[1] + ", " + search[2]
    searchDataList.appendChild(newOption)
  });
}


// BUSQUEDA DE RESULTADOS EN LISTA DE BUSQUEDA EXTENDIDA

async function listYTResults() {
  const ytResultListElement = document.getElementById("search-list-box")

  deleteAllChildren(ytResultListElement)
  
  ytResultListElement.style.display = "flex"
  let ytSearchResults = await getSearchResults(inputSearch.value, "full", 20)
  inputSearch.value = ""
  ytSearchResults.forEach(result => {
    let videoName = result.snippet.title
    let videoChannel = result.snippet.channelTitle
    let videoImageURL = result.snippet.thumbnails.default.url
    let videoID = result.id.videoId

    createYoutubeListElement(videoName, videoChannel, videoImageURL, videoID, ytResultListElement)
  });
}


// ADIERE UN ELEMENTO NUEVO A LA BUSQUEDA EXTENDIDA

function createYoutubeListElement(videoName="", channelName="", imageURL="", videoID="", outputElement) {
  // Creamos los elementos necesarios
  const elementContainer = document.createElement("div")
  const imageElement = document.createElement("img")
  const infoContainer = document.createElement("div")
  const paragraphTitle = document.createElement("p")
  const paragraphChannel = document.createElement("p")
  const paragraphID = document.createElement("p")
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
  paragraphID.textContent = videoID
  addButton.textContent = "Add Song"
  addButton.style.backgroundColor = "palegreen"
  addButton.addEventListener("click", () => {
    sendMusicInfo("add-queue", videoName, channelName, ws, videoID)
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
  infoContainer.appendChild(paragraphID)
  elementContainer.appendChild(imageElement)
  elementContainer.appendChild(infoContainer)
  elementContainer.appendChild(addButton)
  elementContainer.appendChild(addListSongBtn)
  outputElement.appendChild(elementContainer)
}
