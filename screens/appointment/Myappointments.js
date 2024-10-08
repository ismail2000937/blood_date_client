import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import local from '../config/key';
import { StyleSheet } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

const Myappointments = () => {
    const [appointments, setAppointments] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const res = await axios.post(local + '/users/userdata', { token: token });
    
                if (res.data.data && res.data.data.id) {
                    const userId = res.data.data.id;
                    const response = await axios.get(local + '/users/' + userId + '/appointments', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setAppointments(response.data.appointments);
                } else {
                    console.error('User ID not found in userData');
                }
            } catch (error) {
                console.error('Error fetch appointments:', error);
            }
        };
    
        fetchData();
    }, []);
    
    const renderStatusIcon = (status) => {
        if (status.toLowerCase() === 'valider') {
            return <FontAwesome name="check-circle" size={24} color="green" />;
        } else if (status.toLowerCase() === 'non valider') {
            return <FontAwesome name="times-circle" size={24} color="red" />;
        } else {
            return <FontAwesome name="circle" size={24} color="orange" />;
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"always"}>
            <View style={styles.container}>
                <Text style={styles.title}>Mes rendez-vous :</Text>
                {appointments.map((appointment, index) => (
                    <View key={index} style={styles.appointmentContainer}>
                        <View style={styles.appointmentInfo}>
                            <Text style={styles.label}>User Name :</Text>
                            <Text style={styles.value}>{appointment?.User?.firstName} {appointment?.User?.lastName}</Text>
                        </View>
                        <View style={styles.appointmentInfo}>
                            <Text style={styles.label}>Centre :</Text>
                            <Text style={styles.value}>{appointment?.Center?.center_name}</Text>
                        </View>
                        <View style={styles.appointmentInfo}>
                            <Text style={styles.label}>Date :</Text>
                            <Text style={styles.value}>{appointment?.date}</Text>
                        </View>
                        <View style={styles.appointmentInfo}>
                            <Text style={styles.label}>Heure :</Text>
                            <Text style={styles.value}>{appointment?.SlotLabel?.label}</Text>
                        </View>
                        <View style={styles.appointmentInfo}>
                            <Text style={styles.label}>Etat :</Text>
                            {renderStatusIcon(appointment.status)}
                            <Text style={styles.value}>{appointment.status}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    appointmentContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        elevation: 3,
    },
    appointmentInfo: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 5,
    },
    value: {
        flex: 1,
    },
});

export default Myappointments;
