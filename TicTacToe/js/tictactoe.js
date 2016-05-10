(function(){
  var app = angular.module("TicTacToe", []);
  
  app.controller("TicTacToeController", function($scope, $interval){
        
    var playerPieceImage = "v1462579798/cross_x_gzfgti.png";
    var opponentPieceImage = "v1462579798/cross_o_d6hopz.png";
         
    $scope.playX = 'X';
    $scope.playO = 'O';
                 
    var player = 'O';
    var opponent = 'X';
        
    var buildBoard = function(){
        return new Board();  
           
    }
    
    var buildGameState = function(board){

            
        gameState = new GameState(player, opponent);        
        gameState.setBoard(board);
        
        return gameState;
    }
    
    var idToPos = function(board){
        
        for (i=0; i < 3; i++){
            for (j=0; j <3; j++){
                if (board.pieceBoard[i][j] === $scope.playX){
                    board.imageBoard[i][j] = playerPieceImage;
                }
                if (board.pieceBoard[i][j] ===   $scope.playO){
                    board.imageBoard[i][j] = opponentPieceImage;
                }                  
            }
        }

    }    
   
    $scope.startGame = function(playOption){
        player = playOption;
        if (player == $scope.playX){
            opponent = $scope.playO;     
        } else {
             opponent = $scope.playX;    
        }
                
        board = buildBoard();
        gameState = buildGameState(board);   
        playerObj = new Player();
        
        $scope.board = board.imageBoard;

        move = playerObj.takeTurn(gameState);
        
        gameState = move;
        gameState.player = player;
        gameState.opponent = opponent;
        
        board = gameState.board;
        
        idToPos(gameState.board); 
        $scope.board = gameState.board.imageBoard;
  
    }

    $scope.placePiece = function(space){
        
        board.placePiece(space, player);
        idToPos(board);        
 

        move = playerObj.takeTurn(gameState);
        
        gameState = move;
        gameState.player = player;
        gameState.opponent = opponent;
        
        board = gameState.board;
       
        isWinner = false;
        hasWinner = gameState.winnerExists();
        hasDraw = gameState.isDraw();
        if (hasWinner){
            isWinner = gameState.isWon(player);
             
             var myModal = $("#myModalWin");
             myModal.modal();              
            
            if (isWinner){
              myModal.find('#message').text("You win!!!");              
              console.log("winner!!!");  
            } else {
                myModal.find('#message').text("You Lose :-(");   
                console.log("You Lose :-(");    
            }
            
        } else if (hasDraw){
            var myModal = $("#myModalWin");
            myModal.modal();             
            myModal.find('#message').text("!!! Draw !!!");  
            console.log("!!! Draw !!!"); 
        }

        if (!isWinner){
            idToPos(gameState.board); 
            $scope.board = gameState.board.imageBoard;              
        }

        if (hasWinner || gameState.isDraw()){
            $scope.startGame(player);
        }
        
    }
    
    $("#myModalNorm").modal();
    
  });
   
})();

