// config/env/production.js
console.log('config/env/production.js', Date.now());

module.exports = {
	env: 'production',
	db: process.env.OPENSHIFT_MONGODB_DB_URL + 'ushaped',
	clientID: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	port: process.env.OPENSHIFT_NODEJS_PORT,
	address: process.env.OPENSHIFT_NODEJS_IP,
	domain: process.env.OPENSHIFT_APP_DNS
};