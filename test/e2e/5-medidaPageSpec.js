// test/e2e/medidaPageSpec.js
var MedidaPage = new require('./pages/medidaPage');

describe('Cadastro de medidas', function() {
	var pagina = new MedidaPage();

	beforeEach(function() {
		pagina.visitar();
	});

	it('Deve cadastrar um medida', function() {
		console.log("Deve cadastrar um medida");
		var aleatorio = Math.floor((Math.random() * 10000000) + 1);
		pagina.digitarNome('teste' + aleatorio);
		pagina.salvar();
		expect(pagina.obterMensagem()).toContain('sucesso');
	});
});