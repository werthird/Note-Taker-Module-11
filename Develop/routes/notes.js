// Require Express
const notes = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');


// GET Route - get db.json
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) =>
    res.json(JSON.parse(data))
  );
});


// POST Route - add to dp.json
notes.post('/', (req, res) => {

  //Destructure the title and text
  const { title, text } = req.body;

  // If title and text are provided
  if (title && text) {
    // Grab and append note into db.json
    readAndAppend(req.body, './db/db.json');

    // Then send response
    const response = {
      status: 'Success',
      body: req.body
    };
    res.json(response);

  // Else send error
  } else {
    res.json('Error in posting your note.')
  }
});

// Export App
module.exports = notes;