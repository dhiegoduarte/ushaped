// app/controllers/aluno.js
console.log('app/controllers/aluno.js', Date.now());

var sanitize = require('mongo-sanitize');

// Codigo comentado acima antes de usar o model com mongoose
module.exports = function (app) {
	// console.log('module.exports', Date.now());
	
	// Guardamos uma referência para o Model na variável Aluno iniciando
	// com letra maiúscula, uma convenção bastante utilizada para funções
	// construtoras. Essas funções permitem utilizar o operador new para criarmos
	// novas instâncias, objetos que representam nossos documentos.
	var Aluno = app.models.aluno;

	var controller = {};
	
	controller.listaAlunos = function(req, res) {
		console.log("controller.listaAlunos");
		// Precisa popular a referencia emergencia definida no schema do mongoose
		// Aluno.find().populate('emergencia').exec()
		Aluno.find()
		.then(
			function(alunos) {
				res.json(alunos);
			},
			function(erro) {
				console.error(erro);
				res.status(500).json(erro);
			}
			);
	};
	
	controller.obtemAluno = function(req, res) {
		console.log("controller.obtemAluno");
		var _id = req.params.id;
		Aluno.findById(_id).populate('series.exercicios.exercicio').populate('series.exercicios.medida').exec()
		// se quiser buscar apenas o nome e email usa select 
		// Aluno.findById(_id).select("nome email").exec()
		.then(function(aluno) {
			if (!aluno) throw new Error("Aluno não encontrado");
			res.json(aluno) ;
		},
		function(erro) {
			console.log(erro);
			res.status(404).json(erro);
		}
		);
	};
	
	controller.removeAluno = function(req, res) {
		console.log("controller.removeAluno");
		// var _id = req.params.id;
		// sanitizando requisicao com o mongo-sanitize para evitar query selector injection
		var _id = sanitize(req.params.id);
		// Um Model criado pelo Mongoose possui a função findByIdAndRemove que remove e passa para o callback o aluno
		// removido. Em nosso caso, não temos interesse no documento removido; é por isso que a função remove foi utilizada.
		Aluno.remove({"_id" : _id}).exec()
		.then(
			function() {
				res.status(204).end();
			},
			function(erro) {
				return console.error(erro);
			}
			);
	};
	
	//TODO DHIEGO
	controller.salvaAluno = function(req, res) {
		console.log("controller.salvaAluno");
		var _id = req.body._id;
		
		console.log("req.body ",req.body);
		
		//TODO adicionar esse mapeamento pois evita que campos injetados indevidamente na requisição sejam salvos
		// var dados = {
		// 	"nome" : req.body.nome,
		// 	"genero" : req.body.genero,
		// 	"email" : req.body.email,
		// 	"telefone" : req.body.telefone,
		// 	"altura" : req.body.altura,
		// 	"peso" : req.body.peso,
		// };
		
		// testando por undefined
		// req.body.emergencia = req.body.emergencia || null;

		if(_id) {
			Aluno.findByIdAndUpdate(_id, req.body).exec()
			// Aluno.findByIdAndUpdate(_id, dados).exec()
			.then(
				function(aluno) {
					res.json(aluno);
				},
				function(erro) {
					console.error(erro);
					res.status(500).json(erro);
				}
				);
		} else {
			Aluno.create(dados)
			.then(
				function(aluno) {
					res.status(201).json(aluno);
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