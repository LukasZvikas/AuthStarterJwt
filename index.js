
const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('./services/passport');
require('./Model/user');


mongoose.connect(keys.mongoKey);

const app = express();


app.use(bodyParser.json())

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;


app.listen(PORT);