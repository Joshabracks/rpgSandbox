const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
let width = window.innerWidth
let height = window.innerHeight
canvas.height = height
canvas.width = width
let allFull = false;
let mapWidth = 11;
let mapHeight = 20;
let center = { x: 0, y: 0 }
let originCoord = { x1: 0, y1: 0, x2: 0, y2: 0 }
let drag = false;
let drawing = false;
let clientLoc = { x: 0, y: 0 }
let minStep = 7;
let drawStep = 0;
let showEraser = false;
let rush = true;
let activeCharacter = false;
let updateStep = Date.now()

let showBoundingBoxes = false;


const socket = io();
socket.on('greeting', function (data) {
    console.log(data.msg);
    id = data.id;
    socket.emit('thankyou', { msg: 'Thank you for connecting me! -Client', id: id });
});
socket.on('gimme', function (data) {
    console.log('sending first')
    if (data.first) {
        socket.emit('firstUpdate', { characters: characters, drawQ: drawQ })
    }
})
socket.on('initialUpdate', function (data) {
    console.log('First Update')
    for (var character in data.characters) {
        characters.forEach((cha) => {
            if (cha.id == character) {
                cha.x = data.characters[character].x;
                cha.y = data.characters[character].y;
                cha.direction = data.characters[character].direction
            }
        })
    }
    for (var line in data.drawQ) {
        let polyLine = new Polyline(data.drawQ[line].points, data.drawQ[line].x, data.drawQ[line].y, data.drawQ[line].color, data.drawQ[line].width)
        polyLine.id = data.drawQ[line].id
        drawQ.push(polyLine)
    }
    drawScreen()
})
socket.on('characterUpdate', function (data) {
    characters.forEach((character) => {
        if (character.id == data.character.id) {
            let lock = false;
            if (character.x != data.character.x) {
                character.x = data.character.x;
                lock = true;
            }
            if (character.y != data.character.y) {
                character.y = data.character.y;
                lock = true;
            }
            if (character.direction != data.character.direction){
                character.direction = data.character.direction
                lock = true;
            }
            if (lock) {
                character.lock = Date.now()
            }
        }
    })
    drawScreen()
})
socket.on('newLine', function (data) {
    let thisLine = new Polyline(data.line.points, data.line.x, data.line.y, data.line.color, data.line.width)
    thisLine.id = data.line.id
    drawQ.push(thisLine)
    drawScreen()
})


let pencil = {
    color: "red",
    width: 5
}

let erasing = false;

let mode = "draw";

class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

class Line {
    constructor(p, q) {
        this.p = p;
        this.q = q;
    }
}

class Polygon {
    constructor(pointsArray, x, y, color, strokeColor, strokeWidth) {
        this.points = pointsArray;
        this.x = x;
        this.y = y;
        this.color = color;
        this.strokeColor = strokeColor;
        this.strokeWidth = strokeWidth;
        this.setBoundingBox()
        this.id = Date.now()
    }
    draw = () => {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.points[0][0] + this.x + center.x, this.points[0][1] + this.y + center.y)
        for (let i = 0; i < this.points.length; i++) {
            ctx.lineTo(this.points[i][0] + this.x + center.x, this.points[i][1] + this.y + center.y);
        }
        ctx.closePath();
        ctx.fill();
        if (this.strokeColor) {
            ctx.strokeStyle = this.strokeColor;
            ctx.lineWidth = this.strokeWidth;
            ctx.stroke()
        }
        if (showBoundingBoxes === true) {
            this.showBox()
        }
    }
    showBox = () => {
        this.setBoundingBox()
        ctx.rect(this.boundingBox.left + this.x, this.boundingBox.top + this.y, this.width, this.height)
        ctx.strokeStyle = 'grey'
        ctx.stroke()
    }
    setBoundingBox = () => {
        let xmin = parseFloat(this.points[0][0])
        let xmax = parseFloat(xmin)
        let ymin = parseFloat(this.points[0][1])
        let ymax = parseFloat(ymin)
        for (let i = 0; i < this.points.length; i++) {
            if (this.points[i][0] < xmin) {
                xmin = parseFloat(this.points[i][0])
            }
            if (this.points[i][0] > xmax) {
                xmax = parseFloat(this.points[i][0])
            }
            if (this.points[i][1] < ymin) {
                ymin = parseFloat(this.points[i][1])
            }
            if (this.points[i][1] > ymax) {
                ymax = parseFloat(this.points[i][1])
            }
        }
        this.boundingBox = { left: xmin, right: xmax, top: ymin, bottom: ymax }
        this.width = xmax - xmin
        this.height = ymax - ymin
    }
}

