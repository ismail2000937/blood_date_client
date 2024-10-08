import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from '../appointment/Home';
import Login from '../auth/Login';
import Register from '../auth/Register';
import AdminPage from '../admin/AdminPage';
import EditCenter from '../admin/EditCenter';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsLoggedIn(!!token);
        // Vérifier si l'utilisateur est un administrateur en fonction de son email par exemple
        const email = await AsyncStorage.getItem('email'); 
        if (email) {
          await AsyncStorage.setItem('email', email);
        } else {
          console.log('Attempted to save null or undefined email');
        }
        console.log('email:', email)
        setIsAdmin(email === 'admin@gmail.com');
      } catch (error) {
        console.log('Error retrieving token:', error);
        setIsLoggedIn(false);
      }
    };
    getToken();
  }, []);

console.log("email : "+isAdmin);
console.log("ISlogin : "+isLoggedIn);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          isAdmin ? (
            <>
              <Stack.Screen name="Accueil" component={AdminPage} options={{ headerShown: false }} />
              <Stack.Screen name="Edit Center" component={EditCenter} />
            </>
          ) : (
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          )
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Accueil" component={AdminPage} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
