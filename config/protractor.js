// config/protractor.js
console.log('config/protractor.js', Date.now());

var config = require('./config')();

exports.config = {
	// variaveis usadas nos testes e2e com Saucelabs
	sauceUser : config.sauceUser,
	sauceKey : config.sauceKey,
	capabilities : {
		'name': config.sauceTestName,
		'browserName': 'chrome',
		'tunnel-identifier': config.travisJobNumber,
		'build': config.travisBuild
	},

	specs: ['../test/e2e/**/*.js'],

// testes para tentar fazer funcionar. Atualizando o cromedriver solucionou o problema.
	// seleniumAddress: "http://localhost:4444/wd/hub",
// capabilities: {
//     'browserName': 'chrome'
//    },
//    firefoxOnly: true,
// baseUrl: 'http://localhost:3000/',
// ///////////////////////////////


onPrepare: function() {
	browser.driver.get('http://localhost:3000').then(function() {
		browser.driver.findElement(by.id('entrar')).click();
		
			// precisa usar browser.driver pois a pagina testada nao possui angular
			// browser.driver.findElement(by.id('login_field')).sendKeys('dhiegoduarte@gmail.com'); //TODO remover essas informacoes
			// browser.driver.findElement(by.id('password')).sendKeys('grT-M7K-UMv-RcA'); //TODO remover essas informacoes

			// utilizando o config.js
			browser.driver.findElement(by.id('login_field')).sendKeys(config.seleniumUser);
			browser.driver.findElement(by.id('password')).sendKeys(config.seleniumUserPassword);
			
			browser.driver.findElement(by.name('commit')).click();
		});
}
};
