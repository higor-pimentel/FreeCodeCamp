Sounds = function(){
  this.context = undefined;
  this.sounds = [];

  Sounds.prototype.loadSounds = function (url) {
    var t = this;
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
      t.context.decodeAudioData(request.response, function(buffer) {
        t.sounds.push(buffer);
      }, function(e){"Error with decoding audio data" + e.err});
    }
    request.send();
  } 
  
  Sounds.prototype.init = function() {

    try {
      // Fix up for prefixing
      window.AudioContext = window.AudioContext||window.webkitAudioContext;
      this.context = new AudioContext();
    }
    catch(e) {
      alert('Web Audio API is not supported in this browser');
    }
    
    this.loadSounds("http://res.cloudinary.com/dipzsn2cu/video/upload/v1463328565/simonSound1_isqeqk.mp3");
    this.loadSounds("http://res.cloudinary.com/dipzsn2cu/video/upload/v1463333231/simonSound2_qbmi87.mp3");
    this.loadSounds("http://res.cloudinary.com/dipzsn2cu/video/upload/v1463333246/simonSound3_bnjj5p.mp3");
    this.loadSounds("http://res.cloudinary.com/dipzsn2cu/video/upload/v1463333251/simonSound4_ueln6e.mp3");
    
  } 
  
  Sounds.prototype.playSound = function (buffer) {
    var source = this.context.createBufferSource(); // creates a sound source
    source.buffer = buffer;                    // tell the source which sound to play
    source.connect(this.context.destination);       // connect the source to the context's destination (the speakers)
    source.start(0);                           // play the source now
                                               // note: on older systems, may have to use deprecated noteOn(time);
  }
  

  Sounds.prototype.play = function(num){
    
    this.playSound(this.sounds[num]);

  }
  
  
  this.init();
};

