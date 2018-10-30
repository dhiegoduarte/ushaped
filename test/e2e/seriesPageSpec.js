// test/e2e/seriesPageSpec.js
var SeriesPage = new require('./pages/seriesPage');

describe('Página principal', function() {
	var pagina = new SeriesPage();

	beforeEach(function() {
		pagina.visitar();
	});

	// TODO DHIEGO
	// it('Deve estar logado', function() {
	// 	// element(by.id('usuario-logado')).getText().then(function(texto) {
	// 		pagina.obterUsuarioLogado().then(function(texto) {
	// 			expect(texto.trim().length).toBeGreaterThan(0);
	// 	});
	// });

	it('Deve remover um serie da lista', function() {
		console.log("Deve remover um serie da lista");
		var totalAntes = pagina.obterTotalDeItensDaLista();
		pagina.removerPrimeiroItemDaLista();
		var totalDepois = pagina.obterTotalDeItensDaLista();
		expect(totalDepois).toBeLessThan(totalAntes);
	});

}); 	