const express = require('express');
const app = express();
const PORT = 3001;
const path = require('path');
app.use(express.static('public'));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} http://localhost:${PORT}/`)
})
