// Load variables from .env into process.env BEFORE anything reads them.
require('dotenv').config();

const app = require('./app');

// Fall back to 5000 if PORT is missing from .env.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});