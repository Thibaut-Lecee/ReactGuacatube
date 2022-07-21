import React, {useEffect} from 'react';
import {TextInput, StyleSheet, Text, View} from "react-native";
import {Controller} from "react-hook-form";
import {AsyncStorage} from "@react-native-async-storage/async-storage";

const CustomInput = ({control, name, rules = {}, placeholder, secureTextEntry}) => {
    return (
        <Controller style={styles.container}
                    control={control}
                    name={name}
                    rules={rules}
                    render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
                        <>
                            <View style={styles.container}>
                                <TextInput style={[styles.input, {borderColor: error ? 'red' : 'green'}]}
                                           value={value}
                                           onChangeText={onChange}
                                           onBlur={onBlur}
                                           placeholder={placeholder}
                                           secureTextEntry={secureTextEntry}/>
                                {error &&
                                    <Text  style={styles.error}>{error.message || "Error"}</Text>
                                }
                            </View>
                        </>
                    )}/>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '70%',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    input: {
        paddingHorizontal: 10,
        backgroundColor: "#e8e8e8",
        borderColor: "white",
        marginVertical: 10,
        textAlign: 'center',
        borderWidth: 2,
        borderRadius: 5,
        width: '60%'
    }, error: {
        textAlign: 'center',
        color: 'red',
        alignSelf: 'stretch',

    }
});

export default CustomInput;
