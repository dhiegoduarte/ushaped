// test/spec/ContatoControllerSpec.js
console.log('test/spec/ContatoControllerSpec.js', Date.now());

describe("ContatoController", function() {
	var $scope, $httpBackend;

	beforeEach(function() {
		module('ushaped');
		inject(function($injector, _$httpBackend_) {
			// inject(function($injector) {
			$scope = $injector.get('$rootScope').$new();
			$httpBackend = _$httpBackend_;
			$httpBackend.when('GET', '/contatos/1').respond({_id: '1'});
			$httpBackend.when('GET', '/contatos').respond([{}]);
		});
	});
	
	it("Deve criar um Contato vazio quando nenhum parâmetro de rota for passado", 
		inject(function($controller) {
			$controller('ContatoController',
				{"$scope" : $scope});
			expect($scope.contato._id).toBeUndefined();
		}));

	it("Deve preencher o Contato quando parâmetro de rota for passado",
		inject(function($controller) {
			$controller('ContatoController', {
				// '$routeParams': {contatoId: '598858239373c0c268457552'}, 
				'$routeParams': {contatoId: 1}, 
				'$scope': $scope
			});
			$httpBackend.flush();
			expect($scope.contato._id).toBeDefined();
		}));
});