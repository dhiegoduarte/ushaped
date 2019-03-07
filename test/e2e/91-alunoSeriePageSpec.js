// test/e2e/alunosEriePageSpec.js
// var AlunoSeriePage = new require('./pages/alunoSeriePage');
var AlunoPage = new require('./pages/alunoPage');
var AlunosPage = new require('./pages/alunosPage');

describe('Página principal', function() {
	// var pagina = new AlunoSeriePage();
	var paginaAluno = new AlunoPage();
	var paginaAlunos = new AlunosPage();

	// beforeEach(function() {
	// 	paginaAluno.visitar();
	// });

	// TODO DHIEGO
	// it('Deve estar logado', function() {
	// 	// element(by.id('usuario-logado')).getText().then(function(texto) {
	// 		pagina.obterUsuarioLogado().then(function(texto) {
	// 			expect(texto.trim().length).toBeGreaterThan(0);
	// 	});
	// });

	// TODO
	it('Deve editar a serie do aluno', function() {
		console.log("Deve editar a serie do aluno");
		// paginaAlunos.visitar();
		// paginaAlunos.clicarPrimeiroAlunoDaLista();
		// paginaAluno.removerPrimeiraSerieDaLista();
		// paginaAluno.salvar();
		// expect(paginaAluno.obterMensagem()).toContain('sucesso');
	});

	it('Deve remover a serie do aluno', function() {
		console.log("Deve remover a serie do aluno");
		paginaAlunos.visitar();
		paginaAlunos.clicarPrimeiroAlunoDaLista();
		paginaAluno.removerPrimeiraSerieDaLista();
		paginaAluno.salvar();
		expect(paginaAluno.obterMensagem()).toContain('sucesso');
	});
	
}); 	