const { Client } = require('pg');
const connectionString = 'postgres://euuwmkyy:WOcuIOlC62nXMR_nze8dEidXYyPrunzP@john.db.elephantsql.com/euuwmkyy';
function createConnection() {
  const client = new Client({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });
  client.connect();
  return client;
}

module.exports = { createConnection };