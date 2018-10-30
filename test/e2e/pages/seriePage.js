// test/e2e/pages/seriePage.js
var seriePage = function() {
	this.visitar = function() {
		browser.get('http://localhost:3000/#/serie');
	};
	this.digitarNome = function(nome) {
		element(by.model('serie.nome')).sendKeys(nome);
	};
	this.selecionarPrimeiroExercicioDaLista = function() {
		// element(by.css('#exercicio option[value="0"]')).click();
		// element(by.model('elemento.exercicio')).click();
		// $('[value="0"]').click();
		// element(by.model('elemento.exercicio')).$('option[value="0"]').click(); //TODO Dhiego não funciona
		element(by.css('option[value="0"]')).click(); //deveria selecionar o primeiro item de todos os combos
		
	};
	this.digitarQuantidade = function(qtd) {
		element(by.id('quantidade')).sendKeys(qtd);
	};
	this.addExercicio = function() {
		// element(by.css('.btn-primary')).click();
		element(by.id('addExercicio')).click();
	};
	this.salvar = function() {
		// element(by.css('.btn-primary')).click();
		element(by.id('salvar')).click();
	};
	this.obterMensagem = function() {
		return element(by.binding('mensagem.texto')).getText()
	};
	
}
module.exports = seriePage;