import React from 'react';
import {FlatList, Text, View} from "react-native";
import axios from "axios";
import {instanceRequest} from "../../instanceRequest";
import moment from 'moment';
import VideoListItem from "./VideoScreen/VideoListItem";

const VideoAccueil = () => {
    const [videos, setVideos] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [videoAgo, setVideoAgo] = React.useState('');
    const getAllVideos = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_REQUEST_SERVER}/api/video/all`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json; charset=utf-8',
                }, params: {
                    page: 1,
                    limit: 20,
                }
            })
            setVideos(Object.values(response.data.videos));

            setIsLoading(false);
        } catch (error) {
            console.log(error)
        }
    }
    React.useEffect(() => {
        getAllVideos()
    }, [])

    return (
        <View>
            {isLoading ? <Text>Loading...</Text> : (
                <FlatList data={videos}  keyExtractor={(item) => item.id} renderItem={({item}) => (
                    <VideoListItem video={item} videoAgo={videoAgo}/>
                )}
                />
            )}
        </View>
    );
};

export default VideoAccueil;
