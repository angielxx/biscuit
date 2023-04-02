const express = require('express');
const app = express();
const test = require('./Router/test');

app.use('/meta', test);

const port = 5000;
app.listen(port, () => console.log(`Node Server is listening to port ${port}`));
