const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(`${err.message}`);
});


const app = require('./app');

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Express running → PORT ${PORT}`))
