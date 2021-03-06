// public/js/controllers/AlunoController.js
console.log('public/js/controllers/AlunoController.js', Date.now());

angular.module('ushaped').controller('AlunoController',
	["$scope", "$routeParams", "Aluno", function($scope, $routeParams, Aluno) {

		console.log("angular.module('ushaped').controller('AlunoController'", Date.now());
		
		console.log("$routeParams",$routeParams);

		if($routeParams.alunoId) {
			console.log('$routeParams.alunoId. Vou chamar o /alunos/:id', Date.now());
			Aluno.get({id: $routeParams.alunoId},
				function(aluno) {
					// console.log('aluno', aluno); 
					$scope.aluno = aluno;
					console.log('$scope.aluno', $scope.aluno);
				},
				function(erro) {
					$scope.mensagem = {
						texto: 'Não foi possível obter o aluno.'
					};
					console.log(erro);
				}
			);
		} else {
			// console.log("$scope.aluno = new Aluno()");
			$scope.aluno = new Aluno();
		};

		$scope.remove = function(serie) {
			console.log('$scope.aluno.series', $scope.aluno.series);
			console.log('serie', serie);
			$scope.aluno.series.splice($scope.aluno.series.indexOf(serie),1);
			// exerciciosArray.splice(exerciciosArray.indexOf(linha),1);
			// Aluno.delete({id: aluno._id},
			// 	buscaAlunos,
			// 	function(erro) {
			// 		$scope.mensagem = {texto: 'Não foi possível remover o aluno'};
			// 		console.log(erro);
			// 	}
			// );
		};

		if($routeParams.serieId) {
			console.log('$routeParams.serieId.', Date.now());
			
			// Aluno.get({id: $routeParams.alunoId},
			// 	function(aluno) {
			// 		// console.log('aluno', aluno); 
			// 		$scope.aluno = aluno;
			// 		console.log('$scope.aluno', $scope.aluno);
			// 	},
			// 	function(erro) {
			// 		$scope.mensagem = {
			// 			texto: 'Não foi possível obter o aluno.'
			// 		};
			// 		console.log(erro);
			// 	}
			// );
		};

		$scope.salva = function() {
			console.log('$scope.salva.', Date.now());
			// função $save gera por debaixo dos panos uma requisição do tipo POST que envia para 
			// http://localhost/alunos os dados do aluno. $resource não dá suporte a PUT. 
			$scope.aluno.$save()
			.then(function() {
				$scope.mensagem = {texto: 'Salvo com sucesso!'};
					// limpa o formulário
					$scope.aluno = new Aluno();
				})
			.catch(function(erro) {
				$scope.mensagem = {texto: 'Não foi possível salvar'};
			});
			// para ser usado na diretiva do foco em meus-componentes.js
			// $scope.btnBackFocus = true;

			// event bus do AngularJS. Disparando evento para executar diretiva do foco.
			$scope.$broadcast('alunoSalvo');
		};

		// Para popular o combo de alunos de emergencia
		// Aluno.query(function(alunos) {
		// 	$scope.alunos = alunos;
		// });

		

}]);