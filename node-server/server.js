// mockServer.js
const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const cors = require('cors');
const Contact = require('./models/contactSchema'); // Import Contact schema
const Lead = require('./models/leadSchema');
const Client = require('./models/clientSchema');
const connectDB = require('./config/db');
const app = express();
const PORT = 3001;
app.use(cors());
app.use(bodyParser.json());
connectDB();
// // MongoDB connection setup
// mongoose.connect('mongodb://localhost:27017/satishgaikwad', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// Endpoint to get contacts
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json({ contacts, status: "success" });
  } catch (error) {
    console.error('Error handling /api/contacts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to post contacts
app.post('/api/contacts', async (req, res) => {
  try {
    const newContacts = req.body.contacts || [];
    const createdContacts = await Contact.create(newContacts);
    res.json({ message: 'Contacts successfully updated', status: "success", createdContacts });
  } catch (error) {
    console.error('Error handling /api/contacts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Endpoint to get leads
app.get('/api/leads', async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json({ leads, status: "success" });
  } catch (error) {
    console.error('Error handling /api/leads:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to post leads
app.post('/api/leads', async (req, res) => {
  try {
    let newLeads = req.body.leads || [];

    // If newLeads is a single object, convert it to an array
    if (!Array.isArray(newLeads)) {
      newLeads = [newLeads];
    }

    const createdLeads = await Lead.create(newLeads);
    res.json({ message: 'Leads successfully updated', status: "success", createdLeads });
  } catch (error) {
    console.error('Error handling /api/leads:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Edit a Lead
app.put('/api/leads/:recordID', async (req, res) => {
  try {
    const recordID = req.params.recordID;
    const updatedLead = req.body.lead;

    const lead = await Lead.findOneAndUpdate({ recordID }, updatedLead, { new: true });

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found', status: 'error' });
    }

    res.json({ message: 'Lead successfully updated', status: 'success', lead });
  } catch (error) {
    console.error('Error handling /api/leads/:recordID (PUT):', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a Lead
app.delete('/api/leads/:recordID', async (req, res) => {
  try {
    const recordID = req.params.recordID;

    const lead = await Lead.findOneAndDelete({ recordID });

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found', status: 'error' });
    }

    res.json({ message: 'Lead successfully deleted', status: 'success' });
  } catch (error) {
    console.error('Error handling /api/leads/:recordID (DELETE):', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Get all clients
app.get('/api/clients', async (req, res) => {
  try {
    const clients = await Client.find({});
    res.json({ clients, status: "success" });
  } catch (error) {
    console.error('Error handling GET /api/clients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add new clients
app.post('/api/clients', async (req, res) => {
  try {
    let newClients = req.body.clients || [];
console.log(newClients,"newClientsss")
    if (!Array.isArray(newClients)) {
      newClients = [newClients];
    }

    const insertedClients = await Client.insertMany(newClients);
    res.json({ message: 'Clients successfully added', clients: insertedClients, status: "success" });
  } catch (error) {
    console.error('Error handling POST /api/clients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a client
app.put('/api/clients/:recordID', async (req, res) => {
  try {
    const recordID = req.params.recordID;
    const updatedClient = req.body.client;

    const updatedClientDoc = await Client.findOneAndUpdate(
      { recordID },
      updatedClient,
      { new: true }
    );

    if (updatedClientDoc) {
      res.json({ message: 'Client successfully updated', client: updatedClientDoc, status: 'success' });
    } else {
      res.status(404).json({ error: 'Client not found', status: 'error' });
    }
  } catch (error) {
    console.error('Error handling PUT /api/clients/:recordID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a client
app.delete('/api/clients/:recordID', async (req, res) => {
  try {
    const recordID = req.params.recordID;

    const deletedClient = await Client.findOneAndDelete({ recordID });

    if (deletedClient) {
      res.json({ message: 'Client successfully deleted', status: 'success' });
    } else {
      res.status(404).json({ error: 'Client not found', status: 'error' });
    }
  } catch (error) {
    console.error('Error handling DELETE /api/clients/:recordID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// app.listen(PORT, () => {
//   console.log(`Mock server is running at http://localhost:${PORT}`);
// });

// Endpoint to search leads
app.get('/api/search/leads', async (req, res) => {
  try {
    const searchText = req.query.search || '';
    const regex = new RegExp(searchText, 'i'); // Case-insensitive search regex

    const filteredLeads = await Lead.find({
      $or: [
        { givenName: regex },
        { familyName: regex },
        { phoneNumber: regex }
        // Add more fields if needed
      ]
    });

    res.json({ leads: filteredLeads, status: "success" });
  } catch (error) {
    console.error('Error handling /api/search/leads:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to search clients
app.get('/api/search/clients', async (req, res) => {
  try {
    const searchText = req.query.search || '';
    const regex = new RegExp(searchText, 'i'); // Case-insensitive search regex

    const filteredClients = await Client.find({
      $or: [
        { givenName: regex },
        { familyName: regex },
        { phoneNumber: regex }
        // Add more fields if needed
      ]
    });

    res.json({ clients: filteredClients, status: "success" });
  } catch (error) {
    console.error('Error handling /api/search/clients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Mock server is running at http://localhost:${PORT}`);
});
