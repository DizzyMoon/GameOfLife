"use strict"

window.addEventListener("DOMContentLoaded", start())

function start(){

    let gameGrid = [];

    console.log("Javascript is running :)");
    gameGrid = populateGrid(20);
    console.log(gameGrid);
    console.log(countNeighbors(gameGrid, 1, 2));
    createGridHTML(gameGrid);
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
            cellDiv.textContent = cellValue;
            rowDiv.appendChild(cellDiv); // Append cell to row
        }
        gridContainer.appendChild(rowDiv); // Append row to grid container
    }
}

function simulateCell(grid, x, y){
    let newGrid = grid;
    let neighbors = countNeighbors(newGrid, x, y);
    switch(neighbors){
        case neighbors < 2 || neighbors > 3 : newGrid[x, y] = 0;
        case 2 :;
        case 3 : newGrid[x, y] = 1;
    }
    return newGrid
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