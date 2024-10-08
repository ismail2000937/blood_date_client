import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity, Image, BackHandler, Alert, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MobileIcon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import local from '../config/key'

const AdminLogout = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const res = await axios.post(local + '/users/userdata', { token: token });

                setUserData(res.data.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchData();
    }, []);


    const handleLogout = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(local + '/users/logout', null, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200) {
                AsyncStorage.removeItem('token');
                AsyncStorage.removeItem('isLoggedIn');

                navigation.navigate("Login");
                // navigation.navigate({'Login'});

            } else {
                console.error('Erreur lors de la déconnexion:', response.data);
                Alert.alert('Erreur lors de la déconnexion. Veuillez réessayer.');
            }
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
            Alert.alert('Erreur lors de la déconnexion. Veuillez réessayer.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={{ position: 'relative' }}>

                    <Image
                        source={require('../../assets/give_hand.jpg')}
                        width={100}
                        height={200}
                        resizeMode="contain"
                        style={{
                            marginTop: -150,
                        }}
                    />
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Avatar.Image
                        size={180}
                        style={styles.avatar}
                        source={require('../../assets/avatar.jpg')}
                    />
                </View>
                <View style={{ marginTop: -50 }}>
                    <Text style={styles.nameText}>{userData.firstName} {userData.lastName}</Text>
                </View>

                <View style={{ marginTop: 20, marginHorizontal: 25 }}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Logout</Text>
                        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                            <FontAwesome name="sign-out" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                    <UserInfo icon={<EmailIcon name="email" size={24} style={{ color: 'white' }} />} label="Email" value={userData.email} />
                    <UserInfo icon={<MobileIcon name="mobile" size={24} style={{ color: 'white' }} />} label="Mobile" value={userData.mobile} />
                </View>
            </View>
        </SafeAreaView>
    );
};

const UserInfo = ({ icon, label, value }) => {
    return (
        <SafeAreaView style={styles.infoMain}>
            <View style={styles.infoCont}>
                <View style={[styles.infoIconCont, { backgroundColor: '#000' }]}>{icon}</View>
                <View style={styles.infoText}>
                    <Text style={styles.infoSmall_Text}>{label}</Text>
                    <Text style={styles.infoLarge_Text}>{value}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    editIcon: {
        zIndex: 1,
        color: 'white',
        position: 'absolute',
        right: 2,
        margin: 15,
    },
    title: {
        fontSize: 30,
        fontWeight: '500'
    },
    backIcon: {
        zIndex: 1,
        color: 'white',
        position: 'absolute',
        left: 2,
        margin: 15,
    },
    avatar: {
        borderRadius: 100,
        marginTop: -250,
        // marginLeft: 105,
        backgroundColor: 'white',
        height: 200,
        width: 200,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        elevation: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: '#064868',
        padding: 10,
        borderRadius: 5,
    },
    nameText: {
        color: 'black',
        fontSize: 28,

        fontStyle: 'normal',
        // fontFamily: 'Open Sans',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    bookCountMain: {
        borderColor: '#b0b0b0',
        borderWidth: 1,
        marginTop: 18,
        marginHorizontal: 20,

        borderRadius: 20,
        flexDirection: 'row',
        width: '88%',
    },
    bookCount: {
        width: '50%',
        borderColor: '#b0b0b0',
        borderRightWidth: 1,
        flexDirection: 'column',
        paddingHorizontal: 10,
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookCountNum: {

        color: '#5D01AA',
        fontSize: 34,
        fontWeight: '800',
    },
    bookCountText: {
        color: '#b3b3b3',
        fontSize: 14,
        fontWeight: '500'
    },
    infoMain: {
        marginTop: 10,
    },
    infoCont: {
        width: '100%',
        flexDirection: 'row',
    },
    infoIconCont: {
        justifyContent: 'center',
        height: 40,
        width: 40,
        borderRadius: 20,

        alignItems: 'center',
        elevation: -5,
        borderColor: 'black',
        backgroundColor: 'black',
    },

    infoText: {
        width: '80%',
        flexDirection: 'column',
        marginLeft: 25,
        borderBottomWidth: 1,
        paddingBottom: 10,
        borderColor: '#e6e6e6',
    },
    infoSmall_Text: {
        fontSize: 13,
        color: '#b3b3b3',
        fontWeight: '500',
    },
    infoLarge_Text: {
        color: 'black',
        fontSize: 18,
        fontWeight: '600',
    },
    booksUploadedMain: {
        paddingHorizontal: 10,
        paddingBottom: 30,
        marginTop: 20,
    },
    flatlistDiv: {
        borderRadius: 15,
        paddingHorizontal: 10,
    },
    booksUploadedText: {
        fontSize: 26,
        color: 'black',
        fontWeight: '700',
        paddingLeft: 20,
        paddingBottom: 8,
    },
    booksUploadedCard: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 9,
        marginBottom: 9,

        backgroundColor: '#f2f2f2',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 15,
        elevation: 3,
    },
    booksUploadedImgDiv: {
        width: '28%',
    },
    booksUploadedImg: {
        width: '100%',
        height: 120,
        borderRadius: 15,
    },
    cardMidDiv: {
        paddingHorizontal: 10,
        width: '55%',
        position: 'relative',
    },
    approvedText: {
        fontSize: 12,
        color: '#0d7313',
        fontWeight: '600',
        marginLeft: 5,
    },
    cardBookNameText: {
        fontSize: 24,
        color: 'black',
        fontWeight: '700',
        marginTop: 2,
    },
    cardBookAuthor: {
        fontSize: 14,
        color: 'black',
        fontWeight: '600',
        marginTop: 1,
    },
    cardRating: {
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 10,
        flexDirection: 'row',
    },
    cardRatingCount: {
        fontSize: 14,
        marginTop: -2,
        paddingLeft: 4,
        color: '#303030',
    },
    cardEditDiv: {
        width: '17%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardEditBtn: {
        height: 44,
        width: 44,
        backgroundColor: '#774BBC',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        padding: 10,
        justifyContent: 'center',

        flexDirection: 'row',
    },
    loadMoreBtn: {
        padding: 10,
        backgroundColor: '#f5a002',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        paddingHorizontal: 20,
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
        fontWeight: '600',
    },
});
export default AdminLogout;