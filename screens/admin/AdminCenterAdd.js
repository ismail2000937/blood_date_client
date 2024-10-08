import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert,Text } from 'react-native';
import axios from 'axios';
import local from '../config/key';
import { useNavigation } from '@react-navigation/native';

const AdminCenter = () => {
    const [center_name, setCenterName] = useState('');
    const [location, setLocation] = useState('');
    const [contact, setContact] = useState('');
    const [capacity, setCapacity] = useState('');
    const navigation = useNavigation();

    const handleCreateCenter = () => {
        const newCenterData = {
            center_name,
            location,
            contact,
            capacity
        };

        axios.post(local + "/centers/add_center", newCenterData)
            .then(response => {
                console.log("Center created:", response.data);
                Alert.alert("Center created");
                navigation.navigate("Accueil");
            })
            .catch(error => {
                console.error("Error creating center:", error);
                Alert.alert("Error during creating the center");
            });
    };

    return (
        <View style={styles.container}>
            <View>
            <Text style={styles.title}>Ajouter un Centre</Text>
            </View>
            <TextInput 
                style={styles.input} 
                placeholder="Nom du centre" 
                onChangeText={setCenterName} 
            />
            <TextInput 
                style={styles.input} 
                placeholder="Emplacement" 
                onChangeText={setLocation} 
            />
            <TextInput 
                style={styles.input} 
                placeholder="Contact" 
                onChangeText={setContact} 
            />
            <TextInput 
                style={styles.input} 
                placeholder="Capacité" 
                onChangeText={setCapacity} 
            />
            <Button 
                title="Créer le centre" 
                onPress={handleCreateCenter} 
            />
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

export default AdminCenter;
