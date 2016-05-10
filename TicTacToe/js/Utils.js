space = {
    x: 0,
    y: 0
}

function cartesianProductOf() {

  return Array.prototype.reduce.call(arguments, function(a, b) {
    var ret = [];
    a.forEach(function(a) {
      b.forEach(function(b) {
        ret.push(a.concat([b]));
      });
    });
    return ret;
  }, [[]]);
}

function sample(arr){
    return arr[Math.floor(Math.random() * arr.length)];    
}