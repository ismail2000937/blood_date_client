import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import Addappointment from './Addappointment';
import MyAppointment from './Myappointments';
import LogoutUser from './LogoutUser';
import { Button } from 'react-native';
import { shadow } from 'react-native-paper';

const Tab = createBottomTabNavigator();

const Home = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../assets/background_image.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenue sur BloodDonor</Text>
        <Text style={styles.subtitle}>
          L'application qui vous permet de sauver des vies en donnant du sang
        </Text>
        <Button
          title="Commencer"
          color="blue"
          onPress={() => navigation.navigate('Prendre un RDV')}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 30,
    textAlign: 'center',
  },
});

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Prendre un RDV') {
            iconName = 'book';
          } else if (route.name === 'Mes RDVs') {
            iconName = 'event';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Prendre un RDV" component={Addappointment} />
      <Tab.Screen name="Mes RDVs" component={MyAppointment} />
      <Tab.Screen name="Settings" component={LogoutUser} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
};

export default TabNavigator;
