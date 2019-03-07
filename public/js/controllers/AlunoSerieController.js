// public/js/controllers/AlunoSeriecontroller.js
console.log('public/js/controllers/AlunoSerieController.js', Date.now());

angular.module('ushaped').controller('AlunoSerieController',
	["$scope", "$routeParams", "Aluno", "Serie", "Exercicio", "Medida", "$filter", 
		function($scope, $routeParams, Aluno, Serie, Exercicio, Medida, $filter) {

		console.log("angular.module('ushaped').controller('AlunoSerieController'", Date.now());
		
		console.log("$routeParams",$routeParams);

		// var exerciciosArray = [];
		$scope.elemento = {};

		if($routeParams.alunoId && $routeParams.serieId) {
			// TODO Editar para update parcial do aluno alterando somente a serie 
			Aluno.get({id: $routeParams.alunoId},
				function(aluno) {
					// console.log('aluno', aluno); 
					
			
					$scope.aluno = aluno;
					console.log('$scope.aluno', $scope.aluno); 

					$scope.serie = ($filter('filter')($scope.aluno.series, {_id: $routeParams.serieId}, true)[0]);
					
					console.log('$scope.aluno', $scope.aluno); 

					// $scope.serie = $scope.aluno.series[$routeParams.serieId];
					// $scope.exerciciosArray = $scope.serie.exercicios;
					// exerciciosArray = $scope.serie.exercicios;
				},
				function(erro) {
					$scope.mensagem = {
						texto: 'Não foi possível obter o aluno.'
					};
					console.log(erro);
				}
			);

			

			

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

			console.log('$scope.aluno', $scope.aluno); 
			console.log('$scope.serie', $scope.serie); 

			$scope.aluno.$save()
			.then(function() {
				$scope.mensagem = {texto: 'Salvo com sucesso!'};
					// limpa o formulário
					// $scope.aluno = new Aluno();
					// limpa o formulário
					$scope.serie = new Serie();
					// $scope.exerciciosArray = [];
					$scope.elemento = {};
				})
			.catch(function(erro) {
				$scope.mensagem = {texto: 'Não foi possível salvar'};
			});

			// $scope.serie.$save()
			// .then(function() {
			// 	$scope.mensagem = {texto: 'Salvo com sucesso!'};
			// 		// limpa o formulário
			// 		$scope.serie = new Serie();
			// 		$scope.exerciciosArray = [];
			// 		$scope.elemento = {};
			// 	})
			// .catch(function(erro) {
			// 	$scope.mensagem = {texto: 'Não foi possível salvar'};
			// });
			// // para ser usado na diretiva do foco em meus-componentes.js
			// // $scope.btnBackFocus = true;

			// event bus do AngularJS. Disparando evento para executar diretiva do foco.
			$scope.$broadcast('alunoSalvo');
		};

		$scope.remove = function(linha) {
			console.log("linha remove:", linha);
			console.log("$scope.serie.exercicios",$scope.serie.exercicios);
			// console.log("exerciciosArray.indexof(linha):", exerciciosArray.indexOf(linha));
			$scope.serie.exercicios.splice($scope.serie.exercicios.indexOf(linha),1);
			console.log('$scope.aluno', $scope.aluno); 
			// $scope.exerciciosArray = exerciciosArray;
		};
		
		$scope.addExercicio = function(elemento) {
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
				console.log('$scope.aluno', $scope.aluno); 
			}
		};

		

}]);