let buttons = [
    new Button("Toggle Snap",
        0,
        0,
        30,
        170,
        () => {
            if (snap) {
                snap = false;
            } else {
                snap = true;
            }
        },
        "slategrey"
    )
]