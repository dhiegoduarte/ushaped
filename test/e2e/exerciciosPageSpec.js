// test/e2e/exerciciosPageSpec.js
var ExerciciosPage = new require('./pages/exerciciosPage');

describe('Página principal', function() {
	var pagina = new ExerciciosPage();

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

	it('Deve remover um exercicio da lista', function() {
		console.log("Deve remover um exercicio da lista");
		var totalAntes = pagina.obterTotalDeItensDaLista();
		pagina.removerPrimeiroItemDaLista();
		var totalDepois = pagina.obterTotalDeItensDaLista();
		expect(totalDepois).toBeLessThan(totalAntes);
	});

}); 	