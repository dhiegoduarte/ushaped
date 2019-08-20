// test/e2e/pages/seriesPage.js
var seriesPage = function() {
	this.visitar = function() {
		browser.get('http://localhost:3000/#/series');
	};
	this.obterUsuarioLogado = function(nome) {
		return element(by.id('usuario-logado')).getText();
	};
	this.obterTotalDeItensDaLista = function() {
		return element.all(by.repeater('serie in series')).count();
	};
	this.removerPrimeiroItemDaLista = function() {
		element(by.repeater('serie in series').row(0)).element(by.css('.btn')).click();
	}
	this.clicarPrimeiraSerieDaLista = function() {
		element(by.repeater('serie in series').row(0)).element(by.css('a[href^="#/serie"]')).click();
	}
}
module.exports = seriesPage;