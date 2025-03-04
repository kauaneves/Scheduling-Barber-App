const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "barber-db",
  password: "kar050773",
  port: 5432,
});

module.exports = pool;
