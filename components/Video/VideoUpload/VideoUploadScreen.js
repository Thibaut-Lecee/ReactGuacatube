import React, {useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, Button, ScrollView} from "react-native";
import * as ImagePicker from "expo-image-picker";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import * as MediaLibrary from "expo-media-library";
import CustomInput from "../../Authentification/CustomInput";
import {useForm} from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import base64 from "react-native-base64";
import picker from "react-native-web/dist/exports/Picker";
import {FileSystem} from "expo";
// import storageData from "../../Storage/LocalStorage";

const VideoUploadScreen = () => {

    const [video, setVideo] = React.useState('');
    const {control, handleSubmit, formState: {errors}, watch} = useForm()

    const getUser = async () => {
        try {
            const savedUser = await AsyncStorage.getItem("user");
            const currentUser = JSON.parse(savedUser);
            console.log(currentUser);
        } catch (error) {
            console.log(error);
        }
    };

    let openVideoPickerAsync = async (data) => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            quality: 1,
            contentType: "video/mp4",
        });
        if (!pickerResult.cancelled) {
            setVideo(pickerResult.uri);

            let userId = base64.encode('1')
            try {
                const uploadVideo = await axios.post(`${process.env.REACT_APP_API_REQUEST_SERVER}/api/user/${userId}/video/upload`, {
                    video: pickerResult.uri,
                    title: data.title,
                    description: data.description,
                    tags: data.tags,
                    category: data.category,
                    type: data.type,
                })
                console.log(uploadVideo.data, 'uploadVideo')
            } catch (error) {
                console.log(error.response.data, 'error')
            }

        } else {
            console.log("cancelled")
        }
    }

    useEffect(() => {
        getUser()
    }, [])
    return (
        <ScrollView>
            <View style={styles.container}>
                <Image source={{uri: 'https://i.imgur.com/TkIrScD.png'}} style={styles.logo}/>
                <Text style={styles.instructions}>
                    To share a video from your phone with a friend, just press the button below!
                </Text>
                <CustomInput name={'title'} placeholder={'Title'} control={control}
                             rules={{required: 'title is required'}}/>
                <CustomInput name={'description'} placeholder={'Description'} control={control}
                             rules={{required: 'description is required'}}/>
                <CustomInput name={'tags'} placeholder={'Tags #XXX, #XXX'} control={control}/>
                <CustomInput name={'category'} placeholder={'Category'} control={control}
                             rules={{required: 'category is required'}}/>
                <CustomInput name={'type'} placeholder={'type : public || private '} control={control}
                             rules={{required: 'type is required'}}/>
                <Button title={"Upload a video"} onPress={handleSubmit(openVideoPickerAsync)} style={styles.button}/>
                <VideoPlayer videoURI={video}/>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    thumbnail: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    button: {
        backgroundColor: '#1c313a',
        borderRadius: 10,
        height: 50,
        width: 200,
    }

})
export default VideoUploadScreen;
