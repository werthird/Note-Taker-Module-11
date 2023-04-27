// Requirements
const express = require('express');
// Import modular routers
const notesRouter = require('./notes');
// Start Express
const app = express();

// Any requests with /notes, sent to notesRouter
app.use('/notes', notesRouter);


// Export App
module.exports = app;