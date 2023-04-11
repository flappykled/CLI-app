const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const updateContacts = async (allContacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const findContact = allContacts.find((item) => item.id === contactId);
  if (!findContact) return null;
  return findContact;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);
  if (index === -1) return null;
  const [deleteContact] = allContacts.splice(index, 1);
  await updateContacts(allContacts);
  return deleteContact;
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  await updateContacts(allContacts);
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };