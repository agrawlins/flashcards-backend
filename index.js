const connectDB = require('./startup/db');
const express = require('express');
const app = express();
const deck = require('./routes/deck');
const users = require('./routes/users');

connectDB();

app.use(express.json());
app.use('/api/deck', deck);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});