class Polyline {
    constructor(pointsArray, x, y, color, width) {
        this.points = pointsArray;
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.id = Date.now()
    }
    draw = () => {
        ctx.beginPath()
        for (let i = 0; i < this.points.length; i++) {
            ctx.lineTo(this.points[i][0] + center.x, this.points[i][1] + center.y);
        }
        ctx.strokeStyle = this.color;
        ctx.strokeWidth = this.width;
        ctx.stroke()
        ctx.closePath()
    }
}

let eraser = {
    x: 0,
    y: 0,
    draw: () => {
        ctx.beginPath();
        ctx.arc(eraser.x + center.x, eraser.y + center.y, 25, 0, 2 * Math.PI)
        ctx.fillStyle = "pink";
        ctx.fill()
        ctx.closePath()
    }
}

var hexagon = new Polygon([[28.867, 100], [0, 50], [28.867, 0], [86.601, 0], [115.47, 50], [86.601, 100]], 0, 0, "white", "black", 2)
class Character {
    constructor(name, x, y, tokenImage, fullImage, backgroundColor) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.tokenImage = tokenImage;
        this.fullImage = fullImage;
        this.background = backgroundColor;
        this.direction = 1;
    }
    drawHex = () => {
        ctx.fillStyle = this.background;
        let hex = [[28.867, 100], [0, 50], [28.867, 0], [86.601, 0], [115.47, 50], [86.601, 100], [28.867, 100], [0, 50]];
        ctx.beginPath()
        for (let i = 0; i < hex.length; i++) {
            ctx.lineTo(hex[i][0] + this.x + center.x, hex[i][1] + this.y + center.y);
        }
        ctx.strokeStyle = this.color;
        ctx.strokeWidth = this.width;
        ctx.fill()
        ctx.strokeStyle = "black"
        ctx.lineWidth = 3
        ctx.stroke()
        ctx.closePath()
    }
    drawToken = () => {

        ctx.drawImage(this.tokenImage, this.x + center.x, this.y + center.y)
        // this.drawDirection();
    }
    drawFull = () => {
        ctx.drawImage(this.fullImage, this.x + center.x - 247, this.y + center.y - 500)
        // this.drawDirection()
    }
    drawDirection = () => {
        var radius = 50;
        var point_size = 10;
        var center_x = this.x + center.x + 60;
        var center_y = this.y + center.y + 50;

        function drawPoint(angle, distance) {
            var x = center_x + radius * Math.cos(-angle * Math.PI / 180) * distance;
            var y = center_y + radius * Math.sin(-angle * Math.PI / 180) * distance;

            ctx.beginPath();
            ctx.arc(x, y, point_size, 0, 2 * Math.PI);
            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            ctx.fill();
            ctx.stroke();
        }
        //Execution
        drawPoint(this.direction * 60 + 30, 1);
    }
}

let characterNodes = document.getElementsByTagName('character');
let characters = [];
for (let character of characterNodes) {
    let images = character.getElementsByTagName('img')
    let char = new Character(character.getAttribute('name'), 0, 0, images[0], images[1], character.getAttribute('color'))
    char.id = characters.length
    characters.push(char)
}

