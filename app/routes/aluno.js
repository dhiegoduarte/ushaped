// app/routes/aluno.js
console.log('app/routes/aluno.js', Date.now());

function verificaAutenticacao(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.status('401').json('Não autorizado');
	}
}

module.exports = function(app) {
	// console.log('module.exports', Date.now());

	var controller = app.controllers.aluno;
	
	// modo antigo de realizar as rotas
	// app.get('/alunos', controller.listaAlunos);
	// app.get('/alunos/:id', controller.obtemAluno);
	// app.delete('/alunos/:id', controller.removeAluno);

	// TODO DHIEGO
	// Sem autenticacao
	app.route('/alunos')
	.get(controller.listaAlunos)
	.post(controller.salvaAluno);
	
	app.route('/alunos/:id')
	.get(controller.obtemAluno)
	.delete(controller.removeAluno);

	// Com autenticacao
	// app.route('/alunos')
	// .get(verificaAutenticacao, controller.listaAlunos)
	// .post(verificaAutenticacao, controller.salvaAluno);
	
	// app.route('/alunos/:id')
	// .get(verificaAutenticacao, controller.obtemAluno)
	// .delete(verificaAutenticacao, controller.removeAluno);
};