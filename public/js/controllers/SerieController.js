// public/js/controllers/SerieController.js
console.log('public/js/controllers/SerieController.js', Date.now());

var serieTeste;

angular.module('ushaped').controller('SerieController',
	["$scope", "$routeParams", "Serie", "Exercicio", "Medida", 
		function($scope, $routeParams, Serie, Exercicio, Medida) {
	
		console.log("angular.module('ushaped').controller", Date.now());

		if($routeParams.serieId) {
			console.log('$routeParams.serieId. Vou chamar o /series/:id', Date.now());
			Serie.get({id: $routeParams.serieId},
				function(serie) {
					$scope.serie = serie;
					
					//loop na lista de exercicios					
					// serie.exercicios.forEach(function(elemento){
					// 	console.log("elemento:", elemento);
					


						// buscando detalhes do exercicio
						// console.log('$routeParams.exercicioId. Vou chamar o /exercicios/:id', Date.now());
						// Exercicio.get({id: elemento.exercicio},
						// 	function(exercicio) {
						// 		$scope.exercicioTeste= exercicio;
						// 	},
						// 	function(erro) {
						// 		$scope.mensagem = {
						// 			texto: 'Não foi possível obter o exercicio.'
						// 		};
						// 		console.log(erro);
						// 	}
						// );

						// // buscando detalhes do exercicio
						// console.log('$routeParams.exercicioId. Vou chamar o /medidas/:id', Date.now());
						// Medida.get({id: elemento.medida},
						// 	function(medida) {
						// 		$scope.medidaTeste= medida;
						// 	},
						// 	function(erro) {
						// 		$scope.mensagem = {
						// 			texto: 'Não foi possível obter a medida.'
						// 		};
						// 		console.log(erro);
						// 	}
						// );	
					// });




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
			
			// Para popular o combo de exercicios
			Exercicio.query(function(exercicios) {
				$scope.exercicios = exercicios;
			});

			// Para popular o combo de mediadas
			Medida.query(function(medidas) {
				$scope.medidas = medidas;
			});
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



}]);