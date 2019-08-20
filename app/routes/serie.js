// app/routes/serie.js
console.log('app/routes/serie.js', Date.now());

function verificaAutenticacao(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.status('401').json('Não autorizado');
	}
}

module.exports = function(app) {
	// console.log('module.exports', Date.now());

	var controller = app.controllers.serie;
	
	// modo antigo de realizar as rotas
	// app.get('/contatos', controller.listaSeries);
	// app.get('/contatos/:id', controller.obtemSerie);
	// app.delete('/contatos/:id', controller.removeSerie);

	// TODO DHIEGO
	// Sem autenticacao
	app.route('/series')
	.get(controller.listaSeries)
	.post(controller.salvaSerie);
	
	app.route('/series/:id')
	.get(controller.obtemSerie)
	.delete(controller.removeSerie);

	// Com autenticacao
	// app.route('/series')
	// .get(verificaAutenticacao, controller.listaSeries)
	// .post(verificaAutenticacao, controller.salvaSerie);
	
	// app.route('/series/:id')
	// .get(verificaAutenticacao, controller.obtemSerie)
	// .delete(verificaAutenticacao, controller.removeSerie);
};