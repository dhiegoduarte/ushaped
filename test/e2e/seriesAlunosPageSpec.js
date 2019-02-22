// test/e2e/seriesAlunosPageSpec.js
var SeriesAlunosPage = new require('./pages/seriesAlunosPage');
var AlunoPage = new require('./pages/alunoPage');

describe('Página principal', function() {
	var pagina = new SeriesAlunosPage();
	var paginaAluno = new AlunoPage();

	beforeEach(function() {
		paginaAluno.visitar();
	});

	// TODO DHIEGO
	// it('Deve estar logado', function() {
	// 	// element(by.id('usuario-logado')).getText().then(function(texto) {
	// 		pagina.obterUsuarioLogado().then(function(texto) {
	// 			expect(texto.trim().length).toBeGreaterThan(0);
	// 	});
	// });

	it('Deve atribuir a primeira serie do combo ao primeiro aluno da lista', function() {
		console.log("Deve cadastrar um aluno pois os alunos foram removidos nos testes anteriores");
		var aleatorio = Math.floor((Math.random() * 1000) + 1);
		paginaAluno.digitarNome('teste' + aleatorio);
		paginaAluno.selecionarGenero();
		paginaAluno.digitarEmail('teste@email' + aleatorio);
		paginaAluno.digitarTelefone(aleatorio);
		paginaAluno.digitarPeso(999);
		paginaAluno.digitarAltura(999);
		paginaAluno.salvar();
		expect(paginaAluno.obterMensagem()).toContain('sucesso');
		
		console.log("Deve atribuir a primeira serie do combo ao primeiro aluno da lista");
		pagina.visitar();
		// var totalAntes = pagina.obterTotalDeItensDaLista();
		pagina.selecionarPrimeiraSerieDaLista();
		pagina.selecionarPrimeiroAluno();
		// var totalDepois = pagina.obterTotalDeItensDaLista();
		pagina.salvar();
		expect(pagina.obterMensagem()).toContain('sucesso');
	});

}); 	