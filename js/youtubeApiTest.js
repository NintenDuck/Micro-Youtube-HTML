var apiKey = "AIzaSyCveHlrpaGLt35eFLOrX2WeemPJS1GZDv4"
var personalID = "VP6isH0l3nLU-NIJs875nw"


async function getSearchResults() {
    searchBox = document.getElementById("search-bar")
    searchQuery = searchBox.value
    const respuesta = await axios.get("https://www.googleapis.com/youtube/v3/search?",
    {
        params: {
            key: apiKey,
            q: searchQuery,
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
