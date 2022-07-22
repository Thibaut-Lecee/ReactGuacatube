/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import {
    Foundation,
    Ionicons,
    AntDesign,
    MaterialIcons,
} from "@expo/vector-icons";

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import * as React from "react";

import HomeStack from "./HomeStack";
import {useColorScheme} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";
import VideoScreen from "../../Video/VideoScreen/VideoScreen";
import Home from "../../Accueil/Home";
import Explore from "../../Video/VideoScreen/features/Explore";
import Subscriptions from "../../Video/VideoScreen/features/Subscriptions";
import VideoUploadScreen from "../../Video/VideoUpload/VideoUploadScreen";


const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            screenOptions={{
                activeTintColor: Colors[colorScheme].tint,
                labelPosition: "below-icon",
            }}>
            <BottomTab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    tabBarIcon: ({color}) => (
                        <Foundation name="home" size={24} color={color}/>
                    ),
                    headerTitle: 'React App'
                }}
            />
            <BottomTab.Screen
                name="Explore"
                component={Explore}
                options={{
                    tabBarIcon: ({color}) => (
                        <Ionicons name="compass-outline" size={24} color={color}/>
                    ),
                }}
            />
            <BottomTab.Screen
                name="New"
                component={VideoUploadScreen}
                options={{
                    tabBarIcon: ({color}) => (
                        <AntDesign name="pluscircleo" size={24} color={color}/>
                    ),
                    headerTitle: 'Upload Video'
                }}
            />
            {isAuthenticated ?
            <BottomTab.Screen
                name="Subscriptions"
                component={Subscriptions}
                options={{
                    tabBarIcon: ({color}) => (
                        <MaterialIcons name="subscriptions" size={24} color={color}/>
                    ),
                    headerTitle: 'Profile & Settings'
                }}
            /> : null}
        </BottomTab.Navigator>
    );
}




