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
        "slategrey",
        "black"
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
        "darkslategrey",
        "black"
    )
]

function addSwatches() {
    console.log(tilesWheel)
    for (let i = 0; i < tilesWheel.length; i++) {
        let tile = tiles[tilesWheel[i]];
        buttons.push(new Button("",
            i * 52,
            32,
            50,
            50,
            () => {
                paintBrush = tile;
            },
            tile.topColor,
            tile.topOutline
        ))
        paintBrush = tile;
    }
    buttons.push(new Button("Delete",
    0,
    83,
    100,
    50,
    () => {
        paintBrush = {name: "Delete"}
    },
    "black",
    "white"
    ))
    buttons.push(new Button("Tree",
    100,
    83,
    100,
    50,
    () => {
        paintBrush = {name: "Tree"};
    },
    "#006738",
    "#603813"
    )),
    buttons.push(new Button("Characters",
    200,
    83,
    150,
    50,
    () => {
        paintBrush = {name: "Characters"};
    },
    "slategrey",
    "black"))
}

function removeSwatches() {
    let temp = [];
    buttons.forEach((button) => {
        if (button.name != "" && button.name != "Tree" && button.name != "Delete") {
            temp.push(button)
        }
    })
    buttons = temp;
}