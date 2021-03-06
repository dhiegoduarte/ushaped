// public/js/main.js
console.log('public/js/main.js', Date.now());

// angular.module('ushaped', []);

// adicionando modulos como dependencia do principal (rotas, resource etc)
angular.module('ushaped', ['ngRoute','ngResource','meusComponentes'])
	.config(["$routeProvider", "$httpProvider", function($routeProvider, $httpProvider) {

		$httpProvider.interceptors.push('meuInterceptor');
		
		$routeProvider.when('/home', {
			templateUrl: 'partials/home.html'
			// controller: 'ContatosController'
		});

		$routeProvider.when('/contatos', {
			templateUrl: 'partials/contatos.html',
			controller: 'ContatosController'
		});

		$routeProvider.when('/contato/:contatoId', {
			templateUrl: 'partials/contato.html',
			controller: 'ContatoController'
		});

		$routeProvider.when('/contato', {
			templateUrl: 'partials/contato.html',
			controller: 'ContatoController'
		});

		$routeProvider.when('/medidas', {
			templateUrl: 'partials/medidas.html',
			controller: 'MedidasController'
		});

		$routeProvider.when('/medida/:medidaId', {
			templateUrl: 'partials/medida.html',
			controller: 'MedidaController'
		});

		$routeProvider.when('/medida', {
			templateUrl: 'partials/medida.html',
			controller: 'MedidaController'
		});

		$routeProvider.when('/alunos', {
			templateUrl: 'partials/alunos.html',
			controller: 'AlunosController'
		});

		$routeProvider.when('/aluno/:alunoId', {
			templateUrl: 'partials/aluno.html',
			controller: 'AlunoController'
		});

		// ? diz q o parametro é opcional
		// $routeProvider.when('/aluno/serie/:alunoId/:serieId?', {
		$routeProvider.when('/aluno/serie/:alunoId/:serieId', {
			templateUrl: 'partials/aluno-serie.html',
			controller: 'AlunoSerieController'
		});

		$routeProvider.when('/aluno', {
			templateUrl: 'partials/aluno.html',
			controller: 'AlunoController'
		});

		$routeProvider.when('/exercicios', {
			templateUrl: 'partials/exercicios.html',
			controller: 'ExerciciosController'
		});

		$routeProvider.when('/exercicio/:exercicioId', {
			templateUrl: 'partials/exercicio.html',
			controller: 'ExercicioController'
		});

		$routeProvider.when('/exercicio', {
			templateUrl: 'partials/exercicio.html',
			controller: 'ExercicioController'
		});

		$routeProvider.when('/series', {
			templateUrl: 'partials/series.html',
			controller: 'SeriesController'
		});

		$routeProvider.when('/serie/:serieId', {
			templateUrl: 'partials/serie.html',
			controller: 'SerieController'
		});

		$routeProvider.when('/serie', {
			templateUrl: 'partials/serie.html',
			controller: 'SerieController'
		});

		$routeProvider.when('/series-alunos', {
			templateUrl: 'partials/series-alunos.html',
			controller: 'SeriesAlunosController'
		});

		// Autenticacao
		$routeProvider.when('/auth', {
			templateUrl: 'partials/auth.html'
		});

		// Rota defualt
		$routeProvider.otherwise({redirectTo: '/home'});
	
}]);

// escopo global, pode ser acessado por outros scripts js
// function testando() {
// 	var teste = "Declarado no script main e chamado no Controller pq esta em escopo global!!!";
// 	console.log(teste);
// }