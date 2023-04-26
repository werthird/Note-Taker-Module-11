// Require Express
const express = require('express');
const path = require('path');

// Start Express
const app = express();

// Define Port
const PORT = 3001;

//Make sure to start from publics folder
app.use(express.static('public'));

//============ HTML ROUTES =================
// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);




app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})