"use strict"

let gameGrid = [];

window.addEventListener("DOMContentLoaded", load())

function load(){
    console.log("Javascript is running :)");
}

function start() {
    const user_interface = document.getElementById('user-interface');
    const buttons = document.getElementById("buttons");
    buttons.classList.remove('hidden');
    user_interface.classList.add('hidden');
    let dimensions = document.getElementById('dimensions').value;
    gameGrid = populateGrid(dimensions);
    gameGrid = addRandomValues(gameGrid, 0.2);
    console.log(gameGrid);
    console.log(countNeighbors(gameGrid, 1, 2));
    createGridHTML(gameGrid)
    setInterval(() => {
        console.log("Tic")
        gameOfLife();
    }, 500)
}

function clearGrid(){
    const dimensions = document.getElementById('dimensions').value;
    gameGrid = [];
    gameGrid = populateGrid(dimensions);
}

function randomizeButton(){
    gameGrid = addRandomValues(gameGrid, 0.2);
}

function addRandomValues(grid, probability){
    const newGrid = []
    for (let row = 0; row < grid.length; row++) {
        const newRow = [];
        for (let col = 0; col < grid[row].length; col++){
            newRow.push(Math.random() < probability ? 1 : grid[row][col]);
        }
        newGrid.push(newRow);
    }
    return newGrid;
}

function populateGrid(dimensions) {
    let grid = [];
    for (let row = 0; row < dimensions; row++) {
        const currentRow = [];
        for (let col = 0; col < dimensions; col++) {
            currentRow.push(0);
        }
        grid.push(currentRow);
    }
    return grid
}

function gameOfLife() {
    let newGrid = gameGrid;
    for (let row = 0; row < gameGrid.length; row++) {
        for (let col = 0; col < gameGrid[row].length; col++){
            newGrid = simulateCell(gameGrid, row, col);
        }
    }
    createGridHTML(newGrid);
}

function createGridHTML(gridData) {
    const gridContainer = document.getElementById('gridContainer');
    gridContainer.innerHTML = '';
    gridContainer.style.setProperty('--dimensions', gridData.length); // Set CSS variable for dimensions
    
    for (let row = 0; row < gridData.length; row++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row'; // Set class for row
        for (let col = 0; col < gridData[row].length; col++) {
            const cellValue = gridData[row][col];
            const cellDiv = document.createElement('div');
            cellDiv.className = 'cell';
            if (cellValue == 1){
                cellDiv.classList.add('alive');
            } else {
                cellDiv.classList.remove('alive');
            }
            cellDiv.textContent = '_';

            cellDiv.addEventListener('click', () => {
                toggleAlive(cellDiv, row, col);
            });

            //cellDiv.textContent = cellValue;
            
            
            rowDiv.appendChild(cellDiv); // Append cell to row
        }
        gridContainer.appendChild(rowDiv); // Append row to grid container
    }
}

function toggleAlive(cellDiv, row, col) {
    if (cellDiv.classList.contains('alive')){
        cellDiv.classList.remove('alive')
        gameGrid[row][col] = 0;
    } else {
        cellDiv.classList.add('alive');
        gameGrid[row][col] = 1;
    }
}

function simulateCell(grid, x, y) {
    const numRows = grid.length;
    const numCols = grid[0].length;
    // Count neighbors
    let count = countNeighbors(grid, x, y);

    let newGrid = gameGrid;

    // Apply rules of the game
    if (grid[x][y] === 1) {
        if (count < 2 || count > 3) {
            newGrid[x][y] = 0;
        }
    } else {
        if (count === 3) {
            newGrid[x][y] = 1;
        }
    }
    return newGrid;
}

function countNeighbors(grid, x, y) {
    const numRows = grid.length;
    const numCols = grid[0].length;
    let count = 0;
    //Relative positions of neighboring cells (programming gore)
    const dx =  [-1, -1, -1, 0, 0, 1, 1, 1];
    const dy = [-1, 0, 1, -1, 1, -1, 0, 1];
    //Check if positions exit the confines of the grid
    for (let i = 0; i < dx.length; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (nx >= 0 && nx < numRows && ny >= 0 && ny < numCols){
            if (grid[nx][ny] === 1) {
                count++;
            }
        }
    }
    return count;
}