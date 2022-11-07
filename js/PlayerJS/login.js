const loginElement = document.getElementById("user-input-container")
const loginInput = document.getElementById("user-input")
const loginButton = document.getElementById("user-button")
const busquedaElement = document.getElementById("busqueda")


loginButton.addEventListener("click", () => {
    login()
})

function login() {
    if (loginElement.value === "") return

    msgFormat.userName = loginInput.value
    loginElement.style.display = "none"
    busquedaElement.style.display = "flex"
    // console.log(msgFormat)
}
