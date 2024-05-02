import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { IconButton, TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Api from '../../../lib/Api';

const ClientsAddStackScreen = ({ navigation }) => {
  const [clientName, setClientName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [emailId, setEmailId] = useState('');
  const [note, setNote] = useState('');

  const createClient = async () => {
    let clientsGivenName=clientName.split(' ')[0];
    let clientsFamilyName=clientName.split(' ')[1];
    try {
      let clientData = {clientsGivenName,clientsFamilyName, mobileNumber, whatsappNumber, emailId, note}
      const clientResult = await Api.postClients(clientData);
      if (clientResult.status === "success") {
        navigation.navigate('Leads', { index: 2 });
      }
    } catch (error) {
      console.error('Error while posting clients:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <IconButton icon="arrow-left" color="#fff" onPress={() => navigation.goBack()} style={styles.backButton} />

      <Text style={styles.title}>Add Client Information</Text>

      <TextInput
        label="Client Name"
        value={clientName}
        onChangeText={text => setClientName(text)}
        style={styles.input}
        theme={{ colors: { primary: '#007bff' } }}
      />

      <TextInput
        label="Mobile Number"
        value={mobileNumber}
        onChangeText={text => setMobileNumber(text)}
        style={styles.input}
        theme={{ colors: { primary: '#007bff' } }}
      />

      <TextInput
        label="Whatsapp Number"
        value={whatsappNumber}
        onChangeText={text => setWhatsappNumber(text)}
        style={styles.input}
        theme={{ colors: { primary: '#007bff' } }}
      />

      <TextInput
        label="EmailId Address"
        value={emailId}
        onChangeText={text => setEmailId(text)}
        style={styles.input}
        theme={{ colors: { primary: '#007bff' } }}
      />

      <TextInput
        label="Note"
        value={note}
        onChangeText={text => setNote(text)}
        multiline
        style={[styles.input, styles.noteInput]}
        theme={{ colors: { primary: '#007bff' } }}
      />

      <Button mode="contained" onPress={createClient} style={styles.saveButton} labelStyle={styles.saveButtonText}>
        Save Changes
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'rgb(54, 172, 170)',
    textAlign: 'center',
  },
  input: {
    marginBottom: 20,
  },
  noteInput: {
    height: 100,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: 'rgb(54, 172, 170)',
  },
  saveButtonText: {
    color: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'transparent',
  },
});

const Stack = createNativeStackNavigator();

export default ClientsAddStackScreen;
