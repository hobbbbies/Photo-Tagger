// app.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const cors = require('cors');
app.use(cors());
const checkCollision = require('./controllers/characterControllers/checkCollision');
const getCharacters = require('./controllers/characterControllers/getCharacters');
require('dotenv').config();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(express.json())

app.post('/api/checkCollision', checkCollision);
app.get('/api/characters', getCharacters);
app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
    console.log("Listening on 3000");
})