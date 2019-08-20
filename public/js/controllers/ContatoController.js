// public/js/controllers/ContatoController.js
console.log('public/js/controllers/ContatoController.js', Date.now());

angular.module('ushaped').controller('ContatoController',
	["$scope", "$routeParams", "Contato", function($scope, $routeParams, Contato) {

		console.log("angular.module('ushaped').controller('ContatoController'", Date.now());
		
		if($routeParams.contatoId) {
			console.log('$routeParams.contatoId. Vou chamar o /contatos/:id', Date.now());
			Contato.get({id: $routeParams.contatoId},
				function(contato) {
					// console.log('contato', contato); 
					$scope.contato = contato;
				},
				function(erro) {
					$scope.mensagem = {
						texto: 'Não foi possível obter o contato.'
					};
					console.log(erro);
				}
			);
		} else {
			$scope.contato = new Contato();
		};

		$scope.salva = function() {
			console.log('$scope.salva.', Date.now());
			// função $save gera por debaixo dos panos uma requisição do tipo POST que envia para 
			// http://localhost/contatos os dados do contato. $resource não dá suporte a PUT. 
			$scope.contato.$save()
			.then(function() {
				$scope.mensagem = {texto: 'Salvo com sucesso!'};
					// limpa o formulário
					$scope.contato = new Contato();
				})
			.catch(function(erro) {
				$scope.mensagem = {texto: 'Não foi possível salvar'};
			});
			// para ser usado na diretiva do foco em meus-componentes.js
			// $scope.btnBackFocus = true;

			// event bus do AngularJS. Disparando evento para executar diretiva do foco.
			$scope.$broadcast('contatoSalvo');
		};

		// Para popular o combo de contatos de emergencia
		Contato.query(function(contatos) {
			$scope.contatos = contatos;
		});

}]);