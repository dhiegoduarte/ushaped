// app/routes/contato.js
console.log('app/routes/contato.js', Date.now());

function verificaAutenticacao(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.status('401').json('Não autorizado');
	}
}

module.exports = function(app) {
	// console.log('module.exports', Date.now());

	var controller = app.controllers.contato;
	
	// modo antigo de realizar as rotas
	// app.get('/contatos', controller.listaContatos);
	// app.get('/contatos/:id', controller.obtemContato);
	// app.delete('/contatos/:id', controller.removeContato);

	// Sem autenticacao
	app.route('/contatos')
	.get(controller.listaContatos)
	.post(controller.salvaContato);
	
	app.route('/contatos/:id')
	.get(controller.obtemContato)
	.delete(controller.removeContato);

	// Com autenticacao
	// app.route('/contatos')
	// .get(verificaAutenticacao, controller.listaContatos)
	// .post(verificaAutenticacao, controller.salvaContato);
	
	// app.route('/contatos/:id')
	// .get(verificaAutenticacao, controller.obtemContato)
	// .delete(verificaAutenticacao, controller.removeContato);
};