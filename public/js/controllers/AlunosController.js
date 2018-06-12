// public/js/controllers/AlunosController.js
console.log('public/js/controllers/AlunosController.js', Date.now());
// testando();

angular.module('ushaped').controller('AlunosController',
	["$scope", "$routeParams", "Aluno", function($scope, $routeParams, Aluno) {
	
		console.log("angular.module('ushaped').controller", Date.now());

		$scope.alunos = [];

		$scope.filtro = '';

		$scope.mensagem = {texto: ''};

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
		}

		buscaAlunos();

		$scope.remove = function(aluno) {
			console.log('$scope.remove. Vou chamar o /alunos/:id', Date.now());
			Aluno.delete({id: aluno._id},
				buscaAlunos,
				function(erro) {
					$scope.mensagem = {texto: 'Não foi possível remover o aluno'};
					console.log(erro);
				}
			);
		};

}]);