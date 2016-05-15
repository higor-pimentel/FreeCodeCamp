
GameState = function($scope, $interval, $timeout){
    
    this.board = null;
    this.sound = null;
    this.timeStep = null;
    this.sequence = [];
    this.stepCount = 0;
    this.stepIndex = 0;
    this.strictMode = false;
    
    
    $scope.handlePlayStep = undefined;
    $scope.handlePlaySeq = undefined;
    
    $scope.this = this;
    this.gameOn = false;

    var setTimeStep = function (num) {
      var tSteps = [1250, 1000, 750, 500];
      if (num < 4)
        return tSteps[0];
      if (num < 8)
        return tSteps[1];
      if (num < 12)
        return tSteps[2];
      return tSteps[3];
    }    
    
    
    GameState.prototype.prepare = function(){
        this.timeStep = null;
        this.sequence = [];
        this.stepCount = 0;
        this.stepIndex = 0;   
        
        this.board.stop();  
        
        if (angular.isDefined($scope.handlePlayStep)){
             clearTimeout($scope.handlePlayStep);    
        }
        
        if (angular.isDefined($scope.handlePlaySeq)){
            clearInterval($scope.handlePlaySeq);    
        }        
    }
    
    GameState.prototype.isLocked = function(){
        return this.inDemonstration;
    }
    
    GameState.prototype.start = function(){
        
        if (this.gameOn == false) return;
        
        if (angular.isDefined($scope.handlePlayStep)){
             clearTimeout($scope.handlePlayStep);    
        }
        
        if (angular.isDefined($scope.handlePlaySeq)){
            clearInterval($scope.handlePlaySeq);    
        }
        
        this.prepare();
        this.board.initialize();  
        
        this.newStep();  
    }   
    
    GameState.prototype.setBoard = function(board){
        this.board = board;
    }  
    
    GameState.prototype.setSound = function(sound){
        this.sound = sound;
    }         
    
    GameState.prototype.newStep = function(){
      this.timeStep = setTimeStep(this.stepCount++);
      this.sequence.push(Math.floor(Math.random() * 4));

      var t = this;
       $scope.handlePlayStep = setTimeout(
           function(){t.playStep()}, 500);
    }
    
    GameState.prototype.playStep = function(){
              
        var count = 0;
        var sequence = this.sequence;
        var timeStep = this.timeStep;
        
        this.stepIndex = 0;

        var t = this;
        $scope.handlePlaySeq = setInterval(function(){
            $scope.isLocked = true;
            t.board.displayCount(t.stepCount);
            t.board.playCorrectTone(sequence[count]);
            t.sound.play(sequence[count]);

            $scope.handlePlayStep = setTimeout(
                function(){ t.board.stop() } , timeStep / 2 - 10);
            
            count++;
          
            if (count == sequence.length){
                clearInterval($scope.handlePlaySeq);
                $scope.isLocked = false;       
                $scope.handlePlayStep = setTimeout(
                    function(){ t.notifyError() }, 5 * t.timeStep);                     
            }
        }, t.timeStep);
       
    }
    
    GameState.prototype.checkUserPlay = function(pushId){
        
        if (this.gameOn == false || this.stepCount == 0) return;
        
        var t = this;
        if ($scope.isLocked == true) return;
        
        clearTimeout($scope.handlePlayStep);
        
        if (pushId == this.sequence[this.stepIndex] &&
            this.stepIndex < this.sequence.length) {

            this.board.playCorrectTone(pushId);   
            this.sound.play(pushId); 
            this.lastPush = pushId;
            this.stepIndex++; 
            
            if (this.stepIndex < this.sequence.length) {
                $scope.handlePlayStep = setTimeout(
                    function(){ t.notifyError() }, 5 * t.timeStep);
            } else if (this.stepIndex == 20) {
                $('.push').removeClass('clickable').addClass('unclickable');
                $scope.handlePlayStep = setTimeout(
                    function(){ t.notifyWin() },  t.timeStep);                
            } else {
                $('.push').removeClass('clickable').addClass('unclickable');
                this.newStep();
            }     
        }  else {
          $('.push').removeClass('clickable').addClass('unclickable');
          this.notifyError(pushId);
        }                               
    } 
    
    GameState.prototype.notifyError = function(id){
        
        var pushId =  $('#' + id);
        var t = this;
        
        $scope.isLocked = true;
       
       t.board.notifyError();
        
        if (pushId) t.board.play();
        
        $scope.handlePlayStep = setTimeout(function() {
        
            if (pushId) t.board.stop();
    
            var toHndlSt = setTimeout(function() {
                
                if (t.strictMode){
                    t.prepare();
                    t.start();
                } else {
                    t.playStep();    
                }
                
            }, 1000);
        }, 
        1000);
        
        t.board.flashMessage('WRONG', 2);        
    }
    
    GameState.prototype.notifyWin = function(){
      var t = this;
      var cnt = 0;
      var last = t.lastPush;
      $scope.handlePlaySeq = setInterval(function() {
        t.board.playCorrectTone(last);
        $scope.handlePlayStep = setTimeout(
            function(){t.board.stop()}, 80);
        cnt++;
        if (cnt === 8) {
          clearInterval($scope.handlePlaySeq);
        }
      }, 160);
      t.board.flashMessage('WIN!!!', 2);  
    }
    
    GameState.prototype.switchStrict = function () {
      $('#mode-led').toggleClass('led-on');
      this.strictMode = !this.strictMode;
    }    
    
};