// app/controllers/contato.js
console.log('app/controllers/contato.js', Date.now());

// var contatos = [{_id: 1, nome: 'Contato Exemplo 1', email: 'cont1@empresa.com.br'},
// 	{_id: 2, nome: 'Contato Exemplo 2', email: 'cont2@empresa.com.br'},
// 	{_id: 3, nome: 'Contato Exemplo 3', email: 'cont3@empresa.com.br'}];

// module.exports = function() {
// 	console.log('module.exports', Date.now());
// 	var controller = {};

// 	var ID_CONTATO_INC = 3;

// 	controller.listaContatos = function(req, res) {
// 		console.log('controller.listaContatos', Date.now());
// 		// De acordo com a documentação do Express, res.json é idêntico
// 		// a res.send quando um objeto ou array é passado. A diferença
// 		// é que o primeiro explicitamente converte tipos não-objeto como null
// 		// e undefined. Usamos res.json também para deixar clara nossa intenção
// 		// de trabalhar com este tipo de dado.
// 		res.json(contatos);
// 	};

// 	controller.obtemContato = function(req, res) {
// 		console.log('controller.obtemContato', Date.now());
// 		var idContato = req.params.id;
// 		var contato = contatos.filter(function(contato) {
// 			return contato._id == idContato;
// 		})[0];

// 		contato ? res.json(contato) : res.status(404).send('Contato não encontrado');
// 	};

// 	controller.removeContato = function(req, res) {
// 		console.log('controller.removeContato', Date.now());
// 		var idContato = req.params.id;
// 		contatos = contatos.filter(function(contato) {
// 			return contato._id != idContato;
// 		});
// 		res.status(204).end();

// 	};

// 	controller.salvaContato = function(req, res) {
// 		console.log('controller.salvaContato', Date.now());
// 		var contato = req.body;
// 		// console.log('contato', contato); 
// 		contato = contato._id ?
// 		atualiza(contato) :
// 		adiciona(contato);
// 		res.json(contato);
// 	};

// 	function adiciona(contatoNovo) {
// 		contatoNovo._id = ++ID_CONTATO_INC;
// 		contatos.push(contatoNovo);
// 		return contatoNovo;
// 	}
// 	function atualiza(contatoAlterar) {
// 		contatos = contatos.map(function(contato) {
// 			if(contato._id == contatoAlterar._id) {
// 				contato = contatoAlterar;
// 			}
// 			return contato;
// 		});
// 		return contatoAlterar;
// 	}
	
// 	return controller;

var sanitize = require('mongo-sanitize');

// Codigo comentado acima antes de usar o model com mongoose
module.exports = function (app) {
	// console.log('module.exports', Date.now());
	
	// Guardamos uma referência para o Model na variável Contato iniciando
	// com letra maiúscula, uma convenção bastante utilizada para funções
	// construtoras. Essas funções permitem utilizar o operador new para criarmos
	// novas instâncias, objetos que representam nossos documentos.
	var Contato = app.models.contato;

	var controller = {};
	
	controller.listaContatos = function(req, res) {
		console.log("controller.listaContatos");
		// Precisa popular a referencia emergencia definida no schema do mongoose
		Contato.find().populate('emergencia').exec()
		.then(
			function(contatos) {
				res.json(contatos);
			},
			function(erro) {
				console.error(erro);
				res.status(500).json(erro);
			}
			);
	};
	
	controller.obtemContato = function(req, res) {
		console.log("controller.obtemContato");
		var _id = req.params.id;
		Contato.findById(_id).exec()
		.then(function(contato) {
			if (!contato) throw new Error("Contato não encontrado");
			res.json(contato) ;
		},
		function(erro) {
			console.log(erro);
			res.status(404).json(erro);
		}
		);
	};
	
	controller.removeContato = function(req, res) {
		console.log("controller.removeContato");
		// var _id = req.params.id;
		// sanitizando requisicao com o mongo-sanitize para evitar query selector injection
		var _id = sanitize(req.params.id);
		// Um Model criado pelo Mongoose possui a função findByIdAndRemove que remove e passa para o callback o contato
		// removido. Em nosso caso, não temos interesse no documento removido; é por isso que a função remove foi utilizada.
		Contato.remove({"_id" : _id}).exec()
		.then(
			function() {
				res.status(204).end();
			},
			function(erro) {
				return console.error(erro);
			}
			);
	};
	
	controller.salvaContato = function(req, res) {
		console.log("controller.salvaContato");
		var _id = req.body._id;
		/*
		Independente da quantidade de parâmetros,
		apenas selecionamos o nome, email e emergencia:
		*/
		var dados = {
			"nome" : req.body.nome,
			"email" : req.body.email,
			"emergencia" : req.body.emergencia || null
		};
		
		// testando por undefined
		// req.body.emergencia = req.body.emergencia || null;

		if(_id) {
			// Contato.findByIdAndUpdate(_id, req.body).exec()
			Contato.findByIdAndUpdate(_id, dados).exec()
			.then(
				function(contato) {
					res.json(contato);
				},
				function(erro) {
					console.error(erro);
					res.status(500).json(erro);
				}
				);
		} else {
			Contato.create(dados)
			.then(
				function(contato) {
					res.status(201).json(contato);
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

// Contato.find()
// .select("nome email")
// .exec();

// Contato.find()
// .select("nome email")
// .where("email").equals(/cont/)
// .exec()
// .then(function(nomeEhEmail) {
// console.log(nomeEhEmail);
// });



};