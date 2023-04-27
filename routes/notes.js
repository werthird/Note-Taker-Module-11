// Require Express
const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');


// GET Route - get db.json
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) =>
    res.json(JSON.parse(data))
  );
});


// DELETE Route for a specific tip
notes.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all tips except the one with the ID provided in the URL
      const result = json.filter((notes) => notes.id !== noteId);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});


// POST Route - add to dp.json
notes.post('/', (req, res) => {

  //Destructure the title and text
  const { title, text } = req.body;

  // If title and text are provided
  if (title && text) {
    const newNote = {
      title: title,
      text: text,
      id: uuidv4()
    };
    // Grab and append note into db.json
    readAndAppend(newNote, './db/db.json');

    // Then send response
    const response = {
      status: 'Success',
      body: newNote,
    };
    res.json(response);

  // Else send error
  } else {
    res.json('Error in posting your note.')
  }
});

// Export App
module.exports = notes;