// public/js/controllers/ContatosController.js
console.log('public/js/controllers/ContatosController.js', Date.now());
// testando();

angular.module('ushaped').controller('ContatosController',
	["$scope", "$routeParams", "Contato", function($scope, $routeParams, Contato) {
	
		console.log("angular.module('ushaped').controller('ContatosController'", Date.now());

		$scope.contatos = [];
		$scope.filtro = '';
		$scope.mensagem = {texto: ''};

		function buscaContatos() {
			console.log('buscaContatos(). Vou chamar o /contatos', Date.now());
			// var Contato = $resource('/contatos');
			// console.log('Contato', Contato); 
			Contato.query(
				function(contatos) {
					// console.log('contatos', contatos); 
					$scope.contatos = contatos;
				},
				function(erro) {
					$scope.mensagem = {texto: "Não foi possível obter a lista de contatos"};
					console.log(erro);
				}
			);
		}

		buscaContatos();

		$scope.remove = function(contato) {
			console.log('$scope.remove. Vou chamar o /contatos/:id', Date.now());
			Contato.delete({id: contato._id},
				buscaContatos,
				function(erro) {
					$scope.mensagem = {texto: 'Não foi possível remover o contato'};
					console.log(erro);
				}
			);
		};

}]);