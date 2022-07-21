import React, {useEffect, useState} from 'react';
import {
    Image,
    ScrollView,
    View,
    StyleSheet,
    Text,
    Pressable,
    Button,
    useWindowDimensions,

} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios";
import {useForm, Controller} from "react-hook-form";
import CustomInput from "./CustomInput";
import {useNavigation, useRoute} from "@react-navigation/native";

const Login = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const {height} = useWindowDimensions();
    const navigation = useNavigation();
    const {control, handleSubmit, formState: {errors}} = useForm();
    const [message, setMessage] = useState()
    const [messageError, setMessageError] = useState(false)
    const [userId, setUserId] = useState('')
    const Authentification = async (data) => {
        try {
            // const response = await axios.post('http://83.114.163.44/api/auth/login', {
            //     email: data.email,
            //     password: data.password,
            // })
            const response = await axios.post('http://10.0.2.2:8000/api/auth/login', {
                email: data.email,
                password: data.password,
            })

            if (response.data.success === true) {
                setIsAuthenticated(true)
                navigation.navigate('HomeStack', {
                    isAuthenticated: true,
                })
                setUserId(response.data.id)
            } else {
                setMessageError(true)
                setMessage(response.data.error)
            }
        } catch (error) {
            //   set message if error
            console.log(error)
        }   //    ernestine86@example.com
    }
    const sendEmailVerification = async () => {
        console.log('sendEmailVerification')
    }

    const storeData = async (userId) => {
        try {
            console.log(userId)
            await AsyncStorage.setItem('userId', JSON.stringify(userId))
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>

            <View style={styles.container}>
                <Image source={require('../../assets/logo.png')} style={[styles.logo, {height: height * 0.1}]}
                       resizeMode={"contain"}/>
                <Text style={styles.title}>Login</Text>
                <CustomInput
                    placeholder={'Email'}
                    value={'email'}
                    control={control}
                    name={'email'}
                    rules={{
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: 'Invalid email address'
                        }
                    }}
                />
                <CustomInput
                    placeholder={'Password'}
                    control={control}
                    name={'password'}
                    rules={{
                        required: 'Password is required',
                        minLength: {value: 6, message: 'Password must be at least 6 characters'}
                    }}
                    secureTextEntry
                />

                <Pressable onPress={handleSubmit(Authentification)} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('Register')} style={styles.button}>
                    <Text style={styles.buttonText}>Pas de compte ? Enregistrez-vous ! </Text>
                </Pressable>
                {messageError ?
                    <>
                        <View style={{backgroundColor: 'red', width: '40%', height: 25, marginTop: 5}}>
                            <Text style={{
                                color: 'white',
                                fontSize: 14,
                                textAlign: 'center',
                                fontWeight: "bold"
                            }}>{message}</Text>
                        </View>
                        <Pressable style={styles.buttonResend} onPress={sendEmailVerification}>
                            <Text style={styles.buttonText}>Renvoyer un email de vérification</Text>
                        </Pressable>
                    </> :
                    null}
            </View>
        </ScrollView>

    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    title: {
        borderBottomColor: 'green',
        borderBottomWidth: 4,
        color: "white"
    },
    logo: {
        width: '30%',
        height: '25%',
    },
    button: {
        flexDirection: 'row',
        width: '40%',
        height: 40,
        elevation: 8,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 5,
    }, buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    }
    , buttonResend: {
        backgroundColor: 'red',
        width: '40%',
        height: 40,
        elevation: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 5,
    }
});

export default Login;
