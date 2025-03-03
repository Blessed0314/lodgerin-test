require('dotenv').config();

const server = require('./src/config/app.js');
const { conn } = require('./src/config/db.js');

const PORT = process.env.PORT || 3001;
// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  console.log('DB conectado al server');
  server.listen(PORT, () => {
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
  });
});