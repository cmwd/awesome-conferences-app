const express = require('express');

const app = express();

app.listen(process.env.NODE_PORT);
app.get('/', (req, res) => {
  res.send('Soon!');
});
