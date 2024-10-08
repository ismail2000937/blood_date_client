import React, { useEffect,useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import styles from '../style/style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import local from '../config/key';

const Login = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log(email, password);
        const userData = {
            email: email,
            password: password,
        };
        axios.post(local + '/users/login-user', userData)
            .then(res => {
                console.log(res.data.data);
                if (res.data.status === 'ok') {
                    Alert.alert('Logged In Successfully');
                    AsyncStorage.setItem('token', res.data.data);
                    AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
                    navigateToCorrectPage();
                }
            })
            .catch(error => {
                console.log('Error during login:', error);
                Alert.alert('Error', 'An error occurred during login');
            });
    };
    
    const navigateToCorrectPage = () => {
        const adminEmail = 'admin@gmail.com';
        const destination = email === adminEmail ? 'Accueil' : 'Home';
        navigation.navigate(destination);
    };
    

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"always"}>
            <View  style={{backgroundColor: 'white'}}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../../assets/login_images.jpg')} />
                </View>
                <View style={styles.loginContainer}>
                    <Text style={styles.text_header}>Login </Text>
                    <View style={styles.action}>
                        <FontAwesome name="user-o" color="#4bff72" style={styles.smallIcon} />
                        <TextInput placeholder="Email" style={styles.textInput} onChangeText={setEmail} />
                    </View>
                    <View style={styles.action}>
                        <FontAwesome name="lock" color="#4bff72" style={styles.smallIcon} />
                        <TextInput placeholder="Password" style={styles.textInput} secureTextEntry={true} onChangeText={setPassword} />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                        <View
                            style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 8, marginRight: 10 }}
                        >
                            <Text style={{ color: '#ff4b4b', fontWeight: '700' }}>
                                Forget Password
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.button}>
                        <TouchableOpacity style={styles.inBut} onPress={handleLogin}>
                            <View>
                                <Text style={styles.textSign}>Log in</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ padding: 15 }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#919191' }}>
                                ---You still don't have any acount---
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={{ color: '#ff4b4b', fontWeight: 'bold', fontSize: 25, }} >Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default Login;
