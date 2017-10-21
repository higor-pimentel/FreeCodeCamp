import React, { Component } from 'react';
import './App.css';

function createGridArray(rows){
    var arr = new Array;
    for (var i=0; i < rows; i++){
        arr[i] = new Array(rows).fill(0);
    }
    return arr;

}

function fillGridArray(grid){
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

function computeLives(grid){
    var gridHeight = grid.length;
    var gridWidth = gridHeight;

    var mirrorGrid = createGridArray(gridHeight);
    
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

  
    return grid;

}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}
      style={{background: props.color}} 
    >
    </button>
  );
}

function ButtonBoard(props){
  return (
    <button className="" onClick={props.onClick}>
      {props.caption}
    </button>
  );  
}

class Board extends Component {

  constructor(props) {
    super();
    this.state = {
      generations: 0,
      speed: 100,
      paused: false,
      boardSize: parseInt(props.size),
      squares: createGridArray(parseInt(props.size)),
    };

    this.fillGridArrayBoard();  
  }

  handleClick(row, col) {
   
    const squares = this.state.squares.slice();

    squares[row][col] = 1;
    
    this.setState({
      squares: squares,
    });
  }
    
  renderSquare(row, col) {
    return <Square 
              color={this.state.squares[row][col] == 1 ? "blue" : ""}
              value={this.state.squares[row][col]}
              onClick={() => this.handleClick(row, col)} 
            />;
  }

  renderSquareRow(row, count){

    let cols = [];
    for (var col = 0; col < count; col++){
      cols.push(this.renderSquare(row, col));
    }

    return (
          <div className="board-row">
            {cols}
          </div>
      )
  }


  renderSquares(count) {
    let rows = [];

    for (var row = 0; row < count; row++){
      rows.push(this.renderSquareRow(row, count));
    }

    return rows
  }

  changeSize(size){
    this.setState({
      boardSize: size,
      squares: createGridArray(size)
    });    
  }

  fillGridArrayBoard(){
    const squares = this.state.squares.slice();
    fillGridArray(squares);
  }

  computeLivesBoard() {

    const squares = this.state.squares.slice();

    this.setState({
      squares: computeLives(squares),
    })
  }

  incrementGenerations(){
    this.setState({
      generations: this.state.generations + 1,
    })
  }

  tick = () => {

    if (this.state.paused){
      return
    };

    this.computeLivesBoard();
    this.incrementGenerations();
  }

  start() {
    clearInterval(this.interval);
    this.paused = false;
    this.interval = setInterval(this.tick, this.state.speed);
  }

  pause(){
    this.setState({
      paused: !this.state.paused,
    })
  }

  clear(){
    clearInterval(this.interval); 
    this.setState({
      generations: 0,
      paused: false,
      squares: createGridArray(this.state.boardSize)
    });     
  }

  randomizeBoard(){
    this.clear();
    this.fillGridArrayBoard();    

    const squares = this.state.squares.slice();

    this.setState({
      squares: squares,
    });    
  }

  componentDidUpdate(){
    //this.start();
  }
  
  changeSpeed(speed){
    clearInterval(this.interval);
    this.setState({
      speed: speed,
      paused: true
    })
  }
  
  render() {
    
    return (
      <div>
        <div>
          <ButtonBoard caption="Start" onClick={() => this.start()}  />
          <ButtonBoard caption="Pause" onClick={() => this.pause()}  />
          <ButtonBoard caption="Clear" onClick={() => this.clear()}  />
          <ButtonBoard caption="Randomize" onClick={() => this.randomizeBoard()}  />
        </div>
        <div>
          {this.renderSquares(this.state.boardSize)}
        </div>
        <div>
          <ButtonBoard caption="Size 20x20"  onClick={() => this.changeSize(20)} />
          <ButtonBoard caption="Size 50x50"  onClick={() => this.changeSize(50)} />
          <ButtonBoard caption="Size 100x100"  onClick={() => this.changeSize(100)} />
        </div>
        <div>
          <ButtonBoard caption="Slow"  onClick={() => this.changeSpeed(700)} />
          <ButtonBoard caption="Medium"  onClick={() => this.changeSpeed(300)} />
          <ButtonBoard caption="Fast"  onClick={() => this.changeSpeed(100)} />
        </div>    
        <div>
           <div>Generations: {this.state.generations}</div>
           <div>Speed: {this.state.speed}</div>
           <div>Paused: {this.state.paused ? "Yes":"No"}</div>
        </div>    
      </div>
    );
  }
}

class Game extends Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            size="20"
          />
        </div>        
      </div>

    );
  }
}


export default Game;
