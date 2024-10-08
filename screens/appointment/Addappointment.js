import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import local from '../config/key';
import axios from 'axios';
import { StyleSheet } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';

const Addappointment = () => {
    const navigation = useNavigation();
    const [selectedCenter, setSelectedCenter] = useState('');
    const [selectedslotId, setSelectedslotId] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [userData, setUserData] = useState('');
    const [centers, setCenters] = useState([]);
    const [slots, setSlots] = useState([]);


    async function getData() {
            const token = await AsyncStorage.getItem('token');
            console.log(token);
            axios.post(local + '/users/userdata', { token: token })
              .then(res => {
                console.log("valeur1 = " + res.data.data);
                setUserData(res.data.data);
              });

        axios.get(local + '/centers/find_center')
            .then(res => {
                setCenters(res.data);
                console.log(res.data);
            });

        axios.get(local + '/slots/find_slots')
            .then(res => {
                setSlots(res.data);
                console.log(res.data);
            });
    }

    useEffect(() => {
        getData();
    }, []);

    const handleAppointmentBooking = async () => {
        if (!selectedCenter || !selectedslotId || !selectedDate) {
            Alert.alert('Veuillez choisir un centre de santé, une date et un créneau horaire.');
            return;
        }
        try {
            const response = await axios.post(local + '/appointments/count-appointments', {
                centerId: selectedCenter,
                slotId: selectedslotId,
                date: selectedDate
            });
            // console.log("centerId : "+selectedCenter);
            // console.log("cslotId : "+selectedslotId);
            const { count } = response.data;
            const center = centers.find(center => center.id === selectedCenter);
            console.log(center.capacity);
            console.log("count : "+count);
            if (count < center.capacity) {
               
                const appointmentResponse = await axios.post(local + '/appointments/Add-appointment', {
                    userId: userData.id,
                    centerId: selectedCenter, 
                    slotId: selectedslotId,
                    date: selectedDate,
                    status: 'en cours'
                });
                Alert.alert(appointmentResponse.data.message);
                navigation.navigate("Mes RDVs");
            } else {
                Alert.alert('Ce créneau horaire est déjà réservé ou complet. Veuillez choisir un autre créneau.');
            }
        } catch (error) {
            console.error('Error during appointment booking:', error);
            Alert.alert('Une erreur lors de la prise de rendez-vous. Veuillez réessayer.');
        }
    };
    

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"always"}>
            <View style={styles.container}>
                <Text style={styles.title}>Choisissez une date :</Text>
                <Calendar
                    onDayPress={(day) => setSelectedDate(day.dateString)}
                    markedDates={{ [selectedDate]: { selected: true, marked: true } }}
                    style={styles.calendar}
                />
                <Text style={styles.title}>Choisissez un centre de santé :</Text>
                <Picker
                    selectedValue={selectedCenter}
                    onValueChange={(itemValue) => setSelectedCenter(itemValue)}
                    style={styles.picker}
                >
                    {centers.map(center => (
                        <Picker.Item key={center.id} label={center.center_name} value={center.id} />
                    ))}
                </Picker>
                <Text style={styles.title}>Choisissez un créneau horaire :</Text>
                <Picker
                    selectedValue={selectedslotId}
                    onValueChange={(itemValue) => setSelectedslotId(itemValue)}
                    style={styles.picker}
                >
                    {slots.map(slot => (
                        <Picker.Item key={slot.id} label={slot.label} value={slot.id} />
                    ))}
                </Picker>
                <Button title="Prendre rendez-vous" onPress={handleAppointmentBooking} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333333',
    },
    calendar: {
        marginBottom: 20,
    },
    picker: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5,
    },
});

export default Addappointment;
