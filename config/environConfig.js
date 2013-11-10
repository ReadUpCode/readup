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
  module.exports.ALCHEMY_KEY = process.env.ALCHEMY_KEY_PROD;

  module.exports.APP_ID = process.env.APP_ID_PROD;
  module.exports.APP_SECRET = process.env.APP_SECRET_PROD;

  module.exports.AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID_PROD;
  module.exports.AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY_PROD;
  module.exports.S3_BUCKET = process.env.S3_BUCKET;
  module.exports.S3_REGION = process.env.S3_REGION;

  module.exports.MYSQL_HOST = process.env.MYSQL_HOST_PROD;
  module.exports.MYSQL_DATABASE = process.env.MYSQL_DATABASE_PROD;
  module.exports.MYSQL_USERNAME = process.env.MYSQL_USERNAME_PROD;
  module.exports.MYSQL_PASSWORD =  process.env.MYSQL_PASSWORD_PROD;

  module.exports.PORT = process.env.PORT_PROD;

  module.exports.SESSION_SECRET = process.env.SESSION_SECRET_PROD;

  module.exports.SO_KEY = process.env.SO_KEY_PROD;
}
else {
  module.exports.environment = 'development';
  module.exports.ALCHEMY_KEY = process.env.ALCHEMY_KEY_DEV;

  module.exports.APP_ID = process.env.APP_ID_DEV;
  module.exports.APP_SECRET = process.env.APP_SECRET_DEV;

  module.exports.AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID_DEV;
  module.exports.AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY_DEV;
  module.exports.S3_BUCKET = process.env.S3_BUCKET;
  module.exports.S3_REGION = process.env.S3_REGION;

  module.exports.MYSQL_HOST = process.env.MYSQL_HOST_DEV;
  module.exports.MYSQL_DATABASE = process.env.MYSQL_DATABASE_DEV;
  module.exports.MYSQL_USERNAME = process.env.MYSQL_USERNAME_DEV;
  module.exports.MYSQL_PASSWORD =  process.env.MYSQL_PASSWORD_DEV;

  module.exports.PORT = process.env.PORT_DEV;

  module.exports.SESSION_SECRET = process.env.SESSION_SECRET_DEV;

	module.exports.SO_KEY = process.env.SO_KEY_DEV;
}