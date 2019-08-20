// test/e2e/pages/seriePage.js
var seriePage = function() {
	this.visitar = function() {
		browser.get('http://localhost:3000/#/serie');
	};
	this.digitarNome = function(nome) {
		// element(by.model('serie.nome')).sendKeys(nome);
		element(by.id('nome')).sendKeys(nome);
	};
	this.selecionarPrimeiroExercicioDaLista = function() {
		element(by.id('exercicio')).element(by.css('option[value="0"]')).click();
	};

	this.digitarQuantidade = function(qtd) {
		// element(by.id('quantidade')).sendKeys(qtd);
		element(by.model('elemento.quantidade')).sendKeys(qtd);
	};

	this.selecionarPrimeiraMedidaDaLista = function() {
		element(by.id('medida')).element(by.css('option[value="0"]')).click();
	};

	this.addExercicio = function() {
		element(by.id('addExercicio')).click();
		// browser.pause();
	};

	this.salvar = function() {
		// element(by.css('.btn-primary')).click();
		element(by.id('salvar')).click();
	};

	this.obterMensagem = function() {
		return element(by.binding('mensagem.texto')).getText()
	};

	this.removerPrimeiroExercicioDaLista = function() {
		element(by.repeater('linha in serie.exercicios').row(0)).element(by.css('.btn')).click();
	}
	
}
module.exports = seriePage;