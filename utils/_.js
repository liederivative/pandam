const _ = {
	
	groupBy: function(xs, key) {
	  return xs.reduce(function(rv, x) {
	  	// var v = key instanceof Function ? key(x) : x[key]; 
	    (rv[x[key]] = rv[x[key]] || []).push(x);
	    return rv;
	  }, {});
	},
	sum: function(array,key) {
	  var acc = 0,
	      average;

	  for (var i = 0; i < array.length; i++) {
	    acc += array[i][key];
  	}
  		return acc;
	},



}

module.exports = _;