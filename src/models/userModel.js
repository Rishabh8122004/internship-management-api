const { readData, writeData, getNextId } = require('../utils/jsonDb');

const FILE_NAME = 'users';

function findUserByEmail(email) {
  return readData(FILE_NAME).find((user) => user.email === email);
}

function findUserById(id) {
  return readData(FILE_NAME).find((user) => user.id === id);
}

function addUser(userData) {
  const users = readData(FILE_NAME);
  const newUser = { id: getNextId(users), ...userData };
  users.push(newUser);
  writeData(FILE_NAME, users);
  return newUser;
}

module.exports = { findUserByEmail, findUserById, addUser };