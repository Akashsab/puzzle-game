const gridSize = 3; // Grid size (3x3)
let tiles = [];
let emptyTile = { row: gridSize - 1, col: gridSize - 1 };

function initPuzzle() {
    tiles = [];
    let counter = 1;

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (row === emptyTile.row && col === emptyTile.col) {
                tiles.push({ value: 0, row, col });
            } else {
                tiles.push({ value: counter++, row, col });
            }
        }
    }

    renderPuzzle();
}

function renderPuzzle() {
    const container = document.getElementById('puzzle-container');
    container.innerHTML = '';

    tiles.forEach(tile => {
        const tileElement = document.createElement('div');
        tileElement.classList.add('puzzle-tile');
        if (tile.value === 0) {
            tileElement.classList.add('empty-tile');
        } else {
            tileElement.innerText = tile.value;
            tileElement.onclick = () => moveTile(tile);
        }
        tileElement.style.gridRowStart = tile.row + 1;
        tileElement.style.gridColumnStart = tile.col + 1;
        container.appendChild(tileElement);
    });
}

function moveTile(tile) {
    const rowDiff = Math.abs(tile.row - emptyTile.row);
    const colDiff = Math.abs(tile.col - emptyTile.col);

    if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
        // Swap tile and empty space positions
        [tile.row, emptyTile.row] = [emptyTile.row, tile.row];
        [tile.col, emptyTile.col] = [emptyTile.col, tile.col];
        renderPuzzle();
    }
}

function shuffleTiles() {
    // Shuffle tiles by making a series of random valid moves
    for (let i = 0; i < 100; i++) {
        const adjacentTiles = tiles.filter(tile => {
            const rowDiff = Math.abs(tile.row - emptyTile.row);
            const colDiff = Math.abs(tile.col - emptyTile.col);
            return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
        });

        const randomTile = adjacentTiles[Math.floor(Math.random() * adjacentTiles.length)];
        [randomTile.row, emptyTile.row] = [emptyTile.row, randomTile.row];
        [randomTile.col, emptyTile.col] = [emptyTile.col, randomTile.col];
        renderPuzzle();
    }
}

window.onload = initPuzzle;
