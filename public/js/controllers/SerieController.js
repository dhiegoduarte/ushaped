// public/js/controllers/SerieController.js
console.log('public/js/controllers/SerieController.js', Date.now());

angular.module('ushaped').controller('SerieController',
	["$scope", "$routeParams", "Serie", "Exercicio", "Medida", 
		function($scope, $routeParams, Serie, Exercicio, Medida) {
	
		console.log("angular.module('ushaped').controller", Date.now());

		if($routeParams.serieId) {
			console.log('$routeParams.serieId. Vou chamar o /series/:id', Date.now());
			Serie.get({id: $routeParams.serieId},
				function(serie) {
					// console.log('serie', serie); 
					$scope.serie = serie;
				},
				function(erro) {
					$scope.mensagem = {
						texto: 'Não foi possível obter o serie.'
					};
					console.log(erro);
				}
			);
		} else {
			$scope.serie = new Serie();
		}

		$scope.salva = function() {
			console.log('$scope.salva.', Date.now());
			// função $save gera por debaixo dos panos uma requisição do tipo POST que envia para 
			// http://localhost/series os dados do serie. $resource não dá suporte a PUT. 
			$scope.serie.$save()
			.then(function() {
				$scope.mensagem = {texto: 'Salvo com sucesso!'};
					// limpa o formulário
					$scope.serie = new Serie();
				})
			.catch(function(erro) {
				$scope.mensagem = {texto: 'Não foi possível salvar'};
			});
			// para ser usado na diretiva do foco em meus-componentes.js
			// $scope.btnBackFocus = true;

			// event bus do AngularJS. Disparando evento para executar diretiva do foco.
			$scope.$broadcast('serieSalvo');
		};

		// Para popular o combo de exercicios
		Exercicio.query(function(exercicios) {
			$scope.exercicios = exercicios;
		});

		// Para popular o combo de mediadas
		Medida.query(function(medidas) {
			$scope.medidas = medidas;
		});

}]);