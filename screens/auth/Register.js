import React, { useEffect,useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import styles from '../style/style';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import local from '../config/key';

const Register = () => {
    const navigation = useNavigation();

    const handleRegister = () => {
        if (firstNameVerify && lastNameVerify && emailVerify && mobileVerify && passwordVerify) {
            const userData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobile: mobile,
                password: password
            };
            axios.post(local+'/users/register', userData)
                .then((res) => {
                    if (res.data.status === 'ok') {
                        Alert.alert('Sign in successful');
                        navigation.navigate('Login');
                    } else {
                        console.log(res.data.data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            Alert.alert('Please fill all the fields correctly');
        }
    };
    

    const [firstName, setFirstName] = useState("");
    const [firstNameVerify, setFirstNameVerify] = useState(false);
    const [lastName, setlastName] = useState("");
    const [lastNameVerify, setLastNameVerify] = useState(false);
    const [email, setEmail] = useState("");
    const [emailVerify, setEmailVerify] = useState(false);
    const [mobile, setMobile] = useState("");
    const [mobileVerify, setMobileVerify] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState(false);


    function handleFirstName(text) {
        setFirstName(text);
        setFirstNameVerify(text.length > 2);
    }

    function handleLastName(text) {
        setlastName(text);
        setLastNameVerify(text.length > 2);
    }
 
    function handleEmail(text) {
        setEmail(text);
        const emailStructure = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailStructure.test(text);
        setEmailVerify(isValidEmail);
    } 

    function handleMobile(text) {
        setMobile(text);
        const isValidPhoneNumber = /^\d{10}$/.test(text);
        setMobileVerify(isValidPhoneNumber);
    }     
 
    function handlePassword(text) {
        setPassword(text);
        if (text.length > 5) {
            setPasswordVerify(true);
        } else {
            setPasswordVerify(false);
        }
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <View>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../../assets/register_images.png')} />
                </View>
                <View style={styles.loginContainer}>
                    <Text style={styles.text_header}>Register</Text>

                    <View style={styles.action}>
                        <FontAwesome name="user" color="#4bff72" style={styles.smallIcon} />
                        <TextInput placeholder="First Name" style={styles.textInput} onChangeText={handleFirstName} />
                        {firstName.length < 2 && firstName.length < 1 ? null : firstNameVerify ?
                            <Feather name="check-circle" color='#68C39F' size={20} /> :
                            <Feather name="alert-triangle" color='#FFD700' size={20} />
                        }
                    </View>
                    {firstName.length < 2 && firstName.length < 1 ? null : firstNameVerify ? null :
                        <Text style={{ marginLeft: 20, color: 'red' }}>The first name should be more than 2 caracters</Text>}
                    
                    <View style={styles.action}>
                        <FontAwesome name="user" color="#4bff72" style={styles.smallIcon} />
                        <TextInput placeholder="Last Name" style={styles.textInput} onChangeText={handleLastName} />
                        {lastName.length < 2 && lastName.length < 1 ? null : lastNameVerify ?
                            <Feather name="check-circle" color='#68C39F' size={20} /> :
                            <Feather name="alert-triangle" color='#FFD700' size={20} />
                        }
                    </View>
                    {lastName.length < 2 && lastName.length < 1 ? null : lastNameVerify ? null :
                        <Text style={{ marginLeft: 20, color: 'red' }}>The last name should be more than 2 caracters</Text>}
                        
                    <View style={styles.action}>
                        <FontAwesome name="user-o" color="#4bff72" style={styles.smallIcon} />
                        <TextInput placeholder="Email" style={styles.textInput} onChangeText={handleEmail} />
                        {email.length < 1 ? null : emailVerify ?
                            <Feather name="check-circle" color='#68C39F' size={20} /> :
                            <Feather name="alert-triangle" color='#FFD700' size={20} />
                        }
                    </View>
                    {email.length < 1 ? null : emailVerify ? null :
                        <Text style={{ marginLeft: 20, color: 'red' }}>The email should be in this form xyz@xyz.com</Text>}

                    <View style={styles.action}>
                        <FontAwesome name="phone" color="#4bff72" style={styles.smallIcon} />
                        <TextInput placeholder="Mobile" style={styles.textInput} onChangeText={handleMobile} />
                        {mobile.length < 1 ? null : mobileVerify ?
                            <Feather name="check-circle" color='#68C39F' size={20} /> :
                            <Feather name="alert-triangle" color='#FFD700' size={20} />
                        }
                    </View>
                    {mobile.length < 1 ? null : mobileVerify ? null :
                        <Text style={{ marginLeft: 20, color: 'red' }}>The mobile number should be contain 10 digits</Text>}

                    <View style={styles.action}>
                        <FontAwesome name="lock" color="#4bff72" style={styles.smallIcon} />
                        <TextInput placeholder="Password" style={styles.textInput} onChangeText={handlePassword} />
                        {password.length < 1 ? null : passwordVerify ?
                            <Feather name="check-circle" color='#68C39F' size={20} /> :
                            <Feather name="alert-triangle" color='#FFD700' size={20} />
                        }
                    </View>
                    {password.length < 1 ? null : passwordVerify ? null :
                        <Text style={{ marginLeft: 20, color: 'red' }}>The password should be more than 5 caracters</Text>}

                </View>
                <View style={styles.button}>
                    <TouchableOpacity style={styles.inBut} onPress={handleRegister}>
                        <View>
                            <Text style={styles.textSign}>Register</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#919191', marginLeft: 80 }}>
                        ---You already have an acount---
                    </Text>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                        <Text style={{color:'#ff4b4b',fontWeight:'bold',fontSize:25,marginBottom:50}} >Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default Register;
