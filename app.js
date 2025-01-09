const express = require("express");
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./Database/connection');
const contactRoutes = require('./routes/contact');


const port = process.env.PORT || 3030;
const app = express();

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/contacts', contactRoutes);

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port,'0.0.0.0', () => {
            console.log(`Connected to DB and listening on ${port}`);
        });

    }
});
process.on('uncaughtException', (err) => { console.error('Uncaught Exception:', err); }); process.on('unhandledRejection', (reason, promise) => { console.error('Unhandled Rejection at:', promise, 'reason:', reason); });