"use strict"

window.addEventListener("DOMContentLoaded", start())


function start(){
    console.log("Javascript is running :)");
    console.log(populateGrid(4));
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