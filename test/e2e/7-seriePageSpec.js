// test/e2e/seriePageSpec.js
var SeriePage = new require('./pages/seriePage');
var SeriesPage = new require('./pages/seriesPage');
var ExercicioPage = new require('./pages/exercicioPage');
var MedidaPage = new require('./pages/medidaPage');

describe('Cadastro de series', function() {
	var paginaSerie = new SeriePage();
	var paginaSeries = new SeriesPage();
	var paginaExercicio = new ExercicioPage();
	var paginaMedida = new MedidaPage();
	var aleatorio = Math.floor((Math.random() * 10000000) + 1);

	// beforeEach(function() {
	// 	paginaSerie.visitar();
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

	it('Deve cadastrar um serie', function() {
		// debugger;
		console.log("Deve cadastrar um serie");
		paginaSerie.visitar();
		paginaSerie.digitarNome('teste' + aleatorio);
	
		// adiciona exercicio
		paginaSerie.selecionarPrimeiroExercicioDaLista();
		paginaSerie.digitarQuantidade(aleatorio);
		paginaSerie.selecionarPrimeiraMedidaDaLista();
		paginaSerie.addExercicio();
		paginaSerie.salvar();
		expect(paginaSerie.obterMensagem()).toContain('sucesso');
	});

});