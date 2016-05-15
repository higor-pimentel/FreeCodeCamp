Board = function($interval, $timeout){   

    this.currPush = undefined;
    
    Board.prototype.flashMessage = function (msg, times) {
        var count = 0;
         $('.count').text(msg);
         
        var blink = function(){
            $('.count').addClass('led-off');  
            var handleMessage = $timeout(function(){
                $('.count').removeClass('led-off');    
            }, 250);
                                
        }

        var handleRepeat = $interval(function(){
            blink();
            count++;
            
            if (count == times){
                $interval.cancel(handleRepeat); 
            }
        }, 500);  
        
    };
          
    Board.prototype.displayCount = function(count){
      var p = (count < 10) ? '0' : '';
      $('.count').text(p + (count + ''));
              
    }        
      
    Board.prototype.initialize = function(){
      $('.count').text('----').removeClass('led-off');
      this.stop();      
    }
    
    Board.prototype.stop = function(){

      if (this.currPush){
  
        this.currPush.removeClass('light');
      }

        
      this.currPush = undefined;        
        
    }
    
    Board.prototype.play = function(num){

        this.currPush = $('#' + num);
        this.currPush.addClass('light');
    };
    
    Board.prototype.playCorrectTone = function(id){
      this.play(id); 
    }
    
    Board.prototype.notifyError = function(id){
        $('.push').removeClass('clickable').addClass('unclickable');   
    }
    
};