// A variável express armazena uma função que, ao ser chamada, retorna
// uma instância do Express
// config/express.js
console.log('config/express.js', Date.now());

// console.log(teste);

var express = require('express');

// var home = require('../app/routes/home');
var load = require('express-load');

var bodyParser = require('body-parser');

// OAuth 2.0
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

// seguranca, tratamento de http headers
helmet = require('helmet');

module.exports = function() {
	// console.log('module.exports', Date.now());
	var app = express();
	
	// console.log(typeof app);

	// variável de ambiente
	app.set('port', 3000);
	
	// middleware
	app.use(express.static('./public'));

	// variável de ambiente
	app.set('view engine', 'ejs');
	app.set('views','./app/views');
	
	// middlewares para suportar o override de delete e put
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(require('method-override')());
	// home(app);

	// OAuth 2.0
	app.use(cookieParser());
	app.use(session(
		// o cookie de sessão é assinado com este segredo para evitar adulteração.
		{ secret: 'uhephfsrfiueahiuspisrhgebitnisrbirtbnibrpirtnklnlnrgln',
		resave: true,
		saveUninitialized: true
	}
	));

	// Um ponto a destacar é que a inicialização da sessão do Express
	// deve vir sempre antes de passport.session para garantirmos
	// que a sessão de login seja restaurada na ordem correta.
	app.use(passport.initialize());
	app.use(passport.session());

	app.use(helmet());
	// removendo header
	app.disable('x-powered-by');
	// informado de forma intencional que a tecnologia utilizada é PHP 
	// no intuito de dificultar a vida de hacker
	// app.use(helmet.hidePoweredBy({ setTo: 'PHP 5.5.14' }));
	
	// evitamos que nossas páginas sejam referenciadas por <frame> ou <iframe>.
	app.use(helmet.frameguard());
	// evita cross-site scripting.adiciona o header htpp X-XSS-Protection. O header solicita ao navegador a
	// ativação de uma proteção especial contra XSS.
	app.use(helmet.xssFilter());
	// adiciona header de resposta houver X-Content-Type-Options que proibe navegadores de carregar 
	// através das tags link e script arquivos que não sejam dos MIME types text/css e text/javascript
	app.use(helmet.noSniff());


	// precisamos carregar as pastas seguindo a ordem models,
	// controllers e routes, caso contrário não conseguiremos, por exemplo,
	// ter acesso aos nossos controllers em nossas rotas caso os módulos com
	// nossos controllers tenham sido carregados por último.
	// 	O parâmetro {cwd: ‘app’} foi necessário para mudar o diretório padrão,
	// pois a função procura as pastas no diretório raiz ushaped e precisamos
	// que ela considere a pasta ushaped/app.
	load('models', {cwd: 'app'})
		.then('controllers')
		.then('routes')
		.into(app);

	// Você deve se perguntar o porquê de ela não estar em um arquivo em separado.
	// Precisamos ter a garantia de que ela seja a última rota processada
	// e teremos essa certeza colocando-a imediatamente após o carregamento de
	// rotas com express-load. 
	// se nenhum rota atender, direciona para página 404
	app.get('*', function(req, res) {
		res.status(404).render('404');
	});

	return app;
};