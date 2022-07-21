import React from 'react';
import {Image, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useForm} from "react-hook-form";
import CustomInput from "./CustomInput";
import axios from "axios";
import {AsyncStorage} from "@react-native-async-storage/async-storage";
import ColorPicker from "react-native-wheel-color-picker";

const Register = () => {
    const navigation = useNavigation();
    const {height} = useWindowDimensions();
    const {control, handleSubmit, formState: {errors}, watch} = useForm()
    const pwdConfirm = watch('password')
    const emailConfirm = watch('email')
    const [colorUser, setColorUser] = React.useState('#000000')
    const Register = async (data) => {
        try {
            const register = await axios.post(`${process.env.REACT_APP_API_REQUEST_SERVER}/api/auth/register`, {
                email: data.email,
                password: data.password,
                color: colorUser,
                password_confirmation: data.confirm_password,
                first_name: data.first_name,
                last_name: data.last_name,
                username: data.username,
            })
            if (register.data.success === true) {
                navigation.navigate('Login', {
                    email: data.email,
                })
                await AsyncStorage.setItem('email', emailConfirm)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Image source={require('../../assets/logo.png')} style={[styles.logo, {height: height * 0.1}]}
                       resizeMode={"contain"}/>
                <Text style={styles.title}>Register</Text>
                <ColorPicker thumbSize={20} sliderSize={5}   onColorChange={(color) => {
                    setColorUser(color)
                }}/>
                <CustomInput
                    placeholder={'Email'}
                    control={control}
                    name={'email'}
                    rules={{
                        required: 'Email is required',
                        maxLength: {value: 191, message: 'Email must be less than 191 characters'},
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: 'Invalid email address'
                        }
                    }}
                />
                <CustomInput
                    placeholder={'First name'}
                    control={control}
                    name={'first_name'}
                    rules={{
                        required: 'first name is required',
                    }}
                />
                <CustomInput
                    placeholder={'Last name'}
                    control={control}
                    name={'last_name'}
                    rules={{
                        required: 'last name is required',
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
                <CustomInput
                    placeholder={'confirm_password'}
                    control={control}
                    name={'confirm_password'}
                    rules={{
                        required: 'confirm password is required',
                        minLength: {value: 6, message: 'Password must be at least 6 characters'},
                        validate: (value) => value === pwdConfirm || 'Passwords do not match'
                    }}
                    secureTextEntry
                />
                <CustomInput
                    placeholder={'Username'}
                    control={control}
                    name={'username'}
                    rules={{
                        required: 'username is required',
                    }}
                />
                <Pressable onPress={handleSubmit(Register)} style={styles.button}>
                    <Text style={styles.buttonText}>Register</Text>
                </Pressable>
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
        padding: 5,
        marginTop: 2,
        marginBottom: 2,
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
        width: 100,
        height: 40,
        elevation: 8,
        backgroundColor: '#0094e3',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 5,
    }, buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default Register;
