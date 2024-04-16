// app.js

const express = require('express');
const bodyParser = require('body-parser');
const taskRouter = require('./src/routes/taskRouter');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use task router for all task-related routes
app.use('/tasks', taskRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
