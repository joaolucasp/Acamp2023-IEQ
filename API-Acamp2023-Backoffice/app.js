const express = require('express');
const cors = require('cors');
const user = require('./src/routes/user');
const register = require('./src/routes/register');
const payment = require('./src/routes/payment');

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*", // Allow all origins
  })
);

app.use('/user', user);
app.use ('/register', register);
app.use('/payment', payment);

app.listen(3001, () => {
  console.log('Server running on port 3001');
});

// res.header("Access-Control-Allow-Credentials", "true")
// res.header("Access-Control-Allow-Origin", "*");
// res.header("Access-Control-Allow-Headers", "X-Requested-With");
// res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
// res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
