const fs = require('fs');
const path = require('path');

// Absolute path to the /data folder, so it works no matter where we start the server from.
const DATA_DIR = path.join(__dirname, '..', '..', 'data');

function getFilePath(fileName) {
  return path.join(DATA_DIR, `${fileName}.json`);
}

// Read a collection (e.g. "students") and return it as a JS array.
function readData(fileName) {
  const filePath = getFilePath(fileName);

  // If the file is missing, create it so the app doesn't crash.
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]');
    return [];
  }

  const text = fs.readFileSync(filePath, 'utf-8');
  if (text.trim() === '') {
    return [];
  }
  return JSON.parse(text);
}

// Save a JS array back to its JSON file (formatted with 2 spaces so it's readable).
function writeData(fileName, data) {
  const filePath = getFilePath(fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Next ID = highest existing id + 1 (or 1 if the list is empty).
function getNextId(items) {
  if (items.length === 0) {
    return 1;
  }
  const ids = items.map((item) => item.id);
  return Math.max(...ids) + 1;
}

module.exports = { readData, writeData, getNextId };