const scripts = [
    'scripts/socket.js',
    'scripts/math.js',
    'scripts/classes/point.js',
    'scripts/classes/line.js',
    'scripts/classes/polyline.js',
    'scripts/classes/polygon.js',
    'scripts/classes/character.js',
    'scripts/classes/button.js',
    'scripts/draw.js',
    'scripts/window.js',
    'scripts/buttons.js',
    'scripts/controls/contextMenu.js',
    'scripts/controls/keyDown.js',
    'scripts/controls/keyUp.js',
    'scripts/controls/mouseDown.js',
    'scripts/controls/mouseUp.js',
    'scripts/controls/mouseMove.js'
]
scripts.forEach((script) => {
    var _script = document.createElement('script');
    _script.setAttribute('src', script);
    document.body.appendChild(_script);
})