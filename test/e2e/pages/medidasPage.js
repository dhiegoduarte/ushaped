// test/e2e/pages/medidasPage.js
var medidasPage = function() {
	this.visitar = function() {
		browser.get('http://localhost:3000/#/medidas');
	};
	this.obterUsuarioLogado = function(nome) {
		return element(by.id('usuario-logado')).getText();
	};
	this.obterTotalDeItensDaLista = function() {
		return element.all(by.repeater('medida in medidas')).count();
	};
	this.removerPrimeiroItemDaLista = function() {
		element(by.repeater('medida in medidas').row(0)).element(by.css('.btn')).click();
	}
}
module.exports = medidasPage;