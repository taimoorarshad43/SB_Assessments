const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json()); // Adding middleware

app.post('/', async function(req, res, next) {
  //Getting developer information
  try {
    const responses = await Promise.all(
      req.body.developers.map(d =>
        axios.get(`https://api.github.com/users/${d}`)
      )
    );
  //Parsing responses
    const result = responses.map(r => ({
      name: r.data.name,
      bio: r.data.bio
    }));

  //Finally sending out responses
    res.json(result);

  // Handling errors
  } catch (err) {
    next(err);
  }
});

// Starting server
app.listen(3000, () => console.log('Server is running on port 3000'));