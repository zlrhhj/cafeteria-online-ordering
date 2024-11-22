const {client} = require('./db.js');
const fs = require('fs');
const path = require('path');

const executeSchema = () => {
  client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL');

    //read schema.sql
    const schemePath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemePath, 'utf8');

    //Execute the SQL commands
    console.log(schema);
    return client.query(schema);
  })
  .then(() => {
    console.log('Schema created successfully');
  })
  .catch((err) => {
    console.error('Error executing schema:',err.stack);
  })
  .finally(() => {
    client.end()
    .then(() => {
      console.log('Disconnected from postgreSQL');
    })
    .catch((err) => {
      console.error('Error disconnecting:', err.stack);
    })
  });
};

executeSchema();