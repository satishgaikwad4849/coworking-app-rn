// models/client.js
const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  recordID: { type: String },
  givenName: { type: String },
  familyName: { type: String },
  phoneNumber: { type: String },
  isStarred: { type: Boolean, default: false },
  postalAddresses: [{ type: String }],
  emailId: { type: String },
  thumbnailPath: String,
  department: String,
  jobTitle: String,
  emailAddresses: [{ type: String }],
  urlAddresses: [{ type: String }],
  suffix: String,
  company: String,
  imAddresses: [{ type: String }],
  note: String,
  middleName: String,
  displayName: { type: String },
  prefix: String,
  hasThumbnail: { type: Boolean, default: false },
  rawContactId: { type: String }
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
