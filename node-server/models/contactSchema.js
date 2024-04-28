// models/contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  recordID: { type: String},
  givenName: { type: String },
  familyName: { type: String },
  phoneNumber: { type: String},
  whatsappNumber: { type: String },
  emailId: String,
  notes: String
});

const Contact = mongoose.model('Contacts', contactSchema);

module.exports = Contact;
