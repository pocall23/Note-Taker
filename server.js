const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'db/db.json'))
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

app.post('/api/notes' ,(req, res) => {
    let newNote =req.body;
    let notes =  JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'))
    let notesLength = (notes.length).toString();

    newNote.id = notesLength;

    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(notes)
})

app.listen(PORT, () => console.log('listening on port '+ PORT));