Player = function(){
    INITIAL_DEPTH = 0;
    
    this.currentMoveChoice = [];
    
    
    var getScore = function(arr){
        function compare(a,b) {
            if (a.score < b.score)
                return 1;
            else if (a.score > b.score)
                return 0;
            else 
                return 0;
        };
        
        if (arr.length == 0){
           return {score: 0, move: 0} 
        }
        return arr.sort(compare)[0].move;       
    } 
    
    /*
    var getScore = function(arr){
        function compare(a,b) {
            if (a.score < b.score)
                return 1;
            else if (a.score > b.score)
                return 0;
            else 
                return 0;
        };
        
        if (arr.length == 0){
           return {score: 0, move: 0} 
        }
        return {max: arr.sort(compare)[0], min: arr.sort(compare)[arr.length-1]};       
    }     
    */

    Player.prototype.minmax = function(gameState, depth, lower_bound, upper_bound){
        if (gameState.isOver()) return this.evaluateState(gameState, depth);
        
        var candidateMoveNodes = [];
        
        var breakEachValid = false;
        
        avMoves = gameState.availableMoves();
        
        for (var i = 0; i < avMoves.length; i++){
            value = avMoves[i];
                              
            var childBoard = gameState.makeMove({x:value[0], y:value[1]});
            var score = this.minmax(childBoard, depth+1, lower_bound, upper_bound);
            
          
            var node = {score: score, move: value};
 
            if (gameState.player == this.piece){
                candidateMoveNodes.push(node);

                if (node.score > lower_bound) {lower_bound = node.score};    
            } else{
                if (node.score < upper_bound) {upper_bound = node.score};
            };
            
            if (upper_bound < lower_bound) break;
             
        }
        

        if (gameState.player != this.piece) { return upper_bound};
        
        this.currentMoveChoice = getScore(candidateMoveNodes);

        return lower_bound;  
    };
 
    
    
    /*
    Player.prototype.minmax = function(gameState, depth){
        if (gameState.isOver()) {
            evaluate = this.evaluateState(gameState, depth);

            return evaluate; 
        }
        depth += 1;
        scores = []; 
        moves = [];
        
        avMoves = gameState.availableMoves();
        
        for (var i = 0; i < avMoves.length; i++){
            move = avMoves[i];  
            var childBoard = gameState.makeMove({x:move[0], y:move[1]}); 
            var score = this.minmax(childBoard, depth); 
             
            console.log(score);                 
            scores.push(score);
            moves.push(move);    
        }

        if (gameState.player == this.piece) {
            maxScoreIndex = scores.indexOf(Math.max.apply(Math, scores));
            this.currentMoveChoice = moves[maxScoreIndex];
            return scores[maxScoreIndex]
        } else {
            minScoreIndex = scores.indexOf(Math.min.apply(Math, scores));

            this.currentMoveChoice = moves[minScoreIndex];
            return scores[minScoreIndex]            
        }
        
        
    }
    
    */
    Player.prototype.evaluateState = function(gameState, depth){
        depth = 10; 
        if (gameState.isWon(this.piece)) {
            return this.baseScore - depth;
        } else if (gameState.isLost(this.piece)){
            return depth - this.baseScore;
        } else {
            return 0;
        }
    } 
    
    Player.prototype.takeTurn = function (gameState){

        if (gameState.isOver()) return gameState;
                         
        this.gameState = gameState;
        this.piece = gameState.player;
        
        move = this.chooseMove();
        
        console.log(move);

        //return gameState.makeMove({x:move[0], y:move[1]});
        
        return gameState.makeMove({x:move.x, y:move.y});
    }
    
    Player.prototype.chooseMove = function () {
        
        if (this.gameState.isUnplayed()) {
            nsample = sample(this.gameState.cornerSpaces());
            return {x: nsample[0], y: nsample[1]}
        }

        if (this.gameState.finalMove()) {
            var finalMove = this.gameState.finalMove();
            return {x: finalMove[0], y: finalMove[1]}
        }
        return this.bestPossibleMove();
                            
    }
    
    Player.prototype.bestPossibleMove = function(){
        this.baseScore = this.gameState.availableMoves().length + 1;

        this.minmax(this.gameState, INITIAL_DEPTH);
        
        moveChoice = this.currentMoveChoice;
        return {x:this.currentMoveChoice[0], y:this.currentMoveChoice[1]}
     }
    
}