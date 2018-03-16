// test/e2e/contatoPageSpec.js
var ContatoPage = new require('./pages/contatoPage');

describe('Cadastro de contatos', function() {
	var pagina = new ContatoPage();

	beforeEach(function() {
		// browser.get('http://localhost:3000/#/contato');
		pagina.visitar();
	});

	it('Deve cadastrar um contato', function() {
		var aleatorio = Math.floor((Math.random() * 10000000) + 1);
		
		// var nome = 'teste' + aleatorio;
		// var email = 'teste@email' + aleatorio;
		// // O Protractor disponibiliza a função by.model, que permite selecionar
		// // um elemento pelo valor de sua diretiva ng-model
		// element(by.model('contato.nome')).sendKeys(nome);
		// element(by.model('contato.email')).sendKeys(email);
		// element(by.css('option[value="0"]')).click();
		// element(by.css('.btn-primary')).click();
		// expect(element(by.binding('mensagem.texto')).getText()).toContain('sucesso');

		// usando PageObject
		pagina.digitarNome('teste' + aleatorio);
		pagina.digitarEmail('teste@email' + aleatorio);
		pagina.selecionarPrimeiraEmergenciaDaLista();
		pagina.salvar();
		expect(pagina.obterMensagem()).toContain('sucesso');
	});
});