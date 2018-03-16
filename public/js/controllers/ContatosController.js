// public/js/controllers/ContatosController.js
console.log('public/js/controllers/ContatosController.js', Date.now());
// testando();

angular.module('ushaped').controller('ContatosController',
	function($scope, $routeParams, Contato) {
	// function($scope, $routeParams, $http, $resource) {

		console.log("angular.module('ushaped').controller", Date.now());

		// $scope.total = 0;
		// $scope.incrementa = function() {
		// 	$scope.total++;
		// };

		// $scope.contatos = [
		// 	{
		// 	"_id": 1,
		// 	"nome": "Contato Angular 1",
		// 	"email": "cont1@empresa.com.br"
		// 	},
		// 	{
		// 	"_id": 2,
		// 	"nome": "Contato Angular 2",
		// 	"email": "cont2@empresa.com.br"
		// 	},
		// 	{
		// 	"_id": 3,
		// 	"nome": "Contato Angular 3",
		// 	"email": "cont3@empresa.com.br"
		// 	}
		// ];

		$scope.contatos = [];

		// $scope.total = 0;
		
		$scope.filtro = '';

		$scope.mensagem = {texto: ''};
		
		// $scope.incrementa = function() {
		// 	$scope.total++;
		// };

		// $http.get('/contatos')
		// .success(function(data) {
		// 	$scope.contatos = data;
		// })
		// .error(function(statusText) {
		// 	console.log("Não foi possível obter a lista de contatos");
		// 	console.log(statusText);
		// });

		// faz chamada para a rota do express definida em app/routes/contato.js
		// var Contato = $resource('/contatos');
		
		// usando promise
		// var promise = Contato.query().$promise;

		// promise
		// 	.then(function(contatos) {
		// 		$scope.contatos = contatos;
		// 	})
		// 	.catch(function(erro) {
		// 		console.log("Não foi possível obter a lista de contatos");
		// 		console.log(erro);
		// });

		// var Contato = $resource('/contatos/:id');
		// // console.log('Contato', Contato); 
		// // console.log('typeof Contato', typeof Contato); 

		// if($routeParams.contatoId) {
		// 	console.log('$routeParams.contatoId. Vou chamar o /contatos/:id', Date.now());
		// 	Contato.get({id: $routeParams.contatoId},
		// 		function(contato) {
		// 			// console.log('contato', contato); 
		// 			$scope.contato = contato;
		// 		},
		// 		function(erro) {
		// 			$scope.mensagem = {
		// 				texto: 'Não foi possível obter o contato.'
		// 			};
		// 			console.log(erro);
		// 		}
		// 	);
		// } else {
		// 	$scope.contato = new Contato();
		// }

		function buscaContatos() {
			console.log('buscaContatos(). Vou chamar o /contatos', Date.now());
			// var Contato = $resource('/contatos');
			// console.log('Contato', Contato); 
			Contato.query(
				function(contatos) {
					// console.log('contatos', contatos); 
					$scope.contatos = contatos;
				},
				function(erro) {
					$scope.mensagem = {texto: "Não foi possível obter a lista de contatos"};
					console.log(erro);
				}
			);
		}

		buscaContatos();

		$scope.remove = function(contato) {
			console.log('$scope.remove. Vou chamar o /contatos/:id', Date.now());
			// var Contato = $resource('/contatos/:id');
			// console.log('Contato', Contato); 
			// var promise = Contato.delete({id: contato._id}).$promise;
			// promise
			// 	.then(buscaContatos)
			// 	.catch(function(erro) {
			// 		console.log("Não foi possível remover o contato");
			// 		console.log(erro);
			// 	});
			// console.log('contato', contato); 
			Contato.delete({id: contato._id},
				buscaContatos,
				function(erro) {
					$scope.mensagem = {texto: 'Não foi possível remover o contato'};
					console.log(erro);
				}
			);
		};

		// $scope.salva = function() {
		// 	console.log('$scope.salva.', Date.now());
		// 	// função $save gera por debaixo dos panos uma requisição do tipo POST que envia para 
		// 	// http://localhost/contatos os dados do contato. $resource não dá suporte a PUT. 
		// 	$scope.contato.$save()
		// 	.then(function() {
		// 		$scope.mensagem = {texto: 'Salvo com sucesso'};
		// 			// limpa o formulário
		// 			$scope.contato = new Contato();
		// 		})
		// 	.catch(function(erro) {
		// 		$scope.mensagem = {texto: 'Não foi possível salvar'};
		// 	});
		// };


});