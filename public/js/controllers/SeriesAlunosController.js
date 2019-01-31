// public/js/controllers/SeriesAlunosController.js
console.log('public/js/controllers/SeriesAlunosController.js', Date.now());
// testando();

angular.module('ushaped').controller('SeriesAlunosController',
	["$scope", "$routeParams", "Serie", "Aluno", "$filter", 
		function($scope, $routeParams, Serie, Aluno, $filter) {
	
		console.log("angular.module('ushaped').controller('SeriesAlunosController'", Date.now());

		$scope.alunos = [];
		$scope.filtro = '';
		$scope.aluno = '';
		$scope.mensagem = {texto: ''};
		$scope.alunosSelecionados = {};

		function buscaAlunos() {
			console.log('buscaAlunos(). Vou chamar o /alunos', Date.now());
			// var Aluno = $resource('/alunos');
			// console.log('Aluno', Aluno); 
			Aluno.query(
				function(alunos) {
					// console.log('alunos', alunos); 
					$scope.alunos = alunos;
				},
				function(erro) {
					$scope.mensagem = {texto: "Não foi possível obter a lista de alunos"};
					console.log(erro);
				}
			);
		};

		buscaAlunos();

		// Para popular o combo de series
		Serie.query(function(series) {
			$scope.series = series;
		});

		
		// $scope.remove = function(aluno) {
		// 	console.log('$scope.remove. Vou chamar o /alunos/:id', Date.now());
		// 	Aluno.delete({id: aluno._id},
		// 		buscaAlunos,
		// 		function(erro) {
		// 			$scope.mensagem = {texto: 'Não foi possível remover o aluno'};
		// 			console.log(erro);
		// 		}
		// 	);
		// };

		$scope.salva = function() {
			if (typeof $scope.serie !== "undefined" && Object.keys($scope.serie).length > 0 && Object.keys($scope.alunosSelecionados).length > 0) {
				console.log('$scope.salva.', Date.now());
				Serie.get({id: $scope.serie},
				function(serie) {
					console.log('serie buscada ', serie);
					// adiciona a serie a cada aluno selecionado
					console.log('$scope.alunos', $scope.alunos);
					console.log('$scope.alunosSelecionados', $scope.alunosSelecionados);
					console.log('Object.keys($scope.alunosSelecionados).length', Object.keys($scope.alunosSelecionados).length);
					console.log('$scope.alunosSelecionados', typeof $scope.alunosSelecionados);
					// for (i = 0; i < Object.keys($scope.alunosSelecionados).length; i++) {
					// 	if ($scope.alunosSelecionados) {

					// 	}
					// }

					Object.keys($scope.alunosSelecionados).forEach(e => {
						console.log(`key=${e}  value=${$scope.alunosSelecionados[e]}`); 
						console.log('funciona');

						$scope.aluno = ($filter('filter')($scope.alunos, {_id: e}, true)[0]);
						$scope.aluno.series.push(serie);
						console.log('$scope.aluno', $scope.aluno);

						$scope.aluno.$save()
						.then(function() {
							$scope.mensagem = {texto: 'Salvo com sucesso!'};
								// limpa o formulário
								// $scope.aluno = new Aluno();
								//remove o aluno que já teve a serie salva
								$scope.alunos.splice($scope.alunos.indexOf(e),1);
								//limpa o combo de serie
								$scope.serie = '';
							})
						.catch(function(erro) {
							$scope.mensagem = {texto: 'Não foi possível salvar'};
						});


					});

					// Object.keys($scope.alunosSelecionados).forEach(function(e) {
					// 	console.log('key=', e);
					// 	console.log('value=', $scope.alunosSelecionados[e]);
					// 	console.log('funciona');
					// });
						
					

					// $scope.serie = serie;
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







				// console.log('typeof $scope.serie', typeof $scope.serie);
				// console.log('$scope.alunosSelecionados', typeof $scope.alunosSelecionados);
				// console.log('$scope.alunosSelecionados', $scope.alunosSelecionados);

				// console.log('$scope.serie',$scope.serie);
				// // função $save gera por debaixo dos panos uma requisição do tipo POST que envia para 
				// // http://localhost/series os dados do serie. $resource não dá suporte a PUT. 
				// $scope.serie.exercicios = exerciciosArray;
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

				// // event bus do AngularJS. Disparando evento para executar diretiva do foco.
				// $scope.$broadcast('serieSalvo');
			};
		};

}]);