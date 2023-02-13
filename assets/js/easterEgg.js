let easterEggVar = document.querySelector("#profile");
function easterEgg() {
    easterEggVar.classList.toggle("easterEgg")
}
easterEggVar.addEventListener("click", easterEgg);