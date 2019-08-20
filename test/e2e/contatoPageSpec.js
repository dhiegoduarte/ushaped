// test/e2e/contatoPageSpec.js
var ContatoPage = new require('./pages/contatoPage');

describe('Cadastro de contatos', function() {
	var pagina = new ContatoPage();

	beforeEach(function() {
		// browser.get('http://localhost:3000/#/contato');
		pagina.visitar();
	});

	it('Deve cadastrar um contato sem emergencia', function() {
		console.log("Deve cadastrar um contato sem emergencia");
		var aleatorio = Math.floor((Math.random() * 1000) + 1);
		pagina.digitarNome('teste' + aleatorio);
		pagina.digitarEmail('teste@email' + aleatorio);
		pagina.salvar();

		expect(pagina.obterMensagem()).toContain('sucesso');
	});

	it('Deve cadastrar um contato com emergencia', function() {
		console.log("Deve cadastrar um contato com emergencia");
		var aleatorio = Math.floor((Math.random() * 1000) + 1);
		pagina.digitarNome('teste' + aleatorio);
		pagina.digitarEmail('teste@email' + aleatorio);
		pagina.selecionarPrimeiraEmergenciaDaLista();
		pagina.salvar();

		expect(pagina.obterMensagem()).toContain('sucesso');
	});
});