// models/contact.js
const mongoose = require('mongoose');


const contactSchema = new mongoose.Schema({
  recordID: { type: String}, // Make recordID mandatory
  givenName: { type: String }, // Make givenName mandatory
  familyName: { type: String }, // Make familyName mandatory
  middleName: String,
  prefix: String,
  suffix: String,
  phoneNumber: [String], // Array to store multiple phone numbers
  whatsappNumber: String,
  emailAddresses: [String], // Array to store multiple email addresses
  notes: String,
  company: String,
  department: String,
  jobTitle: String,
  hasThumbnail: Boolean,
  thumbnailPath: String,
  imAddresses: [String], // Array for instant messaging addresses
  isStarred: Boolean,
  urlAddresses: [String], // Array for website URLs
  postalAddresses: [ // Array for postal addresses (optional)
    {
      streetAddress: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
  ],
});

const Contact = mongoose.model('Contacts', contactSchema);

module.exports = Contact;
