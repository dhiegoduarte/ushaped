// test/e2e/pages/alunosPage.js
var alunosPage = function() {
	this.visitar = function() {
		browser.get('http://localhost:3000/#/alunos');
	};
	this.obterUsuarioLogado = function(nome) {
		return element(by.id('usuario-logado')).getText();
	};
	this.obterTotalDeItensDaLista = function() {
		return element.all(by.repeater('aluno in alunos')).count();
	};
	this.removerPrimeiroItemDaLista = function() {
		element(by.repeater('aluno in alunos').row(0)).element(by.css('.btn')).click();
	}
	this.clicarPrimeiroAlunoDaLista = function() {
		element(by.repeater('aluno in alunos').row(0)).element(by.css('a[href^="#/aluno"]')).click();
	}
}
module.exports = alunosPage;