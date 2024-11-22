const {Client, Pool} = require("pg");

module.exports.client = new Client ({
  database: "cafeteria",
  port: 5432,
  user: "postgres",
  host: "localhost",
  password: "root"
});

module.exports.pool = new Pool ({
  database: "cafeteria",
  port: 5432,
  user: "postgres",
  host: "localhost",
  password: "root"
});