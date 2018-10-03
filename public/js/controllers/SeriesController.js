// public/js/controllers/SeriesController.js
console.log('public/js/controllers/SeriesController.js', Date.now());

angular.module('ushaped').controller('SeriesController',
	["$scope", "$routeParams", "Serie", function($scope, $routeParams, Serie) {

		console.log("angular.module('ushaped').controller", Date.now());

		$scope.series = [];
		
		$scope.filtro = '';

		$scope.mensagem = {texto: ''};

		function buscaSeries() {
			console.log('buscaSeries(). Vou chamar o /series', Date.now());
			
			Serie.query(
				function(series) {
					// console.log('series', series); 
					$scope.series = series;
				},
				function(erro) {
					$scope.mensagem = {texto: "Não foi possível obter a lista de series"};
					console.log(erro);
				}
			);
		}

		buscaSeries();

		$scope.remove = function(serie) {
			console.log('$scope.remove. Vou chamar o /series/:id', Date.now());
			Serie.delete({id: serie._id},
				buscaSeries,
				function(erro) {
					$scope.mensagem = {texto: 'Não foi possível remover o serie'};
					console.log(erro);
				}
			);
		};

		


}]);