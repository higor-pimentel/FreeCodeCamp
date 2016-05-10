GameState = function(player, opponent){        
    this.player = player;
    this.opponent = opponent;
    this.board = null;

    
    var winner = null;

    var checkRowWinner = function(board){
        candidate = null;
        for (var i=0; i < 3; i++){
            hasWinner = (board[i][0] != 0) && (board[i][0] == board[i][1]) && (board[i][1] == board[i][2]); 
            if (hasWinner){
                candidate = board[i][0];
                return candidate;
            }
        }           
    }     
    
    var checkColWinner = function(board){
        candidate = null;
        for (var i=0; i < 3; i++){
            hasWinner = (board[0][i] != 0) && (board[0][i] == board[1][i]) && (board[1][i] == board[2][i]); 
            if (hasWinner){
                candidate = board[0][i];
                return candidate;
            }
        }          
    }     

    var checkDiagonalWinner = function(board){
        candidate = null;
        hasWinner = (board[0][2] != 0) && (board[0][2] == board[1][1]) && (board[1][1] == board[2][0]); 
        if (hasWinner){
            candidate = board[0][2];
            return candidate;
        }
        
        hasWinner = (board[0][0] != 0) && (board[0][0] == board[1][1]) && (board[1][1] == board[2][2]); 
        if (hasWinner){
            candidate = board[0][0];
            return candidate;
        }                      
    }    
    
    var checkForWinner = function(board) {
       
        
        if (board.numberOfOccupied >= board.minimumMovesRequiredToWin) {
           return checkColWinner(board.pieceBoard) || checkRowWinner(board.pieceBoard) || checkDiagonalWinner(board.pieceBoard);         
        }        
    }
    
    GameState.prototype.isWon = function(piece){

        return piece == this.winner;
    }
    
    GameState.prototype.isLost = function(piece){
        return (this.winner != null) && (piece != this.winner);
    }
        
    GameState.prototype.isDraw = function(){
        return (this.board.numberOfBlanks == 0) && (this.winner == null) ;        
    }  
    
    GameState.prototype.isOver = function(){

         return (this.winner != null) || (this.isDraw());    
    }  
    
    
    GameState.prototype.winnerExists = function(){
        return this.winner != null;
    }
    
    GameState.prototype.setBoard = function(board){
        this.board = board;

        this.winner = checkForWinner(this.board);

                
    }   
    
    GameState.prototype.isUnplayed = function() {
        return this.board.isBlank();        
    }  
    
    GameState.prototype.finalMove = function(){
        if (this.board.numberOfBlanks == 1){
            return this.board.blankSpaces[0];
        }
    }
    GameState.prototype.cornerSpaces = function() {
        var maxIndex = this.board.boardWidth -1;
      
        return cartesianProductOf([0,maxIndex],[0,maxIndex]);    
    }
    
    GameState.prototype.availableMoves = function(){
        return this.board.blankSpaces;
    }
    
    GameState.prototype.makeMove = function(space){
                
        var newGameState = $.extend(true, Object.create(Object.getPrototypeOf(this)), this);
        newGameState.player = this.opponent;
        newGameState.opponent = this.player;
        
        var newBoard = $.extend(true, Object.create(Object.getPrototypeOf(this.board)), this.board);

        newBoard.placePiece(space, newGameState.player);
       
        newGameState.setBoard(newBoard);
           
        return newGameState;
    }  
}    
