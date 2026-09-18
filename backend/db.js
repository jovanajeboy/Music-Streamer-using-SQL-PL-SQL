const oracledb = require("oracledb");
require("dotenv").config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT_STRING,
};

async function getConnection() {
  const connection = await oracledb.getConnection(dbConfig);

  connection.outFormat = oracledb.OUT_FORMAT_OBJECT;

  return connection;
}

module.exports = { getConnection };