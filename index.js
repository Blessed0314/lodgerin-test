require('dotenv').config();

const server = require('./src/config/app.js');
const { conn, Role } = require('./src/config/db.js');

const PORT = process.env.PORT || 3001;

conn.sync({ alter: true }).then(() => {
  Role.findOrCreate({ where: { name: 'admin' } });
  Role.findOrCreate({ where: { name: 'guest' } });

  console.log('DB conectado al server');
  server.listen(PORT, () => {
    console.log(`%s listening at ${PORT}`);
  });
});