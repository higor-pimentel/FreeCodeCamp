
createGridArray = function(rows){
    var arr = new Array;
    for (var i=0; i < rows; i++){
        arr[i] = new Array(rows);
    }

    return arr;

}

fillGridArray = function(grid){
    var gridHeight = grid.length;
    var gridWidth = gridHeight;

    for (var j = 0; j < gridHeight; j++) { 
        for (var k = 0; k < gridWidth; k++) { 
            var randomBinary = Math.floor((Math.random() * 2));
            if (randomBinary === 1) {
                grid[j][k] = 1;
            } else {
                grid[j][k] = 0;
            }
        }
    }    
}


drawGrid = function(grid, canvas){
    var gridHeight = grid.length;
    var gridWidth = gridHeight;

    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, gridHeight, gridWidth);

    for (var j = 1; j < gridHeight; j++) { 
        for (var k = 1; k < gridWidth; k++) { 
            if (grid[j][k] === 1) {
                ctx.fillStyle = "#FF0000";
                ctx.fillRect(j, k, 1, 1);
            }
        }
    }  
}


computeLives = function(grid){
    var gridHeight = grid.length;
    var gridWidth = gridHeight;

    var mirrorGrid = createGridArray(400);
    
    for (var j = 1; j < gridHeight - 1; j++) { //iterate through rows
        for (var k = 1; k < gridWidth - 1; k++) { //iterate through columns
            var totalCells = 0;
            //add up the total values for the surrounding cells
            totalCells += grid[j - 1][k - 1]; //top left
            totalCells += grid[j - 1][k]; //top center
            totalCells += grid[j - 1][k + 1]; //top right

            totalCells += grid[j][k - 1]; //middle left
            totalCells += grid[j][k + 1]; //middle right

            totalCells += grid[j + 1][k - 1]; //bottom left
            totalCells += grid[j + 1][k]; //bottom center
            totalCells += grid[j + 1][k + 1]; //bottom right


            //apply the rules to each cell
            if (grid[j][k] === 0) {
                switch (totalCells) {
                    case 3:
                        mirrorGrid[j][k] = 1; //if cell is dead and has 3 neighbours, switch it on
                        break;
                    default:
                        mirrorGrid[j][k] = 0; //otherwise leave it dead
                }
            } else if (grid[j][k] === 1) { //apply rules to living cell
                switch (totalCells) {
                    case 0:
                    case 1:
                        mirrorGrid[j][k] = 0; //die of lonelines
                        break;
                    case 2:
                    case 3:
                        mirrorGrid[j][k] = 1; //carry on living
                        break;
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                        mirrorGrid[j][k] = 0; //die of overcrowding
                        break;
                    default:
                        mirrorGrid[j][k] = 0; //
            
                }

            }
        }
    }

    for (var j = 0; j < gridHeight; j++) { //iterate through rows
        for (var k = 0; k < gridWidth; k++) { //iterate through columns
            grid[j][k] = mirrorGrid[j][k];

        }
    }

}

tick = function(grid, canvas){
    drawGrid(grid, canvas);
    computeLives(grid);
    requestAnimationFrame(function(){tick(grid, canvas)});
}

$(function(){
    console.log('inicializando...');

    var gridWidth = 400;
    var grid = createGridArray(gridWidth);
    var canvas = document.getElementById("myCanvas");
    fillGridArray(grid);

    tick(grid, canvas);

});
