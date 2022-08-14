const { createConnection } = require('./server');

function insertPaste(formData) {
  let query = `INSERT INTO pastes(paste_title, paste_text) VALUES ('${formData.paste_title}', '${formData.paste_text}');`;
  let client = createConnection();
  client.query(query, (err, res) => {
    client.end()
  })
  return 'success';
}

async function getTitles() {
  let query = `SELECT id, paste_title FROM pastes`;
  let client = createConnection();
  let data = await client.query(query);
  client.end();
  return data.rows;
}

async function getPasteById(id) {
  let query = `SELECT * FROM pastes WHERE id = ($1)`;
  let client = createConnection();
  let data = await client.query(query, [id]);
  client.end();
  return data.rows;
}

async function updatePaste(title, text, id) {
  let query = `UPDATE pastes SET paste_title = ($1), paste_text = ($2) WHERE id = ($3)`;
  let client = createConnection();
  let data = await client.query(query, [title, text, id]);
  client.end();
  return 'Success';
}

async function deletePaste(id) {
  let query = `DELETE FROM pastes WHERE id =($1)`;
  let client = createConnection();
  await client.query(query, [id]);
  client.end();
  return 'Success';
}

module.exports = { insertPaste, getTitles, getPasteById, updatePaste, deletePaste };