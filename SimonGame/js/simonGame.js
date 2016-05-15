(function(){
  var app = angular.module("SimonGame", []);
  
  app.controller("SimonGameController", function($scope, $interval, $timeout){
    
    
    var board = new Board($interval, $timeout);
    var gameState = new GameState($scope, $interval, $timeout);
    var sounds = new Sounds(window);

    sounds.init();
    gameState.setSound(sounds);
    gameState.setBoard(board);
          
    $scope.powerOnOff = function(){
      $('#pwr-sw').toggleClass('sw-on');
      
      if($('#pwr-sw').hasClass('sw-on')==false){
        
        gameState.gameOn = false;          
        gameState.prepare();  

        $('.count').text('----');
        $('.count').addClass('led-off');
        $('#mode-led').removeClass('led-on');
        $('.push').removeClass('clickable').addClass('unclickable');
        $('.btn').removeClass('unclickable').addClass('clickable');
      } else {
        gameState.gameOn = true; 
        $('.btn').removeClass('unclickable').addClass('clickable');
        $('.count').removeClass('led-off');
        
      }     
    }
    
    $scope.checkUserPlay = function(obj){
       gameState.checkUserPlay(obj.target.id);   
    } 
    
    $scope.releaseUserPlay = function(){
        if ($scope.isLocked == false){            
            board.stop();
        }   
    }
    
    $scope.start = function(){
        
        if (!gameState.gameOn) return;
                
        gameState.start();
    }
    
    $scope.switchStrict = function(){
        
        if (!gameState.gameOn) return;
        
        gameState.switchStrict();
    }
    
  });
   
})();
    