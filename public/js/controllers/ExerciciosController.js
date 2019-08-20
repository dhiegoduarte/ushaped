// public/js/controllers/ExerciciosController.js
console.log('public/js/controllers/ExerciciosController.js', Date.now());

angular.module('ushaped').controller('ExerciciosController',
	["$scope", "$routeParams", "Exercicio", function($scope, $routeParams, Exercicio) {

		console.log("angular.module('ushaped').controller('ExerciciosController'", Date.now());

		$scope.exercicios = [];
		$scope.filtro = '';
		$scope.mensagem = {texto: ''};

		function buscaExercicios() {
			console.log('buscaExercicios(). Vou chamar o /exercicios', Date.now());
			
			Exercicio.query(
				function(exercicios) {
					// console.log('exercicios', exercicios); 
					$scope.exercicios = exercicios;
				},
				function(erro) {
					$scope.mensagem = {texto: "Não foi possível obter a lista de exercicios"};
					console.log(erro);
				}
			);
		};

		buscaExercicios();

		$scope.remove = function(exercicio) {
			console.log('$scope.remove. Vou chamar o /exercicios/:id', Date.now());
			Exercicio.delete({id: exercicio._id},
				buscaExercicios,
				function(erro) {
					$scope.mensagem = {texto: 'Não foi possível remover o exercicio'};
					console.log(erro);
				}
			);
		};

}]);