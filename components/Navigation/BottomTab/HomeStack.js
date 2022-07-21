import React from 'react';
import {View, Text, Image, SafeAreaView, Pressable} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../Accueil/Home';
import {Feather, AntDesign, FontAwesome} from '@expo/vector-icons';
import Home from "../../Accueil/Home";
import {useNavigation, useRoute} from "@react-navigation/native";
import Login from "../../Authentification/Login";
import Register from "../../Authentification/Register";
import SearchScreen from "../../Video/Search/SearchScreen";

const logo = require('../../../assets/logo.png');

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator();

function CustomHeader() {
    const navigation = useNavigation();

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
                    <Pressable onPress={() => navigation.navigate("Login")}>
                        <FontAwesome name="user-circle-o" size={22} color="white"/>
                    </Pressable>
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
        </HomeStack.Navigator>
    );
}

export default HomeStackComponent;
