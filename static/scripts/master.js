let scripts = [
    '/socket/socket.io.js',
    'scripts/math.js',
    'scripts/classes/point.js',
    'scripts/classes/line.js',
    'scripts/classes/polyline.js',
    'scripts/classes/polygon.js',
    'scripts/classes/character.js',
    'scripts/classes/button.js',
    'scripts/classes/tile.js',
    'scripts/classes/map.js',
    'scripts/classes/trees.js',
    'scripts/classes/dice.js',
    'scripts/buttons.js',
    'scripts/draw.js',
    'scripts/window.js',
    'scripts/socket.js',
    'scripts/controls/contextMenu.js',
    'scripts/controls/keyDown.js',
    'scripts/controls/keyUp.js',
    'scripts/controls/mouseDown.js',
    'scripts/controls/mouseUp.js',
    'scripts/controls/mouseMove.js',
    'scripts/controls/wheel.js'
]

let renderContainer = document.getElementById('renderContainer');
let svgContainer = document.getElementById('svgContainer');
// renderContainer.style.visibility  = "hidden";

function scriptLoader(int, el) {
    if (scripts[int] != undefined ) {
        var script = scripts[int];
        var _script = document.createElement('script');
        _script.setAttribute('src', script);
        _script.setAttribute('onload', "scriptLoader(" + (int + 1) + ", this)");
        document.body.appendChild(_script);
    } else {
        let master = document.getElementById("master");
        master.remove();
        scripts = false;
        scriptLoader = false;
    }
    if (el) {
        el.remove();
    }
}

scriptLoader(0);

let zoom = 1;
let reRender = true;