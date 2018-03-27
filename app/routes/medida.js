// app/routes/medida.js
console.log('app/routes/medida.js', Date.now());

function verificaAutenticacao(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.status('401').json('Não autorizado');
	}
}

module.exports = function(app) {
	// console.log('module.exports', Date.now());

	var controller = app.controllers.medida;
	
	// modo antigo de realizar as rotas
	// app.get('/contatos', controller.listaMedidas);
	// app.get('/contatos/:id', controller.obtemMedida);
	// app.delete('/contatos/:id', controller.removeMedida);

	// Sem autenticacao
	app.route('/medidas')
	.get(controller.listaMedidas)
	.post(controller.salvaMedida);
	
	app.route('/medidas/:id')
	.get(controller.obtemMedida)
	.delete(controller.removeMedida);

	// Com autenticacao
	// app.route('/medidas')
	// .get(verificaAutenticacao, controller.listaMedidas)
	// .post(verificaAutenticacao, controller.salvaMedida);
	
	// app.route('/medidas/:id')
	// .get(verificaAutenticacao, controller.obtemMedida)
	// .delete(verificaAutenticacao, controller.removeMedida);
};