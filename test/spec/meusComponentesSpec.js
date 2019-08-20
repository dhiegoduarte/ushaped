// test/spec/meusComponentesSpec.js
console.log('test/spec/meusComponentesSpec.js', Date.now());

describe('meuBotaoAviso', function() {
	var $scope;
	var element;

	beforeEach(function() {
		module('meusComponentes');
		inject(function($rootScope, $compile) {
			$scope = $rootScope.$new();
			element = angular.element('<meu-botao-aviso nome="Remover" acao="remove()">');

			// O resultado de angular.element será um elemento do DOMque não
			// faz parte de nenhum documento. Esta etapa é importante porque ela lançará
			// um erro caso a marcação que a string armazena seja inválida.
			// Agora, precisamos compilar este elemento. Este processo consiste em
			// passá-lo como parâmetro para o serviço $compile. A função retornará uma
			// função de link. Lembre-se que é na link phase que associamos um escopo
			// ao elemento, sendo assim, passamos nosso $scope que criamos a partir do
			// $rootScope.
			$compile(element)($scope);

			// Lembre-se que o AngularJS suporta data binding,
			// permitindo que nossa view apresente o valor atualizado do modelo de
			// um escopo. Quem monitora o modelo verificando por mudanças são os
			// watchers, e já aprendemos a utilizá-los em uma de nossas diretivas personalizadas.
			// Todos os watchers da aplicação são avaliados no ciclo digest
			// chamado automaticamente pelo AngularJS. Porém, quando testamos nossas
			// diretivas, somos os responsáveis por sua invocação.
			$scope.$digest();
		});
	});


	it('deve criar um botão de aviso com texto e função',
		function() {
			expect(element.text()).toContain('Remover');
			expect(element.attr('acao')).toBe('remove()');
		}
	);
});


describe('meuFocus', function() {
	var $scope;
	var element;
	var evento = 'contatoSalvo';
	beforeEach(function() {
		module('meusComponentes');
		inject(function($rootScope, $compile) {
			$scope = $rootScope.$new();
			element = angular.element('<button meu-focus evento="' + evento + '">Voltar</button>');
			$compile(element)($scope);
			$scope.$digest();
		});
	});
	it('Deve focar o botão', function() {
		angular.element(document.body).append(element);
		$scope.$broadcast(evento);
		expect(angular.element(document.activeElement).text()).toBe('Voltar');
	});
});

describe('meuPainel', function() {
	var $scope;
	var element;
	beforeEach(function() { 
		module('meusComponentes');
		// importando o módulo gerando pelo Karma
		module('templates');

		inject(function($compile, $rootScope) {
			$scope = $rootScope.$new();
			element = angular.element('<meu-painel titulo="Principal"><p>Oi</p></meu-painel>');
			console.log('element', element);
			$compile(element)($scope);
			$scope.$digest();
		});
	});
	it('Deve criar um painel', function() {
		expect(element.find('h3').text()).toContain('Principal');
		expect(element.find('p').text()).toContain('Oi');
	});

});

