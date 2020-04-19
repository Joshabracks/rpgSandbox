document.onkeyup = function (e) {
    console.log(e.keyCode)
    if (e.keyCode == 69) {
        distancer = false
    }
    if (e.code == "Space") {
        drag = false
    }
    if (e.keyCode = 82) {
        roll = false;
    }
}