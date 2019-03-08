// test/e2e/alunosEriePageSpec.js
var AlunoPage = new require('./pages/alunoPage');
var AlunosPage = new require('./pages/alunosPage');
var AlunoSeriePage = new require('./pages/alunoSeriePage');
var ExercicioPage = new require('./pages/exercicioPage');
var MedidaPage = new require('./pages/medidaPage');

describe('Página principal', function() {
	var paginaAluno = new AlunoPage();
	var paginaAlunos = new AlunosPage();
	var paginaAlunoSerie = new AlunoSeriePage();
	var paginaExercicio = new ExercicioPage();
	var paginaMedida = new MedidaPage();
	var aleatorio = Math.floor((Math.random() * 10000000) + 1);

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

	it('Deve cadastrar um exercicio', function() {
		// debugger;
		console.log("Deve cadastrar um exercicio");
		paginaExercicio.visitar();
		paginaExercicio.digitarNome('teste' + aleatorio);
		paginaExercicio.salvar();
		expect(paginaExercicio.obterMensagem()).toContain('sucesso');
	});

	it('Deve cadastrar uma medida', function() {
		// debugger;
		console.log("Deve cadastrar uma medida");
		paginaMedida.visitar();
		paginaMedida.digitarNome('teste' + aleatorio);
		paginaMedida.salvar();
		expect(paginaMedida.obterMensagem()).toContain('sucesso');
	});

	it('Deve editar a serie do aluno ,adicionando exercicio', function() {
		console.log("Deve editar a serie do aluno ,adicionando exercicio");
		paginaAlunos.visitar();
		paginaAlunos.clicarPrimeiroAlunoDaLista();
		paginaAluno.clicarPrimeiraSerieDaLista();
		
		// adiciona exercicio
		paginaAlunoSerie.selecionarPrimeiroExercicioDaLista();
		paginaAlunoSerie.digitarQuantidade(aleatorio);
		paginaAlunoSerie.selecionarPrimeiraMedidaDaLista();
		paginaAlunoSerie.addExercicio();
		paginaAlunoSerie.salvar();
		expect(paginaAlunoSerie.obterMensagem()).toContain('sucesso');
	});

	it('Deve editar a serie do aluno, removendo exercicio', function() {
		// debugger;
		console.log("Deve editar a serie do aluno, removendo exercicio");
		paginaAlunos.visitar();
		paginaAlunos.clicarPrimeiroAlunoDaLista();
		paginaAluno.clicarPrimeiraSerieDaLista();
		paginaAlunoSerie.removerPrimeiroExercicioDaLista();
		paginaAlunoSerie.salvar();
		expect(paginaAlunoSerie.obterMensagem()).toContain('sucesso');
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