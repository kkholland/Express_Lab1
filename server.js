// require the Express module
const express = require('express');
const items = require('./items')

// creates an instance of an Express server
const app = express();

app.use('/', items);

// define the port
const port = 3000;

// run the server
app.listen(port, () => console.log(`Listening on port: ${port}.`));

// Can then run http://localhost:3000/cart-items in Insomnia & change the get/put/etc. method to see diff messages