const pool = require('../config/db');

async function executeQuery(query, params = []) {
  const [result] = await pool.execute(query, params);
  return result;
}

module.exports = {
  executeQuery
};