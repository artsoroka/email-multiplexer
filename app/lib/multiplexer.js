var dec2bin = function(dec){
    return (dec >>> 0).toString(2);
}

var zerosRange = function(numberOfZeros){
	if( ! numberOfZeros ) return ''; 
	if( numberOfZeros == 1) return '0'; 

	var res = []; 
	for(var i = 0; i < numberOfZeros; i++){
		res.push(0); 
	}
	return res.join(''); 
}

var getRange = function(str){
	if( ! str.length ) return 0; 
	if( str.length == 1 ) return '1'; 
	var res = []; 
	for(var i = 0; i < str.length; i++){
		res.push('1'); 
	}

	var bin = res.join(''); 
	return parseInt(bin,2);  
}

var prependZeros = function(bin, base){
	return [zerosRange(base - bin.length), bin].join(''); 
}; 

var getCombinations = function(str){

	var pos   = str.length - 1; 
	var range = getRange(str); 

	var combinations = []; 
	for(var i = 0; i < range; i++){
		var bin = dec2bin(i); 
		combinations.push(prependZeros(bin, str.length));  
	}

	return combinations.filter(function(e){
		return e[0] == '0'; 
	});   
}

var prependWithDot = function(str, index){
	var res = []; 
	for(letter in str){
		if( index[letter] == '0'){
			res.push(str[letter]); 
		} else {
			res.push('.' + str[letter]); 
		}
	}
	return res.join(''); 
}

var multiplexer = function(str){

	var combinations = getCombinations(str); 
	return combinations.reduce(function(acc, combination){
		acc.push(prependWithDot(str, combination)); 
		return acc; 
	}, []); 

}; 
 
module.exports = multiplexer; 