// test/e2e/pages/exerciciosPage.js
var exerciciosPage = function() {
	this.visitar = function() {
		browser.get('http://localhost:3000/#/exercicios');
	};
	this.obterUsuarioLogado = function(nome) {
		return element(by.id('usuario-logado')).getText();
	};
	this.obterTotalDeItensDaLista = function() {
		return element.all(by.repeater('exercicio in exercicios')).count();
	};
	this.removerPrimeiroItemDaLista = function() {
		element(by.repeater('exercicio in exercicios').row(0)).element(by.css('.btn')).click();
	}
}
module.exports = exerciciosPage;