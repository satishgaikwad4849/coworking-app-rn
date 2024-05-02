import axios from 'axios';
import uuid from 'react-native-uuid';

class API {
  constructor() {
    // this.baseURL = 'http://192.168.1.109:3001/api';
    this.baseURL = 'https://coworking-app-rn.vercel.app/api/';
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  async getContacts(){
    try {
      const response = await axios.get(`${this.baseURL}/contacts`);
    return response.data;
    } catch (error) {
      console.error('Error while getting contacts:', error);
    }
  }

  async postContacts(newContacts) {
    try {
      const response = await axios.post(`${this.baseURL}/contacts`, {
        contacts: newContacts,
      }, {
        headers: this.headers,
      });

    return response.data;

    } catch (error) {
      console.error('Error while posting contacts:', error);
    }
  }

  async getLeads() {
    try {
      const response = await axios.get(`${this.baseURL}/leads`);
    return response.data;
    } catch (error) {
      console.error('Error while getting leads:', error);
    }
  }

  async postLeads(leadData) {
    try {
      const response = await axios.post(`${this.baseURL}/leads`, {
        leads: [leadData],
      }, {
        headers: this.headers,
      });

    return response.data;

    } catch (error) {
      console.error('Error while posting contacts:', error);
    }
  }

  async  editLeads(recordID,data){
    console.log(recordID,data,"edit leadssss")
    try {
        const response = await axios.put(`${this.baseURL}/leads/${recordID}`, { lead: data }, {
            headers: this.headers,
          })
        return response.data;
  
      } catch (error) {
        console.error('Error while editing Leads:', error);
      } 
  }

  async deleteLeads(recordID){
    try {
      const response = await axios.delete(`${this.baseURL}/leads/${recordID}`)
      return response.data;

    } catch (error) {
      console.error('Error while deleting Leads:', error);
    } 
  }

  async getClients(){
    try {
      const response = await axios.get(`${this.baseURL}/clients`);
    return response.data;
    } catch (error) {
      console.error('Error while getting clients:', error);
    }
  }

  async postClients(client_data) {
    let { clientsGivenName,clientsFamilyName, mobileNumber, whatsappNumber, email, note } = client_data;
    try {
      let clientData = {
        recordID: uuid.v1(),
        givenName: clientsGivenName,
        familyName: clientsFamilyName,
        phoneNumber: mobileNumber,
        whatsappNumber: whatsappNumber ?? mobileNumber,
        emailId: email,
        note: note
      };
      console.log(clientData,"client data api")
      const response = await axios.post(`${this.baseURL}/clients`, {
        clients: [clientData],
      }, {
        headers: this.headers,
      });

    return response.data;

    } catch (error) {
      console.error('Error while posting clients:', error);
    }
  }
  
  async  editClients(recordID,data){
    try {
        const response = await axios.put(`${this.baseURL}/clients/${recordID}`, { client: data }, {
            headers: this.headers,
          })
        return response.data;
  
      } catch (error) {
        console.error('Error while editing clients:', error);
      } 
  }

  async deleteClients(recordID){
    try {
      const response = await axios.delete(`${this.baseURL}/clients/${recordID}`)
      return response.data;

    } catch (error) {
      console.error('Error while deleting Clients:', error);
    } 
  }

  async  searchLeads(searchText){
    try {
        const response = await axios.get(`${this.baseURL}/search/leads?search=${searchText}`)
        return response.data;
  
      } catch (error) {
        console.error('Error while search leads', error);
      } 
  }

  async  searchClients(searchText){
    try {
        const response = await axios.get(`${this.baseURL}/search/clients?search=${searchText}`)
        return response.data;
  
      } catch (error) {
        console.error('Error while search clients', error);
      } 
  }
}
const Api = new API();
export default Api;
