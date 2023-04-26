// Require Express
const notes = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');


// GET Route for retrieving diagnostic information
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) =>
    res.json(JSON.parse(data))
  );
});

notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (title && text) {
    const note = {
      title: title,
      text: text
    };
    readAndAppend(note, './db/db.json');

    const response = {
      status: 'Success',
      body: note
    };
    res.json(response);

  } else {
    res.json('Error in posting your note.')
  }
});

// Export App
module.exports = notes;