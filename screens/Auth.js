import React, { useState } from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { images } from '../constants';

const API_URL = Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';

const AuthScreen = (props) => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [mailToken, setmailToken] = useState('');

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const onChangeHandler = () => {
        setIsLogin(!isLogin);
        setMessage('');
    };

    const onLoggedIn = async () => {
        const token = await getToken();
        console.log("token ==== > ", token);
        fetch(`${API_URL}/private`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(async res => {
                try {
                    const jsonRes = await res.json();
                    if (res.status === 200) {
                        setmailToken(jsonRes.data);
                        console.log(jsonRes);
                        setMessage(jsonRes.message);
                    }
                } catch (err) {
                    console.log(err);
                };
            })
            .catch(err => {
                console.log(err);
            });
    }

    const onSubmitHandler = () => {
        const payload = {
            email,
            name,
            password,
        };
        fetch(`${API_URL}/${isLogin ? 'login' : 'signup'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(async res => {
                try {
                    const jsonRes = await res.json();
                    if (res.status !== 200) {
                        setIsError(true);
                        setMessage(jsonRes.message);
                    } else {
                        onLoggedIn(jsonRes.token);
                        storeToken(jsonRes.token);
                        setIsError(false);
                        setMessage(jsonRes.message);
                        Alert.alert('Success', 'Signup Successfully', [
                            {
                                text: 'OK',
                                onPress: () => {
                                    if (isLogin) {
                                        props.navigation.navigate("Home")
                                    }
                                    else setIsLogin(!isLogin);
                                }
                            },

                        ]);
                    }
                } catch (err) {
                    console.log(err);
                };
            })
            .catch(err => {
                console.log(err);
            });
    };


    //  start get token by asyncStorage
    const storeToken = async (token) => {
        try {
            await AsyncStorage.setItem('token', token)
        } catch (e) {
            console.log("error");
            console.log(e);
        }
    }

    const getToken = async () => {
        try {
            return await AsyncStorage.getItem('token')
        } catch (e) {
            console.log(e);
        }
    }
    //  end get token by asyncStorage
    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
    }

    return (
        <ImageBackground source={require('../src/image/background.jpg')} style={styles.image} >
            <Image
                    style={styles.margin1}
                    size={300}
                    borderRadius={50}
                    source={images.logo_healthCare}
                    alt="logo"
                />
            <View style={styles.card}>
                <Text style={styles.heading}>{isLogin ? 'Login' : 'Signup'}</Text>
                <View style={styles.form}>
                    <View style={styles.inputs}>
                        <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={setEmail}></TextInput>
                        {!isLogin && <TextInput style={styles.input} placeholder="Name" onChangeText={setName}></TextInput>}
                        <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" onChangeText={setPassword}></TextInput>
                        <Text style={[styles.message, { color: isError ? 'red' : 'green' }]}>{message ? getMessage() : null}</Text>
                        <TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
                            <Text style={styles.buttonText}>Done</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonAlt} onPress={onChangeHandler}>
                            <Text style={styles.buttonAltText}>{isLogin ? 'Sign Up' : 'Log In'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    card: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: '80%',
        marginTop: '10%',
        borderRadius: 20,
        maxHeight: 380,
        paddingBottom: '30%',
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '10%',
        marginTop: '5%',
        marginBottom: '30%',
        color: 'black',
    },
    form: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: '5%',
    },
    inputs: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '10%',
    },
    input: {
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingTop: 10,
        fontSize: 16,
        minHeight: 40,
    },
    button: {
        width: '80%',
        backgroundColor: 'black',
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400'
    },
    buttonAlt: {
        width: '80%',
        borderWidth: 1,
        height: 40,
        borderRadius: 50,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonAltText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '400',
    },
    message: {
        fontSize: 16,
        marginVertical: '5%',
    },
    margin1: {
        width: 150,
        height: 150,
        marginTop: 50,
        marginBottom : 0,
        padding: 0,
    },
});

export default AuthScreen;