import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import local from '../config/key';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EditCenter from './EditCenter';
import AdminAppointment from './AdminAppointment';
import AdminCenterAdd from './AdminCenterAdd';
import AdminLogout from './AdminLogout';

const Tab = createBottomTabNavigator();

const HomeAdmin = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName='AdminPage'>
      <Stack.Screen name="Accueil" component={AdminPage} />
      <Stack.Screen name="Edit Center" component={EditCenter} />
    </Stack.Navigator>
  );
};

const AdminPage = ({ navigation }) => {
  const [centers, setCenters] = useState([]);

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await axios.get(local + '/centers/find_center');
        setCenters(response.data);
      } catch (error) {
        console.error('Error fetching centers:', error);
      }
    };
    fetchCenters();
  }, []);

  const handleEditCenter = (center) => {
    navigation.navigate('Edit Center', { center });
  };

  const handleDeleteCenter = async (id) => {
    try {
      await axios.delete(local + '/centers/delete_center/' + id);
      setCenters(centers.filter(center => center.id !== id));
      console.log('Center deleted successfully');
      Alert.alert('Center deleted successfully');
    } catch (error) {
      console.error('Error deleting center:', error);
      if (error.response && error.response.data && error.response.data.message) {
        Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Error', 'An unexpected error occurred while deleting the center.');
      }
    }
  };

  const renderCenterItem = ({ item }) => {
    return (
      <View style={styles.centerItem}>
        <Text>Center Name: {item.center_name}</Text>
        <Text>Location: {item.location}</Text>
        <Text>Contact: {item.contact}</Text>
        <Text>Capacity: {item.capacity}</Text>

        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={() => handleEditCenter(item)}>
            <Text style={[styles.actionButton, { backgroundColor: 'blue' }]}>Modifier</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteCenter(item.id)}>
            <Text style={[styles.actionButton, { backgroundColor: 'red' }]}>Supprimer</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={centers}
        renderItem={renderCenterItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  centerItem: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  actionButtons: {
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

const TabNavigatorAdmin = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Accueil') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Add Center') {
            iconName = focused ? 'add' : 'add';
          } else if (route.name === 'Liste RDV') {
            iconName = focused ? 'event' : 'event';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Accueil" component={HomeAdmin} options={{ headerShown: false }} />
      <Tab.Screen name="Add Center" component={AdminCenterAdd} />
      <Tab.Screen name="Liste RDV" component={AdminAppointment} />
      <Tab.Screen name="Settings" component={AdminLogout} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default TabNavigatorAdmin;
