// config/env/development.js
console.log('config/env/development.js', Date.now());

module.exports = {
	env: 'development',
	db: 'mongodb://localhost/ushaped', 
	// db: 'mongodb://localhost/ushaped_test',
	clientID: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	seleniumUser: process.env.SELENIUM_USER,
	seleniumUserPassword: process.env.SELENIUM_USER_PASSWORD,
	port: 3000,
	address: 'localhost',
	domain: 'localhost'
};