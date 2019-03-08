// public/js/controllers/SerieController.js
console.log('public/js/controllers/SerieController.js', Date.now());

angular.module('ushaped').controller('SerieController',
	["$scope", "$routeParams", "Serie", "Exercicio", "Medida", "$filter", 
		function($scope, $routeParams, Serie, Exercicio, Medida, $filter) {
	
		console.log("angular.module('ushaped').controller('SerieController'", Date.now());
		
		// var exerciciosArray = [];
		$scope.elemento = {};
		
		if($routeParams.serieId) {
			console.log('$routeParams.serieId. Vou chamar o /series/:id', Date.now());
			Serie.get({id: $routeParams.serieId},
				function(serie) {
					$scope.serie = serie;
					// $scope.exerciciosArray = serie.exercicios;
					// exerciciosArray = serie.exercicios;
					
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
			// Quando for uma nocva série, para não dar erro no addExercicio de quando for fazer o push(elemento) 
			// o array de exercicios deve já existir no objeto serie 
			$scope.serie.exercicios = [];
			// $scope.exerciciosArray = [];
		};

		// Para popular o combo de exercicios
		Exercicio.query(function(exercicios) {
			// console.log('Combo Exercicio');
			$scope.exercicios = exercicios;
		});

		// Para popular o combo de mediadas
		Medida.query(function(medidas) {
			// console.log('Combo Medida');
			$scope.medidas = medidas;
		});

		$scope.salva = function() {
			console.log('$scope.salva.', Date.now());
			// função $save gera por debaixo dos panos uma requisição do tipo POST que envia para 
			// http://localhost/series os dados do serie. $resource não dá suporte a PUT. 
			// $scope.serie.exercicios = exerciciosArray;
			$scope.serie.$save()
			.then(function() {
				$scope.mensagem = {texto: 'Salvo com sucesso!'};
					// limpa o formulário
					$scope.serie = new Serie();
					// $scope.exerciciosArray = [];
					$scope.elemento = {};
				})
			.catch(function(erro) {
				$scope.mensagem = {texto: 'Não foi possível salvar'};
			});
			// para ser usado na diretiva do foco em meus-componentes.js
			// $scope.btnBackFocus = true;

			// event bus do AngularJS. Disparando evento para executar diretiva do foco.
			$scope.$broadcast('serieSalvo');
		};

		$scope.remove = function(linha) {
			console.log("linha remove:", linha);
			// console.log("exerciciosArray.indexof(linha):", exerciciosArray.indexOf(linha));
			$scope.serie.exercicios.splice($scope.serie.exercicios.indexOf(linha),1);
			// $scope.exerciciosArray = exerciciosArray;
		};
		
		$scope.addExercicio = function(elemento) {
			console.log($scope.serie);
			if (typeof elemento !== "undefined" && Object.keys(elemento).length > 0 && elemento.exercicio) {
				console.log("elemento.exercicio add:", elemento);
				// var clone = JSON.parse(JSON.stringify(elemento));
				// console.log("clone.exercicio add:", clone);
				if (elemento.exercicio) {
					elemento.exercicioNome = ($filter('filter')($scope.exercicios, {_id: elemento.exercicio}, true)[0]).nome;
				}
				if (elemento.medida) {
					elemento.medidaNome = ($filter('filter')($scope.medidas, {_id: elemento.medida}, true)[0]).nome;
				}
				$scope.serie.exercicios.push(elemento);
	 			// $scope.exerciciosArray = exerciciosArray;
				// console.log("elemento:", elemento);
				$scope.elemento = {};
			}
		};

}]);