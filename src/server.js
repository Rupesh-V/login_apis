// src/server.js

require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/routes');
const bodyParser = require('body-parser')
const router = express.Router();
const app = express();

const cors = require('cors');
app.use(cors())

app.use(express.json());

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use('/api', userRoutes);

const PORT =3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});






