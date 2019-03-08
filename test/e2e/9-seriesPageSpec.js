// test/e2e/seriesPageSpec.js
var SeriesPage = new require('./pages/seriesPage');
var SeriePage = new require('./pages/seriePage');

describe('Página principal', function() {
	var paginaSerie = new SeriePage();
	var paginaSeries = new SeriesPage();

	// beforeEach(function() {
	// 	pagina.visitar();
	// });

	// TODO DHIEGO
	// it('Deve estar logado', function() {
	// 	// element(by.id('usuario-logado')).getText().then(function(texto) {
	// 		pagina.obterUsuarioLogado().then(function(texto) {
	// 			expect(texto.trim().length).toBeGreaterThan(0);
	// 	});
	// });

	it('Deve editar uma serie, removendo exercicio', function() {
		// debugger;
		console.log("Deve editar uma serie, removendo exercicio");

		paginaSeries.visitar();
		paginaSeries.clicarPrimeiraSerieDaLista();
		
		// remove exercicio
		paginaSerie.removerPrimeiroExercicioDaLista();
		paginaSerie.salvar();
		expect(paginaSerie.obterMensagem()).toContain('sucesso');
	});	

	it('Deve remover um serie da lista', function() {
		console.log("Deve remover um serie da lista");
		paginaSeries.visitar();
		var totalAntes = paginaSeries.obterTotalDeItensDaLista();
		paginaSeries.removerPrimeiroItemDaLista();
		var totalDepois = paginaSeries.obterTotalDeItensDaLista();
		expect(totalDepois).toBeLessThan(totalAntes);
	});

}); 	