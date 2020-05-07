
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


function drawScreen() {
    // ctx.translate(center.x, center.y)
    ctx.fillStyle = "#615f71"
    ctx.rect(0, 0, width, height)
    ctx.fill();
    map.draw();
    // worldMap.forEach((tile) => {
    //     tile.draw()
    // })
    // characters.forEach((character) => {
    //     if (character.drawFull) {
    //         character.drawFull()
    //     } else {
    //         character.draw()
    //     }
    // })
    drawQ.forEach((shape) => {
        shape.draw()
    })
    if (showEraser) {
        eraser.draw()
    }
    if (distancer) {
        distanceCircle()
    }
    if (editMap) {
        highLightTile.draw();
    }
    ctx.save()
    ctx.scale(z(width) / width, z(height) / height);
    dice.forEach((die) => { die.draw() })
    ctx.restore()
    buttons.forEach(function (button) {
        button.draw()
    })
    window.requestAnimationFrame(drawScreen)
}

function drawLine(Line) {
    ctx.moveTo(Line.p.x, Line.p.y)
    ctx.lineT0(Line.q.x, Line.q.y)
    ctx.lineWidth = pencil.width;
    ctx.strokeStyle = pencil.color;
    ctx.stroke()
}

function distanceCircle() {
    var distance = z(Math.distance(distancer.center, distancer.end));
    if (distance > 0) {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.fillStyle = "rgb(255, 255, 255, 0.25)"
        ctx.lineWidth = 5;
        ctx.arc(z(distancer.center.x), z(distancer.center.y), z(distance), 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.closePath()
        ctx.beginPath()
        ctx.moveTo(z(distancer.center.x), z(distancer.center.y));
        ctx.lineTo(z(distancer.end.x), z(distancer.end.y));
        ctx.stroke();
        ctx.closePath();
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.font = "40px Arial";
        ctx.strokeText(Math.floor(z(distance) / 20), z(distancer.end.x), z(distancer.end.y))
        ctx.fillText(Math.floor(z(distance) / 20), z(distancer.end.x), z(distancer.end.y))
    }
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


//Refresh screen by set amount || This can be removed if all functions are updated properly to draw when any change is made
// setInterval(() => {
//     drawScreen()
// }, 3000)