function fitCanvas() {
    height = window.innerHeight
    width = window.innerWidth
    canvas.height = height
    canvas.width = width
}

let drawQ = []



let xsize = 150
let ysize = 50

function drawScreen() {
    if (Date.now() - drawStep > 15 || rush) {
        ctx.fillStyle = "black"
        ctx.rect(0, 0, width, height)
        ctx.fill()
        let y = ysize
        let x = xsize
        let even = false
        for (let row = 0; row < mapHeight; row++) {
            for (let col = 0; col < mapWidth; col++) {
                hexagon.x = x;
                hexagon.y = y;
                hexagon.draw()
                x += 173
            }
            y += ysize
            if (even) {
                x = xsize
                even = false
            } else {
                x = 63
                even = true
            }
        }
        hexagon.x = 0;
        hexagon.y = 0;
        drawQ.forEach((shape) => {
            shape.draw()
        })
        if (allFull) {
            characters.forEach((character) => {
                character.drawFull()
            })
        } else {
            characters.forEach((character) => {
                character.drawHex()
                character.drawToken()
            })
            if (activeCharacter) {
                activeCharacter.drawHex()
                activeCharacter.drawFull()
            }
            characters.forEach((character) => {
                character.drawDirection()
            })
        }
        if (showEraser) {
            eraser.draw()
        }
        drawStep = Date.now()
        rush = false;
    }
}

window.onresize = function () {
    fitCanvas()
    rush = true;
    drawScreen()
}

window.onload = function () {
    drawScreen()
}


document.onkeydown = function (e) {
    if (e.code == "Space") {
        drag = true
        originCoord.x1 = clientLoc.x
        originCoord.y1 = clientLoc.y
        originCoord.x2 = parseInt(center.x)
        originCoord.y2 = parseInt(center.y)
    }
}

document.onkeyup = function (e) {
    if (e.code == "Space") {
        drag = false
    }
}

document.addEventListener('mousemove', function (e) {
    clientLoc.x = e.clientX
    clientLoc.y = e.clientY
    if (drag) {
        center.x = originCoord.x2 + (e.clientX - originCoord.x1)
        center.y = originCoord.y2 + (e.clientY - originCoord.y1)
        drawScreen()
    } else if (drawing) {
        let tempX = getX(e)
        let tempY = getY(e)
        if (Math.abs(tempX - drawQ[drawing - 1].points[drawQ[drawing - 1].points.length - 1][0]) > minStep || Math.abs(tempY - drawQ[drawing - 1].points[drawQ[drawing - 1].points.length - 1][1]) > minStep) {
            drawQ[drawing - 1].points.push([tempX, tempY])
        }
        drawScreen();
    } else if (erasing) {
        eraserLine(e)
        drawScreen()
    } else if (mode == 'activeCharacter') {
        activeCharacter.x = originCoord.x2 + (e.clientX - originCoord.x1)
        activeCharacter.y = originCoord.y2 + (e.clientY - originCoord.y1)
        if (Date.now() - 30 > updateStep) {
            characterUpdate(activeCharacter)
        }
        drawScreen()
    } else {
        let active = false;
        characters.forEach((character) => {
            if (pointProx([character.x + center.x + 60, character.y + center.y + 55], [e.clientX, e.clientY]) < 60) {
                active = true;
                activeCharacter = character;
            }
        })
        if (!active) {
            activeCharacter = false;
        } else {
            drawScreen()
        }
    }
})

function getX(e) {
    let solution = e.clientX - center.x - canvas.offsetLeft;
    return solution
}

function getY(e) {
    let solution = e.clientY - center.y - canvas.offsetTop;
    return solution
}


window.addEventListener('contextmenu', function (e) {
    // do something here... 
    e.preventDefault();
}, false);


