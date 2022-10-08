require('dotenv').config();
const sequelize = require('./config/db');
const express = require('express');
const app = express();
const routes = require('./routes');
const auth = require('./config/auth');

app.use(auth.opcional);
app.use(express.json());
app.use('/', routes);


try {
    sequelize.authenticate();
    sequelize.sync();
    console.log('Connected to DB');
} catch (error) {
    console.log('Unable to connected to DB', error);
}

app.listen(process.env['PORT'] || 3000, () => {
    console.log(`Server listening on PORT ${process.env['PORT'] || 3000}`);
});