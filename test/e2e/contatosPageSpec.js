// test/e2e/contatosPageSpec.js
var ContatosPage = new require('./pages/contatosPage');

describe('Página principal', function() {
	var pagina = new ContatosPage();

	beforeEach(function() {
		// Repare que dessa vez utilizamos diretamente browser e não
		// browser.driver como fizemos anteriormente. Agora faz todo sentido utilizamos
		// o wrapper doWebDriver disponibilizado pelo Protractor porque estamos
		// testando uma página que possui o AngularJS carregado.
		// browser.get('http://localhost:3000/#/contatos');
		pagina.visitar();
	});

	// Repare que, no lugar de usarmos a função findElement, utilizamos
	// element, esta última também fornecida pelo Protractor. Sua vantagem é
	// que, além das locator strategies que já aprendemos, ela aceita outras
	// específicas do AngularJS.
	it('Deve estar logado', function() {
		// element(by.id('usuario-logado')).getText().then(function(texto) {
			pagina.obterUsuarioLogado().then(function(texto) {
				expect(texto.trim().length).toBeGreaterThan(0);
		});
	});

	it('Deve remover um contato da lista', function() {
		// by repeater é coisa do protractor
		// var totalAntes = element.all(by.repeater('contato in contatos')).count();
		// element(by.repeater('contato in contatos').row(0)).element(by.css('.btn')).click();
		// var totalDepois = element.all(by.repeater('contato in contatos')).count();

		// usando PageObject
		var totalAntes = pagina.obterTotalDeItensDaLista();
		pagina.removerPrimeiroItemDaLista();
		var totalDepois = pagina.obterTotalDeItensDaLista();
		expect(totalDepois).toBeLessThan(totalAntes);
	});

}); 