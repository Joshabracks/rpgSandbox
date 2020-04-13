document.addEventListener('wheel', function (e) {
    if (e.deltaY > 0) {
        if (zoom > 0.1) {
            zoom -= 0.1
            rush = true;
            drawScreen()
        }
    } else {
        if (zoom < 10) {
            zoom += 0.1
            rush = true;
            drawScreen()
        }
    }
})