// Requirements
const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
const { clog } = require('./middleware/clog');

// Define Port
const PORT = process.env.PORT || 3001;

// Start Express
const app = express();

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

//Start from publics folder
app.use(express.static('public'));


//============ HTML ROUTES =================
// GET Route - Homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
// GET Route - Notes Page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);



//============ 404 ROUTES =================
// GET Catch-all Route - 404 Page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/404.html'))
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})