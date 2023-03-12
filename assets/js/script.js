let denied = document.querySelector(".denied");
let errorBox = document.querySelector("#unavailableDiv");
denied.addEventListener("click", notAllowed);
function notAllowed() {
    errorBox.classList.remove("none");
    setTimeout(() => {
        errorBox.classList.add("none");
    }, 5000);
}