document.addEventListener('mousedown', function (e) {
    if (e.button == 0) {
        if (activeCharacter && Date.now() - activeCharacter.lock > 2000) {
            mode = 'activeCharacter';
            originCoord.x1 = clientLoc.x
            originCoord.y1 = clientLoc.y
            originCoord.x2 = parseInt(activeCharacter.x)
            originCoord.y2 = parseInt(activeCharacter.y)

        } else if (mode == 'draw') {
            startDrawing(e)
        } else if (mode == 'erase') {
            startErasing(e)
            showEraser = true;
        }
    }
    if (e.button == 2) {
        if (activeCharacter) {
            activeCharacter.direction++;
            if (activeCharacter.direction > 6) {
                activeCharacter.direction = 1;
            }
            characterUpdate(activeCharacter)
            drawScreen()
        } else {
            mode = "erase";
            erasing = true;
            showEraser = true;
            eraserLine(e)
            rush = true
            drawScreen()
        }
    }
    if (e.button == 1) {
        e.preventDefault()
        drag = true
        originCoord.x1 = clientLoc.x
        originCoord.y1 = clientLoc.y
        originCoord.x2 = parseInt(center.x)
        originCoord.y2 = parseInt(center.y)
    }
})



document.addEventListener('mouseup', function (e) {
    if (e.button == 0) {
        if (drawing) {
            drawStep = 0;
            rush = true;
            socket.emit("newLine", { line: drawQ[drawQ.length - 1] })
            drawScreen()
            drawing = false;
        }
        if (erasing) {
            drawStep = 0;
            rush = true;
            drawScreen()
            erasing = false;
            showEraser = false;
        }
        if (mode == 'activeCharacter') {
            mode = 'draw';
            characters.sort((a, b) => (a.y < b.y) ? -1 : 1)
            characterUpdate(activeCharacter)
            drawScreen()
        }
    }
    if (e.button == 2) {
        mode = "draw"
        erasing = false;
        showEraser = false;
        rush = true;
        drawScreen()
    }
    if (e.button == 1) {
        drag = false;
    }
})

function startDrawing(e) {
    let tempX = getX(e)
    let tempY = getY(e)
    let polyline = new Polyline([[tempX, tempY]], tempX, tempY, pencil.color, pencil.width);
    drawQ.push(polyline);
    drawing = drawQ.length
}

function startErasing(e) {
    let tempX = getX(e)
    let tempY = getY(e)
    erasing = true;
}

function boxProx(shape1, shape2) {
    if (shape1.boundingBox.left + shape1.x < shape2.boundingBox.right + shape2.x
        && shape1.boundingBox.left + shape1.x > shape2.boundingBox.left + shape2.x
        || shape1.boundingBox.right + shape1.x > shape2.boundingBox.left + shape2.x
        && shape1.boundingBox.right + shape1.x < shape2.boundingBox.right + shape2.x) {
        if (shape1.boundingBox.bottom + shape1.y > shape2.boundingBox.top + shape2.y
            && shape1.boundingBox.bottom + shape1.y < shape2.boundingBox.bottom + shape2.y
            || shape1.boundingBox.top + shape1.y < shape2.boundingBox.bottom + shape2.y
            && shape1.boundingBox.top + shape1.y > shape2.boundingBox.top + shape2.y) {
            return true
        }
    }
    return false
    // function hProx() {
    //     if (obj1.x >= obj2.x) {
    //         if ((obj1.x - (obj1.width / 2)) < (obj2.x + (obj2.width / 2))) {
    //             return true
    //         }
    //     }
    //     if (obj1.x <= obj2.x) {
    //         if ((obj1.x + (obj1.width / 2)) > (obj2.x - (obj2.width / 2))) {
    //             return true
    //         }
    //     }
    //     return false
    // }
    // function vProx() {
    //     if (obj1.y >= obj2.y) {
    //         if ((obj1.y - (obj1.height / 2)) < (obj2.y + (obj2.height / 2))) {
    //             return true
    //         }
    //     }
    //     if (obj1.y <= obj2.y) {
    //         if ((obj1.y + (obj1.height / 2)) > (obj2.y - (obj2.height / 2))) {
    //             return true
    //         }
    //     }
    //     return false
    // }
    // if (hProx()) {
    //     if (vProx()) {
    //         return true
    //     }
    // }
    // return false
}

