// ushaped/server.js
// Utilizando o express
console.log('server.js', Date.now());

// var teste = "testado";

var http = require('http');
var app = require('./config/express')();

var config = require('./config/config')();

require('./config/passport')();
//conexao com o mongodb. Caso o banco nao exista ele é criado
// require('./config/database.js')('mongodb://localhost/ushaped');
require('./config/database')(config.db); 

// http.createServer(app).listen(app.get('port'), function(){
	// console.log('http.createServer', Date.now());
	// console.log('Express Server escutando na porta ' + app.get('port'));
// });

http.createServer(app).listen(config.port, config.address,
	function(){
		console.log('Express Https Server '	+ config.address + 
			' (' + config.env + ') escutando na porta ' + config.port);
	});


// Iniciando o node sem o express
// var http = require('http');
// http.createServer(function (req, res) {
// 	res.writeHead(200, {'Content-Type': 'text/plain'});
// 	res.end('Sou um servidor criado pelo Node.js!\n');
// }).listen(3000, '127.0.0.1');