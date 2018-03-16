// config/database.js
console.log('config/database.js', Date.now());

var mongoose = require('mongoose');

module.exports = function(uri) {
	// console.log('module.exports', Date.now());
	
	// logs de debug impressos no consolce
	mongoose.set('debug',false);
	
	mongoose.connect(uri);
	// por padrao cria pool com 5 conexoes, se precisar de um pool maior
	// mongoose.connect(uri, { server: { poolSize: 15 }});

	mongoose.connection.on('connected', function() {
		console.log('Mongoose! Conectado em ' + uri);
	});

	mongoose.connection.on('disconnected', function() {
		console.log('Mongoose! Desconectado de ' + uri);
	});
	
	mongoose.connection.on('error', function(erro) {
		console.log('Mongoose! Erro na conexão: ' + erro);
	});

	// garantir que a conexão seja fechada quando nossa aplicação for terminada.
	// O objeto process possui o evento SIGINIT disparado quando nossa
	// aplicação é terminada (por exemplo: CONTROL + C no terminal). É através
	// do callback associado a este evento que pediremos ao Mongoose que feche
	// nossa conexão através da função close:
	process.on('SIGINT', function() {
		mongoose.connection.close(function() {
			console.log('Mongoose! Desconectado pelo término da aplicação');
			// 0 indica que a finalização ocorreu sem erros
			process.exit(0);
		});
	});
}