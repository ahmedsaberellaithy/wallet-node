require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3070;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Health check route
app.get('/health', (req, res) => {
  res.status(200).send({
    status: 'success',
    message: 'Server is running!',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
