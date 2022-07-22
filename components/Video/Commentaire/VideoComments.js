import React, {useEffect} from 'react';
import {ActivityIndicator, FlatList, Text, View, StyleSheet} from "react-native";
import axios from "axios";
import {BottomSheetFlatList} from "@gorhom/bottom-sheet";
import VideoComment from "./VideoComment";
import moment from "moment";
import base64 from "react-native-base64";
import {Image} from "react-native-web/dist";

const VideoComments = ({videoId}) => {
    const [comments, setComments] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [users, setUsers] = React.useState([]);
    const encodedVideoId = base64.encode(String(videoId));
    const getVideoComments = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_REQUEST_SERVER}/api/video/${encodedVideoId}/comments`, {
                headers: {
                    'Authorization': `Basic dGhsYzprZXk=`,
                    'Content-Type': 'application/json'
                }
            })
            if (response.data.comments.length > 0) {
                setComments(response.data.comments)
            }
            setLoading(false)
        } catch (error) {
            console.log(error.response)
        }
    }
    useEffect(() => {
        getVideoComments();
    }, [videoId]);
    return (
        <View style={{backgroundColor: "#141414", flex: 1}}>
            {loading ? <ActivityIndicator size="large" color="#fff"/> :
                <FlatList data={comments} keyExtractor={(item, index) => item.id} renderItem={({item}) => {
                    return (
                        <View style={{flexDirection: 'row', width: '90%'}}>
                            <>
                                {item.profile_image !== null ?
                                    <Image style={styles.thumbnail}
                                        src={{uri: `${process.env.REACT_APP_API_REQUEST_SERVER}/${item.banner_image}`}}/> :

                                    <View style={{backgroundColor: `${item.color}`,paddingVertical: 8, elevation: 10, width: 35, height: 30, borderRadius: 35, alignItems: "center", justifyContent: 'center'}}>
                                        <Text style={{color: '#fff', textAlign: 'center'}}>{item.first_name.substring(0,1) + item.last_name.substring(0,1)}</Text>
                                    </View>
                                }
                            </>
                            <Text style={{
                                color: "#fff",
                                marginVertical: 3,
                                marginHorizontal: 2
                            }}>{item.comment} - {moment(item.created_at).local().startOf('second').fromNow()} </Text>
                        </View>
                    )
                }}
                />}
        </View>
    )
};

const styles = StyleSheet.create ({
    thumbnail : {
        width: 30,
        height: 30
    }

})

export default VideoComments;

