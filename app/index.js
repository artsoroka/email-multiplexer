var express    = require('express'); 
var app        = express();
var multiplex  = require('./lib/multiplexer'); 
var config     = require('../config'); 

app.get('/', function(req,res){
	res.send('mainpage'); 
}); 

app.get('/multiplex/:email', function(req,res){
	var email = req.params.email || null; 

	if( email.match('@') ){
		email = email.split('@')[0]; 
	}

	if( ! email ) {
		return res.status(400).json({
			error: 'no email is specified'
		}); 
	}
	
	var data = null; 

	try{ 
		
		data = multiplex(email);  
	
	} catch(e){
		return res.status(500).json({
			error: 'internal error'
		}); 
	}

	res.json(data); 
	
}); 

app.all('*', function(req, res){
    res.status(404).send('sorry, page not found');  
}); 

module.exports = app; 