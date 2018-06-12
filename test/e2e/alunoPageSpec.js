// test/e2e/alunoPageSpec.js
var AlunoPage = new require('./pages/alunoPage');

describe('Cadastro de alunos', function() {
	var pagina = new AlunoPage();

	beforeEach(function() {
		pagina.visitar();
	});

	it('Deve cadastrar um aluno', function() {
		console.log("Deve cadastrar um aluno");
		var aleatorio = Math.floor((Math.random() * 1000) + 1);
		pagina.digitarNome('teste' + aleatorio);
		pagina.selecionarGenero();
		pagina.digitarEmail('teste@email' + aleatorio);
		pagina.digitarTelefone(aleatorio);
		pagina.digitarPeso(999);
		pagina.digitarAltura(999);
		pagina.salvar();
		expect(pagina.obterMensagem()).toContain('sucesso');
	});
});