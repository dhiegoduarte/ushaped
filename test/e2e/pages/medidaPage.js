// test/e2e/pages/medidaPage.js
var medidaPage = function() {
	this.visitar = function() {
		browser.get('http://localhost:3000/#/medida');
	};
	this.digitarNome = function(nome) {
		element(by.model('medida.nome')).sendKeys(nome);
	};
	this.salvar = function() {
		element(by.css('.btn-primary')).click();
	};
	this.obterMensagem = function() {
		return element(by.binding('mensagem.texto')).getText()
	};
	
}
module.exports = medidaPage;