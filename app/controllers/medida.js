// app/controllers/medida.js
console.log('app/controllers/medida.js', Date.now());

var sanitize = require('mongo-sanitize');

// Codigo comentado acima antes de usar o model com mongoose
module.exports = function (app) {
	
	var Medida = app.models.medida;

	var controller = {};
	
	controller.listaMedidas = function(req, res) {
		console.log("controller.listaMedidas");
		Medida.find().exec()
		.then(
			function(medidas) {
				res.json(medidas);
			},
			function(erro) {
				console.error(erro);
				res.status(500).json(erro);
			}
			);
	};
	
	controller.obtemMedida = function(req, res) {
		console.log("controller.obtemMedida");
		var _id = req.params.id;
		Medida.findById(_id).exec()
		.then(function(medida) {
			if (!medida) throw new Error("Medida não encontrado");
			res.json(medida) ;
		},
		function(erro) {
			console.log(erro);
			res.status(404).json(erro);
		}
		);
	};
	
	controller.removeMedida = function(req, res) {
		console.log("controller.removeMedida");
		// var _id = req.params.id;
		// sanitizando requisicao com o mongo-sanitize para evitar query selector injection
		var _id = sanitize(req.params.id);
		// Um Model criado pelo Mongoose possui a função findByIdAndRemove que remove e passa para o callback o medida
		// removido. Em nosso caso, não temos interesse no documento removido; é por isso que a função remove foi utilizada.
		Medida.remove({"_id" : _id}).exec()
		.then(
			function() {
				res.status(204).end();
			},
			function(erro) {
				return console.error(erro);
			}
			);
	};
	
	controller.salvaMedida = function(req, res) {
		console.log("controller.salvaMedida");
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
			Medida.findByIdAndUpdate(_id, req.body).exec()
			// Medida.findByIdAndUpdate(_id, dados).exec()
			.then(
				function(medida) {
					res.json(medida);
				},
				function(erro) {
					console.error(erro);
					res.status(500).json(erro);
				}
				);
		} else {
			Medida.create(req.body)
			.then(
				function(medida) {
					res.status(201).json(medida);
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