// test/e2e/seriePageSpec.js
var SeriePage = new require('./pages/seriePage');

describe('Cadastro de series', function() {
	var pagina = new SeriePage();

	beforeEach(function() {
		pagina.visitar();
	});

	it('Deve cadastrar um serie', function() {
		debugger;
		console.log("Deve cadastrar um serie");
		var aleatorio = Math.floor((Math.random() * 10000000) + 1);
		pagina.digitarNome('teste' + aleatorio);
		// pagina.selecionarPrimeiroExercicioDaLista(); //TODO Dhiego não funciona
		pagina.digitarQuantidade(aleatorio);
		pagina.salvar();
		expect(pagina.obterMensagem()).toContain('sucesso');
	});
});