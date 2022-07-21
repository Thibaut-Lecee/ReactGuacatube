import React, {useEffect} from 'react';
import {ActivityIndicator, FlatList, Text, View} from "react-native";
import axios from "axios";
import {BottomSheetFlatList} from "@gorhom/bottom-sheet";
import VideoComment from "./VideoComment";
import moment from "moment";
import base64 from "react-native-base64";

const VideoComments = ({videoId}) => {
    const [comments, setComments] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [users, setUsers] = React.useState([]);
    const [userId, setUserId] = React.useState([]);
    const encodedVideoId = base64.encode(String(videoId));

    const getUsers = async (id) => {
        return users.filter(user => user.id === id)
    }

    const getVideoComments = async () => {
        try {
            const response = await axios.get(`http://83.114.163.44/api/video/${encodedVideoId}/comments`)
            if (response.data.comments.length > 0) {
                setComments(response.data.comments)
            } else {
                setComments([])
            }
            let userId = []
            response.data.comments.map(comment => {
                userId.push(base64.encode(String(comment.user_id)))
            })
            await Promise.all(userId.map(async (id) => {
                const response = await axios.get(`http://83.114.163.44/api/user/${id}/get`);
                setUsers(users => [...users, response.data.user])

            }))
            setLoading(false)
        } catch (error) {
            console.log(error)
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
                            <Text style={{
                                color: "#fff",
                                marginVertical: 2,
                            }}>{item.comment} - {moment(item.created_at).local().startOf('second').fromNow()} </Text>
                            {/*<Text style={{*/}
                            {/*    color: "#fff",*/}
                            {/*    marginVertical: 2,*/}
                            {/*}}>{getUsers(item.user_id)[0]}</Text>*/}
                        </View>
                    )
                }}
                />}
        </View>
    )
};

export default VideoComments;

