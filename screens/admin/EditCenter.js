import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import local from '../config/key';
import { useNavigation } from '@react-navigation/native';

const EditCenter = ({ route }) => {
  const { center } = route.params;
  const navigation = useNavigation();

  const [centerName, setCenterName] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [capacity, setCapacity] = useState('');

  // Utiliser useEffect pour mettre à jour les états lorsque le centre change
  useEffect(() => {
    setCenterName(center.center_name);
    setLocation(center.location);
    setContact(center.contact);
    setCapacity(center.capacity.toString());
  }, [center]);

  const handleSaveCenter = async () => {
    const updatedCenter = {
      id: center.id,
      center_name: centerName,
      location: location,
      contact: contact,
      capacity: capacity,
    };
    
    try {
      await axios.put(`${local}/centers/edit_center/${updatedCenter.id}`, updatedCenter);
      Alert.alert('Success', 'Le centre a été mis à jour avec succès!');
      navigation.navigate('Accueil');
    } catch (error) {
      console.error('Error updating center:', error);
      Alert.alert('Error updating center:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier le Centre</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom du Centre"
        value={centerName}
        onChangeText={setCenterName}
      />
      <TextInput
        style={styles.input}
        placeholder="Emplacement"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact"
        value={contact}
        onChangeText={setContact}
      />
      <TextInput
        style={styles.input}
        placeholder="Capacité"
        value={capacity}
        onChangeText={setCapacity}
      />
      <Button title="Enregistrer" onPress={handleSaveCenter} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: '80%',
    backgroundColor: '#fff',
  },
});

export default EditCenter;
