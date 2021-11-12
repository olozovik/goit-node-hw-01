const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// Получаем и выводим весь список контактов в виде таблицы (console.table)
const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (err) {
    console.error(err);
  }
};

// Получаем контакт по id
const getContactById = async contactId => {
  if (!contactId) {
    console.warn('Enter user ID');
    return;
  }
  try {
    const contacts = await listContacts();
    const contact = contacts.find(item => item.id === contactId);
    if (!contact) {
      return null;
    }
    return contact;
  } catch (err) {
    console.error(err);
  }
};

// Удаляем контакт
const removeContact = async contactId => {
  if (!contactId) {
    console.warn('Id is not passed');
    return;
  }
  try {
    const contacts = await listContacts();
    const contact = contacts.find(item => item.id === contactId);
    if (!contact) {
      return null;
    }
    const newContacts = contacts.filter(({ id }) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return contact;
  } catch (err) {
    console.error(err);
  }
};

//Получаем новый уникальный Id
const getNewId = async () => {
  try {
    const idsPath = path.join(__dirname, 'db', 'ids.txt');
    const newId = Number(await fs.readFile(idsPath, 'utf8')) + 1;
    await fs.writeFile(idsPath, String(newId), 'utf8');
    return newId;
  } catch (err) {
    console.error(err);
  }
};

// Добавялем контакт
const addContact = async (name, email, phone) => {
  if (!name || !email || !phone) {
    console.warn('Valid values are not passed');
    return;
  }
  try {
    const id = await getNewId();
    const contacts = await listContacts();
    const newContact = { id, name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact };
