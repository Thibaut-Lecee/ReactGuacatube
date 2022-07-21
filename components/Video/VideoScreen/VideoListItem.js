import React, {useRef, useState} from 'react';
import {Text, View, StyleSheet, Image, Pressable, ScrollView} from "react-native";
import {useNavigation} from "@react-navigation/native";

const VideoListItem = ({video, videoAgo}) => {
    const navigation = useNavigation();

    const openVideoPage = () => {
        navigation.navigate("VideoScreen", {
            id: video.id
        });

    }
    return (
        <View style={styles.container}>
            <Pressable onPress={openVideoPage} style={styles.videoCard}>
                {/*Container image and timer */}
                <View>
                    <Image source={{uri: `${process.env.REACT_APP_API_REQUEST_SERVER}/${video.thumbnail}`}} style={styles.thumbnail}/>
                    <View style={styles.timeContainer}>
                        <Text style={styles.time}>{video.duration} secondes</Text>
                    </View>
                </View>


                {/*Container informations video */}
                <View style={styles.titleRow}>
                    {/* <Image source={{uri: user.avatar}} /> */}
                    <View style={styles.middleContainer}>
                        <Text style={styles.title}>{video.title}</Text>
                        <Text style={styles.subtitle}>{video.description} </Text>
                    </View>
                </View>
            </Pressable>
        </View>

    );

};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
    },
    videoCard: {},
    thumbnail: {
        width: '100%',
        height: 16 / 9 * 100,
    }, timeContainer: {
        backgroundColor: '#00000099',
        height: 25,
        width: 80,
        position: 'absolute',
        bottom: 5,
        right: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
    }, time: {
        fontSize: 11,
        textAlign: 'right',
        color: 'white',
    },
    titleRow: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#212121',

    },
    middleContainer: {
        marginHorizontal: 10,
        flex: 1,
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 2,
    }, subtitle: {
        color: 'grey',
        fontSize: 12,
    }
});


export default VideoListItem;
