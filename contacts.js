const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// Получаем и выводим весь список контактов в виде таблицы (console.table)
const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
  }
};

// Получаем контакт по id
const getContactById = async contactId => {
  if (!contactId) {
    console.warn('Enter user ID');
    return;
  }
  try {
    const data = await listContacts();
    return data.find(item => item.id === contactId);
  } catch (err) {
    console.log(err);
  }
};

// Удаляем контакт
const removeContact = async contactId => {
  if (!contactId) {
    console.warn('Enter user ID');
    return;
  }
  try {
    const data = await listContacts();
    const newContacts = data.filter(({ id }) => id !== contactId);
    if (data.length === newContacts.length) {
      return 'There is no such contact';
    }
    await fs.writeFile(contactsPath, JSON.stringify(newContacts), 'utf8');
    return await listContacts();
  } catch (err) {
    console.log(err);
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
    console.log(err);
  }
};

// Добавялем контакт
const addContact = async (name, email, phone) => {
  if (!name || !email || !phone) {
    console.warn('Enter valid values');
    return;
  }
  const id = await getNewId();
  const data = await listContacts();
  data.push({ id, name, email, phone });
  await fs.writeFile(contactsPath, JSON.stringify(data), 'utf8');
  return await listContacts();
};

module.exports = { listContacts, getContactById, removeContact, addContact };
