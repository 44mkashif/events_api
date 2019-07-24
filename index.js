const express = require('express');
const events = require('./routes/events');
const db = require('./config/db');

const app = express();

db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch((err) => console.log('Error: ' + err));

app.use(express.json());
app.use('/events', events);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});