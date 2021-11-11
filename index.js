const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require('./contacts');

listContacts().then(console.table);
