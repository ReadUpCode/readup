var environment = process.env.ENVIRONMENT || "development";
var ALCHEMY_KEY;

var APP_ID;
var APP_SECRET;

var AWS_ACCESS_KEY_ID;
var AWS_SECRET_ACCESS_KEY;

var MYSQL_HOST;
var MYSQL_DATABASE;
var MYSQL_USERNAME;
var MYSQL_PASSWORD;

var PORT;

var SESSION_SECRET;

var SO_KEY;

if (environment === "production"){
	ALCHEMY_KEY = process.env.ALCHEMY_KEY_PROD;

	APP_ID = process.env.APP_ID_PROD;
	APP_SECRET = process.env.APP_SECRET_PROD;

	AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID_PROD;
	AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY_PROD;

	MYSQL_HOST = process.env.MYSQL_HOST_PROD;
	MYSQL_DATABASE = process.env.MYSQL_DATABASE_PROD;
	MYSQL_USERNAME = process.env.MYSQL_USERNAME_PROD;
	MYSQL_PASSWORD =  process.env.MYSQL_PASSWORD_PROD;

	PORT = process.env.PORT_PROD;

  SESSION_SECRET = process.env.SESSION_SECRET_PROD;

  SO_KEY = process.env.SO_KEY_PROD;
}
else {
	ALCHEMY_KEY = process.env.ALCHEMY_KEY_DEV;

	APP_ID = process.env.APP_ID_DEV;
	APP_SECRET = process.env.APP_SECRET_DEV;

	AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID_DEV;
	AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY_DEV;

	MYSQL_HOST = process.env.MYSQL_HOST_DEV;
	MYSQL_DATABASE = process.env.MYSQL_DATABASE_DEV;
	MYSQL_USERNAME = process.env.MYSQL_USERNAME_DEV;
	MYSQL_PASSWORD =  process.env.MYSQL_PASSWORD_DEV;

	PORT = process.env.PORT_DEV;

  SESSION_SECRET = process.env.SESSION_SECRET_DEV;

	SO_KEY = process.env.SO_KEY_DEV;
}

module.exports.ALCHEMY_KEY = ALCHEMY_KEY;

module.exports.APP_ID = APP_ID;
module.exports.APP_SECRET = APP_SECRET;

module.exports.AWS_ACCESS_KEY_ID = AWS_ACCESS_KEY_ID;
module.exports.AWS_SECRET_ACCESS_KEY = AWS_SECRET_ACCESS_KEY;

module.exports.MYSQL_HOST = MYSQL_HOST;
module.exports.MYSQL_DATABASE = MYSQL_DATABASE;
module.exports.MYSQL_USERNAME = MYSQL_USERNAME;
module.exports.MYSQL_PASSWORD = MYSQL_PASSWORD;

module.exports.PORT = PORT;

module.exports.SESSION_SECRET = SESSION_SECRET;

module.exports.SO_KEY = SO_KEY;