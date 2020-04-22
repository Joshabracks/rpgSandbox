let buttons = [
    new Button("Toggle Snap",
        0,
        0,
        170,
        30,
        () => {
            if (snap) {
                snap = false;
            } else {
                snap = true;
            }
        },
        "slategrey"
    ),
    new Button("Edit Map",
        170,
        0,
        120,
        30,
        () => {
            if (editMap) {
                editMap = false;
                removeSwatches()
            } else {
                editMap = true;
                addSwatches()
            }
        },
        "darkslategrey"
    )
]

function addSwatches() {
    console.log(tilesWheel)
    for (let i = 0; i < tilesWheel.length; i++) {
        let tile = tiles[tilesWheel[i]];
        buttons.push(new Button("",
            i * 50,
            30,
            50,
            50,
            () => {
                paintBrush = tile;
            },
            tile.topColor
        ))
    }
}

function removeSwatches() {
    let temp = [];
    buttons.forEach((button) => {
        if (button.name != "") {
            temp.push(button)
        }
    })
    buttons = temp;
}