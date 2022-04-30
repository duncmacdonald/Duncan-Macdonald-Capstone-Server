// Update with your config settings.
require("dotenv").config();
const {HOST, USER, PASSWORD, DATABASE} = process.env;

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: HOST,
      user: USER,
      password: PASSWORD,
      database: DATABASE,
      charset: 'utf8'
    },
  },
};