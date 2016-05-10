
Board = function(){   
    
    var emptyImage = "v1462655858/cross_empty_i5hkue.png"; 


    this.boardWidth = 3;
    
    this.minimumMovesRequiredToWin = (2 * this.boardWidth) - 1;
    
    this.numberOfSpaces = this.boardWidth * this.boardWidth;
    this.numberOfBlanks = this.numberOfSpaces;
    this.numberOfOccupied = 0;    

    this.blankSpaces =  cartesianProductOf([0, 1, 2], [0, 1, 2]);
    
    this.pieceBoard = new Array(this.boardWidth).fill(0).map(
        row => new Array(this.boardWidth).fill(0));
    this.imageBoard = new Array(this.boardWidth).fill().map(
            row => new Array(this.boardWidth).fill(emptyImage));        

    var canPlacePiece = function(space, pieceBoard) {

        return pieceBoard[space.x][space.y] == 0; 
    }         

    Board.prototype.deleteBlankSpace = function(space){
        var blankSpaces = this.blankSpaces;

        blankSpaces.map(function(value, index, array){
            if (value[0] == space.x && value[1] == space.y){
            blankSpaces.splice(index, 1);
        }
        });        

    }    
    
    Board.prototype.isBlank = function(){
        return this.numberOfSpaces == this.numberOfBlanks;   
    }    

    Board.prototype.placePiece = function(space, piece){

        if (!canPlacePiece(space, this.pieceBoard)) {
            return;
        }
        
        this.pieceBoard[space.x][space.y] = piece;        
        
        this.numberOfBlanks -= 1;
        this.numberOfOccupied += 1; 
        
        this.deleteBlankSpace(space);
        
    }       
       

    
}