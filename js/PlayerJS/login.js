const loginElement = document.getElementById("user-input-container")
const loginInput = document.getElementById("user-input")
const loginButton = document.getElementById("user-button")

loginButton.addEventListener("click", () => {
    if (loginElement.value === "") return

    msgFormat.userName = loginInput.value
    console.log(loginElement.value)
    loginElement.style.display = "none"
    sendMusicInfo("", ws)
})
