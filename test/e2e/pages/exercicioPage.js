// test/e2e/pages/exercicioPage.js
var exercicioPage = function() {
	this.visitar = function() {
		browser.get('http://localhost:3000/#/exercicio');
	};
	this.digitarNome = function(nome) {
		element(by.model('exercicio.nome')).sendKeys(nome);
	};
	this.salvar = function() {
		element(by.css('.btn-primary')).click();
	};
	this.obterMensagem = function() {
		return element(by.binding('mensagem.texto')).getText()
	};
	
}
module.exports = exercicioPage;