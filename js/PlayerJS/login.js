const loginElement = document.getElementById("user-input-container")
const loginInput = document.getElementById("user-input")
const loginButton = document.getElementById("user-button")
const busquedaElement = document.getElementById("busqueda")
const playerControlsElement = document.getElementById("controles-reproduccion")
const clearPlaylistBtn = document.getElementById("btn-clear-playlist")

loginButton.addEventListener("click", () => {
    login()
})

function login() {
    if (loginElement.value === "") return

    msgFormat.userName = loginInput.value
    loginElement.style.display = "none"
    busquedaElement.style.display = "flex"
    playerControlsElement.style.display = "flex"
    clearPlaylistBtn.style.display = "block"
    // console.log(msgFormat)
}
