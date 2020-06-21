function addCharacter(character) {
    if (hilightedTile.characters[0]) {
        hilightedTile.characters[0] = character;
    } else {
        hilightedTile.characters.push(character)
    }
}