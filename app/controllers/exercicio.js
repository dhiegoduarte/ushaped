// app/controllers/exercicio.js
console.log('app/controllers/exercicio.js', Date.now());

var sanitize = require('mongo-sanitize');

// Codigo comentado acima antes de usar o model com mongoose
module.exports = function (app) {
	
	var Exercicio = app.models.exercicio;

	var controller = {};
	
	controller.listaExercicios = function(req, res) {
		console.log("controller.listaExercicios");
		Exercicio.find().exec()
		.then(
			function(exercicios) {
				res.json(exercicios);
			},
			function(erro) {
				console.error(erro);
				res.status(500).json(erro);
			}
			);
	};
	
	controller.obtemExercicio = function(req, res) {
		console.log("controller.obtemExercicio");
		var _id = req.params.id;
		Exercicio.findById(_id).exec()
		.then(function(exercicio) {
			if (!exercicio) throw new Error("Exercicio não encontrado");
			res.json(exercicio) ;
		},
		function(erro) {
			console.log(erro);
			res.status(404).json(erro);
		}
		);
	};
	
	controller.removeExercicio = function(req, res) {
		console.log("controller.removeExercicio");
		// var _id = req.params.id;
		// sanitizando requisicao com o mongo-sanitize para evitar query selector injection
		var _id = sanitize(req.params.id);
		// Um Model criado pelo Mongoose possui a função findByIdAndRemove que remove e passa para o callback o exercicio
		// removido. Em nosso caso, não temos interesse no documento removido; é por isso que a função remove foi utilizada.
		Exercicio.remove({"_id" : _id}).exec()
		.then(
			function() {
				res.status(204).end();
			},
			function(erro) {
				return console.error(erro);
			}
			);
	};
	
	controller.salvaExercicio = function(req, res) {
		console.log("controller.salvaExercicio");
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
			Exercicio.findByIdAndUpdate(_id, req.body).exec()
			// Exercicio.findByIdAndUpdate(_id, dados).exec()
			.then(
				function(exercicio) {
					res.json(exercicio);
				},
				function(erro) {
					console.error(erro);
					res.status(500).json(erro);
				}
				);
		} else {
			Exercicio.create(req.body)
			.then(
				function(exercicio) {
					res.status(201).json(exercicio);
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