// Load variables from .env into process.env BEFORE anything reads them.
require('dotenv').config();

const app = require('./app');

// Fail fast: without a secret we cannot sign or verify tokens safely.
if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is missing in .env. Add it before starting the server.');
  process.exit(1);
}

// Fall back to 5000 if PORT is missing from .env.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});