// app.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
// const { PrismaClient } = require('./generated/prisma');
// const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
// const prisma = new PrismaClient()
const path = require('path');

require('dotenv').config();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
    console.log("Listening on 3000");
})