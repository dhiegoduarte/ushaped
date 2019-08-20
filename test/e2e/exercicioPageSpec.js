// test/e2e/exercicioPageSpec.js
var ExercicioPage = new require('./pages/exercicioPage');

describe('Cadastro de exercicios', function() {
	var pagina = new ExercicioPage();

	beforeEach(function() {
		pagina.visitar();
	});

	it('Deve cadastrar um exercicio', function() {
		console.log("Deve cadastrar um exercicio");
		var aleatorio = Math.floor((Math.random() * 10000000) + 1);
		pagina.digitarNome('teste' + aleatorio);
		pagina.salvar();
		expect(pagina.obterMensagem()).toContain('sucesso');
	});
});