function polyProx(shape1, shape2) {
    let lines1 = getLines(shape1)
    let lines2 = getLines(shape2)
    console.log(lines2)
    for (let i = 0; i < lines1.length; i++) {
        for (let j = 0; j < lines2.length; j++) {
            if (doLinesIntersect(lines1[i], lines2[j])) {
                return true
            }
        }
    }
    return false;
}

function getLines(shape) {
    let lines = []
    for (let i = 0; i < shape.points.length - 1; i++) {
        let line = JSON.stringify([shape.points[i], shape.points[i + 1]])
        line = JSON.parse(line)
        line[0][0] += shape.x
        line[1][0] += shape.x
        line[0][1] += shape.y
        line[1][1] += shape.y
        lines.push(line)
    }
    return lines
}

function doLinesIntersect(line1, line2) {
    //Algorithm from answer by StackOverflow answer
    //DanFox
    //https://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function
    var a = line1[0][0],
        b = line1[0][1],
        c = line1[1][0],
        d = line1[1][1],
        p = line2[0][0],
        q = line2[0][1],
        r = line2[1][0],
        s = line2[1][1]
    var det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
        return false;
    } else {
        lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
        gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
        return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
}

//Orthocenter, Circumcenter || Specific to triangles
//Center of area
//Centroid, Incenter || Polygons


function isPointInside(shape1, shape2) {
    let lines = getLines(shape2)
    for (point in shape1.points) {
        let checkLine = [point, [point[0], shape2.boundingBox.right + shape2.x]];
        let intersects = 0;
        for (let i = 0; i < lines.length; i++) {
            if (doLinesIntersect(checkLine, lines[i])) {
                intersects++
            }
        }
        if (intersects % 2 == 0) {
            return point
        }
    }
    return false
}

function isBoxInside(shape1, shape2) {
    if (shape1.boundingBox.left + shape1.x >= shape2.boundingBox.left + shape2.x
        && shape1.boundingBox.top + shape1.y >= shape2.boundingBox.top + shape2.y
        && shape1.boundingBox.right + shape1.x <= shape2.boundingBox.right + shape2.x
        && shape1.boundingBox.bottom + shape1.y <= shape2.boundingBox.bottom + shape2.y) {
        return true
    }
    return false
}

function drawLine(Line) {
    ctx.moveTo(Line.p.x, Line.p.y)
    ctx.lineT0(Line.q.x, Line.q.y)
    ctx.lineWidth = pencil.width;
    ctx.strokeStyle = pencil.color;
    ctx.stroke()
}

function eraserLine(e) {
    eraser.x = getX(e)
    eraser.y = getY(e)
    for (let i = 0; i < drawQ.length; i++) {
        for (let point of drawQ[i].points) {
            if (pointProx([eraser.x, eraser.y], point) < 25) {
                let len = JSON.parse(JSON.stringify(drawQ.length));
                let temp = []
                for (let j = 0; j < len; j++) {
                    if (j != i) {
                        temp.push(drawQ.shift())
                    } else {
                        let thisLine = drawQ.shift()
                        socket.emit('erase', { line: thisLine })
                    }
                }
                drawQ = temp;
                return
            }
        }
    }
}

socket.on('erase', function (data) {
    let len = JSON.parse(JSON.stringify(drawQ.length));
    let temp = []
    for (let j = 0; j < len; j++) {
        if (data.line.id != drawQ[j].id) {
            temp.push(drawQ[j])
        }
    }
    drawQ = temp;
    drawScreen()
})



function pointProx(p, q) {
    return Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1])
}

setInterval(() => {
    drawScreen()
}, 3000)

function characterUpdate(character) {
    character.timestamp = Date.now()
    socket.emit("characterUpdate", { character: character })
}