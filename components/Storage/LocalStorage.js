import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function storageData() {
    try {
        const savedUser = await AsyncStorage.getItem("user");
        const currentUser = JSON.parse(savedUser);
        console.log(currentUser);
    } catch (error) {
        console.log(error);
    }
}
