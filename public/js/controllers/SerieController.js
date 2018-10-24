// public/js/controllers/SerieController.js
console.log('public/js/controllers/SerieController.js', Date.now());

// var serieTeste;

angular.module('ushaped').controller('SerieController',
	["$scope", "$routeParams", "Serie", "Exercicio", "Medida", "$filter", 
		function($scope, $routeParams, Serie, Exercicio, Medida, $filter) {
	
		console.log("angular.module('ushaped').controller", Date.now());

		
		var exerciciosArray = [];

		$scope.elemento = {};
		
		if($routeParams.serieId) {
			console.log('$routeParams.serieId. Vou chamar o /series/:id', Date.now());
			Serie.get({id: $routeParams.serieId},
				function(serie) {
					$scope.serie = serie;
					$scope.exerciciosArray = serie.exercicios;
					exerciciosArray = serie.exercicios;
					
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
			$scope.exerciciosArray = [];
			
			
		}

		// Para popular o combo de exercicios
			Exercicio.query(function(exercicios) {
				$scope.exercicios = exercicios;
			});

			// Para popular o combo de mediadas
			Medida.query(function(medidas) {
				$scope.medidas = medidas;
			});

		$scope.salva = function() {
			console.log('$scope.salva.', Date.now());
			// função $save gera por debaixo dos panos uma requisição do tipo POST que envia para 
			// http://localhost/series os dados do serie. $resource não dá suporte a PUT. 
			$scope.serie.exercicios = exerciciosArray;
			$scope.serie.$save()
			.then(function() {
				$scope.mensagem = {texto: 'Salvo com sucesso!'};
					// limpa o formulário
					$scope.serie = new Serie();
					$scope.exerciciosArray = [];
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
			// console.log('$scope.remove. Vou chamar o /series/:id', Date.now());
			// Serie.delete({id: serie._id},
			// 	buscaSeries,
			// 	function(erro) {
			// 		$scope.mensagem = {texto: 'Não foi possível remover o serie'};
			// 		console.log(erro);
			// 	}
			// );
			console.log("linha remove:", linha);
			console.log("exerciciosArray.indexof(linha):", exerciciosArray.indexOf(linha));
			
			
			exerciciosArray.splice(exerciciosArray.indexOf(linha),1);
			// $scope.exerciciosArray.pop(linha); 
			$scope.exerciciosArray = exerciciosArray;
			// $scope.serie.exercicios = exerciciosArray;
		};

// var cloneOfA = JSON.parse(JSON.stringify(a));
// var clone = Object.assign({}, obj);
		
		$scope.addExercicio = function(elemento) {
			if (typeof elemento !== "undefined" && Object.keys(elemento).length > 0) {
				console.log("elemento.exercicio add:", elemento);
				var clone = JSON.parse(JSON.stringify(elemento));
				console.log("clone.exercicio add:", clone);

				clone.exercicioNome = ($filter('filter')($scope.exercicios, {_id: clone.exercicio}, true)[0]).nome;
				exerciciosArray.push(clone);
				// $scope.serie.exercicios.push(elemento);

				// $scope.serie.exercicios = exerciciosArray;

				

	 			$scope.exerciciosArray = exerciciosArray;

	console.log("elemento:", elemento);
	// $scope.serie = new Serie();

				$scope.elemento = {};

			}



			// $scope.check = function(_id) {return _id == elemento.exercicio;}

		};



}]);