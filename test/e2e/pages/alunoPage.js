// test/e2e/pages/alunoPage.js
var alunoPage = function() {
	this.visitar = function() {
		browser.get('http://localhost:3000/#/aluno');
	};
	this.digitarNome = function(nome) {
		element(by.model('aluno.nome')).sendKeys(nome);
	};
	this.selecionarGenero = function() {
		element(by.id('masculino')).click();
	};
	this.digitarEmail = function(email) {
		element(by.model('aluno.email')).sendKeys(email);
	};
	this.digitarTelefone = function(telefone) {
		element(by.model('aluno.telefone')).sendKeys(telefone);
	};
	this.digitarPeso = function(peso) {
		element(by.model('aluno.peso')).sendKeys(peso);
	};
	this.digitarAltura = function(altura) {
		element(by.model('aluno.altura')).sendKeys(altura);
	};
	this.salvar = function() {
		element(by.css('.btn-primary')).click();
	};
	this.obterMensagem = function() {
		return element(by.binding('mensagem.texto')).getText()
	};
	this.removerPrimeiraSerieDaLista = function() {
		element(by.repeater('serie in aluno.series').row(0)).element(by.css('.btn')).click();
	}
	this.clicarPrimeiraSerieDaLista = function() {
		element(by.repeater('serie in aluno.series').row(0)).element(by.css('a[href^="#/aluno/serie"]')).click();
	}
}
module.exports = alunoPage;