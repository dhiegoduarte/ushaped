// app/routes/exercicio.js
console.log('app/routes/exercicio.js', Date.now());

function verificaAutenticacao(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.status('401').json('Não autorizado');
	}
}

module.exports = function(app) {
	// console.log('module.exports', Date.now());

	var controller = app.controllers.exercicio;
	
	// modo antigo de realizar as rotas
	// app.get('/contatos', controller.listaExercicios);
	// app.get('/contatos/:id', controller.obtemExercicio);
	// app.delete('/contatos/:id', controller.removeExercicio);

	// TODO DHIEGO
	// Sem autenticacao
	app.route('/exercicios')
	.get(controller.listaExercicios)
	.post(controller.salvaExercicio);
	
	app.route('/exercicios/:id')
	.get(controller.obtemExercicio)
	.delete(controller.removeExercicio);

	// Com autenticacao
	// app.route('/exercicios')
	// .get(verificaAutenticacao, controller.listaExercicios)
	// .post(verificaAutenticacao, controller.salvaExercicio);
	
	// app.route('/exercicios/:id')
	// .get(verificaAutenticacao, controller.obtemExercicio)
	// .delete(verificaAutenticacao, controller.removeExercicio);
};