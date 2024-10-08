import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import local from '../config/key';

const AdminAppointment = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(local + '/appointments/find_appointment');
                setAppointments(response.data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, []);

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            await axios.put(local + `/appointments/edit_status/${id}`, { status: newStatus });
            const updatedAppointments = appointments.map(appointment => {
                if (appointment.id === id) {
                    return { ...appointment, status: newStatus };
                } else {
                    return appointment;
                }
            });
            setAppointments(updatedAppointments);
            console.log('Status updated successfully');
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const renderAppointmentItem = ({ item }) => {
        return (
            <View style={styles.appointmentItem}>
                <Text>User Name: {item?.User?.firstName}  {item?.User?.lastName}</Text>
                <Text>Center Name: {item?.Center?.center_name}</Text>
                <Text>Date: {item.date}</Text>
                <Text>Time Slot: {item?.SlotLabel?.label}</Text>
                <Text>Status: {item.status}</Text>
                <View style={styles.statusButtons}>
                    <TouchableOpacity onPress={() => handleUpdateStatus(item.id, 'Valider')}>
                        <Text style={[styles.actionButton, { backgroundColor: 'green' }]}>Valider</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleUpdateStatus(item.id, 'Non valider')}>
                        <Text style={[styles.actionButton, { backgroundColor: 'red' }]}>Non Valider</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    

    return (
        <View style={styles.container}>
            <FlatList
                data={appointments}
                renderItem={renderAppointmentItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    appointmentItem: {
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    statusButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    actionButton: {
        padding: 5,
        color: 'white',
        borderRadius: 5,
    },
});

export default AdminAppointment;
