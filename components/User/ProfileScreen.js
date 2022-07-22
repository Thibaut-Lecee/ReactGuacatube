import React, {useEffect} from 'react';
import {Pressable, Text, View, StyleSheet} from "react-native";
import storageData from "../Storage/LocalStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import base64 from "react-native-base64";
import {useNavigation} from "@react-navigation/native";
import {Image} from "react-native-web/dist";

const ProfileScreen = () => {
    const [user, setUser] = React.useState([]);
    const navigation = useNavigation();
    const getUser = async () => {
        try {
            const savedUser = await AsyncStorage.getItem("user");
            const currentUser = JSON.parse(savedUser);
            console.log(currentUser);
            const userId = base64.encode(String(currentUser.id))
            const user = await axios.get(`${process.env.REACT_APP_API_REQUEST_SERVER}/api/user/${userId}/get`, {
                headers: {
                    'Authorization': `Basic dGhsYzprZXk=`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json; charset=utf-8',
                }
            })
            setUser(user.data.user)
            console.log(user.data.user, 'user')
        } catch (error) {
            console.log(error);
        }
    }

    const logout = async () => {
        try {
            await AsyncStorage.removeItem("user");
            navigation.navigate('Login');

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getUser()
    }, [])


    useEffect(() => {
    }, [])
    return (
        <View style={{flex: 1, backgroundColor: "#141414"}}>
            <View style={{justifyContent: "center"}}>
                        <View style={{
                            paddingVertical: 8,
                            alignItems: 'center',
                            borderColor: '#3d3d3d',
                            marginVertical: 5,
                        }}>
            <Text style={styles.text}>ProfileScreen</Text>
                            {user.banner_image !== null ?
                                <Image />
                                :
                            <View style={{
                                backgroundColor: `${user.color}`,
                                elevation: 10,
                                width: 40,
                                height: 40,
                                borderRadius: 30,
                                alignItems: "center",
                                justifyContent: 'center'
                            }}>
                            <Text style={{color: 'white'}}>{user.first_name}</Text>
                            </View>
                             }
                        </View>
                <Pressable style={styles.button} onPress={logout}>
                    <Text style={styles.buttonText}>Logout</Text>
                </Pressable>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    text: {
        color: "white",
        fontSize: 12,
        marginBottom: 5,
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
        color: "#fff",
        fontSize: 12
    }

})

export default ProfileScreen;
