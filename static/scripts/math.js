Math.mean = function (arr) {
    let sum = 0;
    arr.forEach((value) => {
        sum += value
    })
    return sum / arr.length;
}

function getX(e) {
    let solution = zo(e.clientX) - center.x - zo(canvas.offsetLeft);
    return solution;
}
function getY(e) {
    let solution = zo(e.clientY) - center.y - zo(canvas.offsetTop);
    return solution;
}
// function buttonProx(e) {
//     for (let i = 0; i < buttons.length; i++) {
//         if (Math.abs(buttons[i].x - e.clientX) < buttons[i].width && Math.abs(buttons[i].y - e.clientY) < buttons[i].height) {
//             // console.log("buttonPRox")
//             console.log(buttons[i])
//             return buttons[i]
//         }
//     }
//     return false;
// }

Math.distance = function (A, B) {
    var a = A.x - B.x;
    var b = A.y - B.y;
    return Math.sqrt(a * a + b * b);
}

function sortCharacters() {
    // characters.sort((a, b) => (a.y < b.y) ? -1 : 1)
    function quickSort(arr) {
        if (arr.length < 2) {
            return arr;
        }
        let mid = Math.floor(arr.length / 2)
        let pivot = arr[mid];
        let lower = [];
        let higher = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] != pivot) {
                if (arr[i].y > pivot.y || (arr[i].y == pivot.y && arr[i].class != "tile")) {
                    higher.push(arr[i])
                } else {
                    lower.push(arr[i])
                }
            }
        }
        return quickSort(lower).concat([pivot]).concat(quickSort(higher))
    }
    characters = quickSort(characters)
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
}

function polyProx(shape1, shape2) {
    let lines1 = getLines(shape1)
    let lines2 = getLines(shape2)
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



function pointProx(p, q) {
    return Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1])
}

function z(number) {
    return number * zoom;
}

function zo(number) {
    return number * (1 / zoom)
}

function rotate2D(centerPoint, point, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (point.x - centerPoint.x)) + (sin * (point.y - centerPoint.y)) + centerPoint.x,
        ny = (cos * (point.y - centerPoint.y)) - (sin * (point.x - centerPoint.x)) + centerPoint.y;
    return { x: nx, y: ny };
}

function rotate3D(roll, pitch, yaw, px, py, pz) {
    var cosa = Math.cos(yaw);
    var sina = Math.sin(yaw);

    var cosb = Math.cos(pitch);
    var sinb = Math.sin(pitch);

    var cosc = Math.cos(roll);
    var sinc = Math.sin(roll);

    var Axx = cosa * cosb;
    var Axy = cosa * sinb * sinc - sina * cosc;
    var Axz = cosa * sinb * cosc + sina * sinc;

    var Ayx = sina * cosb;
    var Ayy = sina * sinb * sinc + cosa * cosc;
    var Ayz = sina * sinb * cosc - cosa * sinc;

    var Azx = -sinb;
    var Azy = cosb * sinc;
    var Azz = cosb * cosc;

    let result = {x: Axx * px + Axy * py + Axz * pz,
        y: Ayx * px + Ayy * py + Ayz * pz,
        z: Azx * px + Azy * py + Azz * pz}
    // console.log(result)
    return result
}

Math.quickSort = function (arr) {
    if (arr.length < 2) {
        return arr;
    }
    let mid = Math.floor(arr.length / 2)
    let pivot = arr[mid];
    let lower = [];
    let higher = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] != pivot) {
            if (arr[i] > pivot || (arr[i] == pivot && arr[i].class != "tile")) {
                higher.push(arr[i])
            } else {
                lower.push(arr[i])
            }
        }
    }
    return Math.quickSort(lower).concat([pivot]).concat(Math.quickSort(higher));
}