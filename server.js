const express = require('express');
const app = express();
const PORT = 3001;
const path = require('path');
const db = require('./db/db.json');
app.use(express.json());
app.use(express.static('public'));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('/api/notes', (req, res) => res.json(db));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} http://localhost:${PORT}/`)
})
