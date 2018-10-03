// app/controllers/serie.js
console.log('app/controllers/serie.js', Date.now());

var sanitize = require('mongo-sanitize');

// Codigo comentado acima antes de usar o model com mongoose
module.exports = function (app) {
	
	var Serie = app.models.serie;

	var controller = {};
	
	controller.listaSeries = function(req, res) {
		console.log("controller.listaSeries");
		Serie.find().exec()
		.then(
			function(series) {
				res.json(series);
			},
			function(erro) {
				console.error(erro);
				res.status(500).json(erro);
			}
			);
	};
	
	controller.obtemSerie = function(req, res) {
		console.log("controller.obtemSerie");
		var _id = req.params.id;
		Serie.findById(_id).exec()
		.then(function(serie) {
			if (!serie) throw new Error("Serie não encontrado");
			res.json(serie) ;
		},
		function(erro) {
			console.log(erro);
			res.status(404).json(erro);
		}
		);
	};
	
	controller.removeSerie = function(req, res) {
		console.log("controller.removeSerie");
		// var _id = req.params.id;
		// sanitizando requisicao com o mongo-sanitize para evitar query selector injection
		var _id = sanitize(req.params.id);
		// Um Model criado pelo Mongoose possui a função findByIdAndRemove que remove e passa para o callback o serie
		// removido. Em nosso caso, não temos interesse no documento removido; é por isso que a função remove foi utilizada.
		Serie.remove({"_id" : _id}).exec()
		.then(
			function() {
				res.status(204).end();
			},
			function(erro) {
				return console.error(erro);
			}
			);
	};
	
	controller.salvaSerie = function(req, res) {
		console.log("controller.salvaSerie");
		var _id = req.body._id;
		/*
		Independente da quantidade de parâmetros,
		apenas selecionamos o nome, email e emergencia:
		*/
		// var dados = {
		// 	"nome" : req.body.nome,
		// 	"email" : req.body.email,
		// 	"emergencia" : req.body.emergencia || null
		// };
		
		// testando por undefined
		// req.body.emergencia = req.body.emergencia || null;

		if(_id) {
			Serie.findByIdAndUpdate(_id, req.body).exec()
			// Serie.findByIdAndUpdate(_id, dados).exec()
			.then(
				function(serie) {
					res.json(serie);
				},
				function(erro) {
					console.error(erro);
					res.status(500).json(erro);
				}
				);
		} else {
			Serie.create(req.body)
			.then(
				function(serie) {
					res.status(201).json(serie);
				},
				function(erro) {
					console.log(erro);
					res.status(500).json(erro);
				}
				);
		}
	};
	// console.log(typeof controller);
	return controller;

};