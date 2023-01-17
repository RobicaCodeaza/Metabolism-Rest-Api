const express = require('express');
const cors = require('cors');

const app = express();

// Other third party api's can use our api with the correspondence link
// Middleware
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// To store the information in Json format => body in Postman
app.use(express.json());

// Body parser -->> search documentation
app.use(express.urlencoded({ extended: true }));

// Routers

const router = require('./routes/personDetailsRouter.js');
app.use('/api/persons', router);
// app.use('api/comments', router);
// Testing Api

app.get('/', (req, res) => {
  console.log('Fetched data');
  res.json({ message: 'fetched data' });
});

// Port

const PORT = process.eventNames.PORT || 8000;

// Server
// using backticks
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
