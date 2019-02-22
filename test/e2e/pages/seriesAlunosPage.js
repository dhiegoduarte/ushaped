// test/e2e/pages/seriesAlunosPage.js
var seriesAlunosPage = function() {
	this.visitar = function() {
		browser.get('http://localhost:3000/#/series-alunos');
	};
	this.obterUsuarioLogado = function() {
		return element(by.id('usuario-logado')).getText();
	};
	this.selecionarPrimeiraSerieDaLista = function() {
		element(by.css('option[value="0"]')).click(); //deveria selecionar o primeiro item de todos os combos
	};
	this.selecionarPrimeiroAluno = function() {
		// element(by.model('alunosSelecionados[aluno._id]')).click();
		element(by.css('.form-check-input')).click();
	};
	this.salvar = function() {
		element(by.css('.btn-primary')).click();
	};
	this.obterMensagem = function() {
		return element(by.binding('mensagem.texto')).getText()
	};
}
module.exports = seriesAlunosPage;