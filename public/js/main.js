// public/js/main.js
console.log('public/js/main.js', Date.now());

// angular.module('ushaped', []);

// adicionando modulos como dependencia do principal (rotas, resource etc)
angular.module('ushaped', ['ngRoute','ngResource','meusComponentes'])
	.config(function($routeProvider, $httpProvider) {

		$httpProvider.interceptors.push('meuInterceptor');
		
		// Contatos
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

		// Medidas
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

		// Autenticacao
		$routeProvider.when('/auth', {
			templateUrl: 'partials/auth.html'
		});

		// Rota defualt
		$routeProvider.otherwise({redirectTo: '/contatos'});
	
});

// escopo global, pode ser acessado por outros scripts js
// function testando() {
// 	var teste = "Declarado no script main e chamado no Controller pq esta em escopo global!!!";
// 	console.log(teste);
// }