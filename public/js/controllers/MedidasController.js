// public/js/controllers/MedidasController.js
console.log('public/js/controllers/MedidasController.js', Date.now());

angular.module('ushaped').controller('MedidasController',
	["$scope", "$routeParams", "Medida", function($scope, $routeParams, Medida) {

		console.log("angular.module('ushaped').controller('MedidasController'", Date.now());

		$scope.medidas = [];
		$scope.filtro = '';
		$scope.mensagem = {texto: ''};

		function buscaMedidas() {
			console.log('buscaMedidas(). Vou chamar o /medidas', Date.now());
			
			Medida.query(
				function(medidas) {
					// console.log('medidas', medidas); 
					$scope.medidas = medidas;
				},
				function(erro) {
					$scope.mensagem = {texto: "Não foi possível obter a lista de medidas"};
					console.log(erro);
				}
			);
		};

		buscaMedidas();

		$scope.remove = function(medida) {
			console.log('$scope.remove. Vou chamar o /medidas/:id', Date.now());
			Medida.delete({id: medida._id},
				buscaMedidas,
				function(erro) {
					$scope.mensagem = {texto: 'Não foi possível remover o medida'};
					console.log(erro);
				}
			);
		};

}]);