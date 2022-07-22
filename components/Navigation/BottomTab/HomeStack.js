import React, {useEffect} from 'react';
import {View, Text, Image, SafeAreaView, Pressable} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../Accueil/Home';
import {Feather, AntDesign, FontAwesome} from '@expo/vector-icons';
import Home from "../../Accueil/Home";
import {useNavigation, useRoute} from "@react-navigation/native";
import Login from "../../Authentification/Login";
import Register from "../../Authentification/Register";
import SearchScreen from "../../Video/Search/SearchScreen";
import ProfileScreen from "../../User/ProfileScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const logo = require('../../../assets/logo.png');

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator();

function CustomHeader() {
    const navigation = useNavigation();
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const getUser = async () => {
        try {
            const savedUser = await AsyncStorage.getItem("user");
            if(savedUser !== null){
            const currentUser = JSON.parse(savedUser);
            console.log(currentUser);
            setIsAuthenticated(true);
            }
            else {
                setIsAuthenticated(false)
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getUser()
    }, [isAuthenticated]);
    return (
        <SafeAreaView style={{backgroundColor: '#141414'}}>
            <View
                style={{
                    margin: 5,
                    padding: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                <Pressable onPress={() => navigation.navigate('HomeStack')}>
                    <Image resizeMode="contain" style={{width: 25, height: 25}} source={logo}/>
                </Pressable>
                <View style={{flexDirection: 'row', width: 175, justifyContent: 'space-between'}}>
                    <Feather name="cast" size={22} color="white"/>
                    <AntDesign name="bells" size={22} color="white"/>
                    <Pressable onPress={() => navigation.navigate('Search')}>
                        <AntDesign name="search1" size={22} color="white"/>
                    </Pressable>
                    <>
                        {isAuthenticated ?
                            <Pressable onPress={() => navigation.navigate('Profile')}>
                                <FontAwesome name="user" size={22} color="white"/>
                            </Pressable> :
                            <Pressable onPress={() => navigation.navigate("Login")}>
                                <Text style={{color: 'white', fontSize: 18}}>Login</Text>
                            </Pressable>
                        }
                    </>
                </View>
            </View>
        </SafeAreaView>
    );
}

function HomeStackComponent() {
    return (
        <HomeStack.Navigator
            screenOptions={{
                header: () => <CustomHeader/>,
            }}
        >
            <HomeStack.Screen
                name="HomeStack"
                component={Home}
            />
            <HomeStack.Screen
                name='Login'
                component={Login}
            />
            <HomeStack.Screen
                name='Register'
                component={Register}
            /><HomeStack.Screen
            name='Search'
            component={SearchScreen}
        />
            <HomeStack.Screen
                name='Profile'
                component={ProfileScreen}
        options={{
            headerTitle: 'Profile'
        }}
            />
        </HomeStack.Navigator>
    );
}

export default HomeStackComponent;
