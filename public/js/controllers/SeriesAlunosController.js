// public/js/controllers/SeriesAlunosController.js
console.log('public/js/controllers/SeriesAlunosController.js', Date.now());
// testando();

angular.module('ushaped').controller('SeriesAlunosController',
	["$scope", "$routeParams", "Serie", "Aluno", function($scope, $routeParams, Serie, Aluno) {
	
		console.log("angular.module('ushaped').controller('SeriesAlunosController'", Date.now());

		$scope.alunos = [];
		$scope.filtro = '';
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
			console.log('$scope.salva.', Date.now());
			console.log('$scope.alunosSelecionados', $scope.alunosSelecionados);

			console.log('$scope.serie._id',$scope.serie._id);
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

}]);