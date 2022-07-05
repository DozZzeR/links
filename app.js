const express = require('express');
const config = require('config');
const sequelize = require('./db/database');

sequelize.sync().then(() => console.log('DB is ready'));

const app = express();

app.use( express.json({extended: true}));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));
app.use('/t', require('./routes/redirect.routes'));

const PORT = config.get('port') || 5000;

async function start() {
    try{
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}!`));
    } catch(e) {
        console.log('Server error', e.message);
        process.exit(1);
    }
}

start();