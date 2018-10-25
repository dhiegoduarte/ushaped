// public/js/controllers/ExercicioController.js
console.log('public/js/controllers/ExercicioController.js', Date.now());

angular.module('ushaped').controller('ExercicioController',
	["$scope", "$routeParams", "Exercicio", function($scope, $routeParams, Exercicio) {
	
		console.log("angular.module('ushaped').controller('ExercicioController'", Date.now());

		if($routeParams.exercicioId) {
			console.log('$routeParams.exercicioId. Vou chamar o /exercicios/:id', Date.now());
			Exercicio.get({id: $routeParams.exercicioId},
				function(exercicio) {
					// console.log('exercicio', exercicio); 
					$scope.exercicio = exercicio;
				},
				function(erro) {
					$scope.mensagem = {
						texto: 'Não foi possível obter o exercicio.'
					};
					console.log(erro);
				}
			);
		} else {
			$scope.exercicio = new Exercicio();
		}

		$scope.salva = function() {
			console.log('$scope.salva.', Date.now());
			// função $save gera por debaixo dos panos uma requisição do tipo POST que envia para 
			// http://localhost/exercicios os dados do exercicio. $resource não dá suporte a PUT. 
			$scope.exercicio.$save()
			.then(function() {
				$scope.mensagem = {texto: 'Salvo com sucesso!'};
					// limpa o formulário
					$scope.exercicio = new Exercicio();
				})
			.catch(function(erro) {
				$scope.mensagem = {texto: 'Não foi possível salvar'};
			});
			// para ser usado na diretiva do foco em meus-componentes.js
			// $scope.btnBackFocus = true;

			// event bus do AngularJS. Disparando evento para executar diretiva do foco.
			$scope.$broadcast('exercicioSalvo');
		};

}]);