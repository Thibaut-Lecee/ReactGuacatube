import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    ScrollView,
    FlatList,
    SafeAreaView,
    ActivityIndicator,
    Pressable
} from "react-native";
import axios from "axios";
import base64 from 'react-native-base64'
import moment from "moment";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import VideoListItem from "./VideoListItem";
import styles from "./styles";
import VideoAccueil from "../VideoAccueil";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import videoComments from "../Commentaire/VideoComments";
import BottomSheet from "@gorhom/bottom-sheet";

const VideoScreen = () => {
    const [video, setVideo] = useState([]);
    const [videoAgo, setVideoAgo] = useState('');
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState('');
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [subscribers, setSubscribers] = useState(0);
    const handleLike = () => {
        if (likes < 0) {
            setLikes(0);
        }
        if (liked) {
            setLikes(likes - 1)
            setLiked(false)
        } else {
            setLikes(likes + 1)
            setLiked(true)
        }
        if (disliked === true) {
            setLiked(false)
            setLikes(likes)
        }
    }
    const handleDislike = () => {
        if (dislikes < 0) {
            setDislikes(0);
        }
        if (disliked) {
            setDislikes(dislikes - 1)
            setDisliked(false)
            setLiked(false)
        } else {
            setDislikes(dislikes + 1)
            setLikes(likes - 1)
            setDisliked(true)
            setLiked(false)
        }
        if (liked === true) {
            setDisliked(false)
            setDislikes(dislikes)
            setLiked(false)
        }
    }

    const getUser = async (userId) => {
        try {
            const response = await axios.get(`http://10.0.2.2:8000/api/user/${userId}/get`, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "application/json; charset=utf-8",
                }
            })
            setUsername(response.data.user.username)
        } catch (error) {
            console.log(error)
        }
    }

    const getSubscribers = async (userId) => {
        try {
            const response = await axios.get(`http://10.0.2.2:8000/api/user/${userId}/subscribers`, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "application/json; charset=utf-8",
                }
            })
            setSubscribers(response.data.subscribers)

        } catch (error) {
            console.log(error)

        }
    }

    const getVideo = async () => {
        try {
            const id = base64.encode('4');
            const response = await axios.get(`http://10.0.2.2:8000/api/video/4/get`, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "application/json; charset=utf-8",
                }
            })
            setVideo(response.data.video);
            response.data.video.created_at = moment.utc(response.data.video.created_at).local().startOf('seconds').fromNow();
            setVideoAgo(response.data.video.created_at)
            getSubscribers(response.data.video.user_id)
            getUser(response.data.video.user_id)
        } catch (error) {
            console.log(error, 'error')
        }
    }

    const commentsRef = useRef(null);
    // variables
    const snapPoints = useMemo(() => ['25%r', '50%', '100%'], []);
    // callbacks
    const openComments = () => {
        commentsRef.current.expand();
    }

    useEffect(() => {
        getVideo()
    }, [userId, username])

    return (

        <View style={{backgroundColor: '#141414', flex: 1}}>
            <VideoPlayer videoURI={video.video} rthumbnailURI={video.thumbnail}/>

            <View style={{flex: 1}}>
                <View style={styles.videoInfoContainer}>
                    <Text style={styles.tags}>#ReactNativeApp #ReactNative > #Flutter
                        #WhyFlutterWhenReactNative</Text>
                    <Text style={styles.title}>{video.title}</Text>
                    <Text style={styles.subtitle}>{video.description}</Text>
                    <Text style={styles.subtitle}>{username} - {videoAgo}</Text>
                </View>

                {/*    Action list */}
                <View style={styles.actionListContainer}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.actionListItem}>
                            {liked ?
                                <AntDesign name="like1" size={20} onPress={handleLike} color={"lightgrey"}/> :
                                <AntDesign name={'like2'} size={20} onPress={handleLike} color={'lightgrey'}/>}
                            <Text style={styles.actionText}>{liked ? likes : likes}</Text>
                        </View>
                        <View style={styles.actionListItem}>
                            {disliked ?
                                <AntDesign name="dislike1" size={20} onPress={handleDislike}
                                           color={"lightgrey"}/> :
                                <AntDesign name={'dislike2'} size={20} onPress={handleDislike}
                                           color={'lightgrey'}/>}
                            <Text style={styles.actionText}>{disliked ? dislikes : dislikes}</Text>
                        </View>
                        <View style={styles.actionListItem}>
                            <MaterialCommunityIcons name="share-outline" size={20} color={"lightgrey"}/>
                            <Text style={styles.actionText}>Share</Text>
                        </View>
                        <View style={styles.actionListItem}>
                            <MaterialCommunityIcons name="download-outline" size={20} color={"lightgrey"}/>
                            <Text style={styles.actionText}>Download</Text>
                        </View>
                        <View style={styles.actionListItem}>
                            <MaterialCommunityIcons name="youtube-subscription" size={20} color={"lightgrey"}/>
                            <Text style={styles.actionText}>Subscribe</Text>
                        </View>
                    </ScrollView>
                </View>

                {/*    user Info*/}
                <View style={{
                    flexDirection: 'row',
                    paddingVertical: 8,
                    alignItems: 'center',
                    borderColor: '#3d3d3d',
                    borderTopWidth: 1,
                    borderBottomWidth: 1
                }}>
                    <EvilIcons name={'user'} size={28} color={'lightgrey'}/>
                    <View style={{marginHorizontal: 10, flex: 1}}>
                        <Text style={{color: 'lightgrey', fontSize: 14, fontWeight: 'bold'}}>{username}</Text>
                        <Text style={{color: 'grey', fontSize: 14}}>{subscribers} subscribers</Text>
                    </View>
                    <Text style={{color: 'red', fontSize: 16, fontWeight: '600', padding: 10}}>Subscribe</Text>
                </View>

                {/*    Comments */}
                <Pressable onPress={openComments} style={{
                    padding: 4,
                    marginVertical: 4,
                }}>
                    <Text style={{color: 'grey', fontSize: 14, fontWeight: 'bold'}}>Comments</Text>
                    <View style={{flexDirection: 'row', marginVertical: 10, alignItems: 'center'}}>
                        <EvilIcons name={'user'} size={24} color={'lightgrey'}/>
                        <Text style={{color: 'lightgrey', marginLeft: 10}}>ReactNative</Text>
                    </View>
                </Pressable>
                {/*    All comments */}
                <BottomSheet
                    ref={commentsRef}
                    index={1}
                    enablePanDownToClose={true}
                    snapPoints={snapPoints}
                >
                    <View style={styles.contentContainer}>
                        <Text>Awesome 🎉</Text>
                    </View>
                </BottomSheet>
            </View>
        </View>
    );

};

const videoUnderScreen = () => {
    const [videosUnder, setVideosUnder] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [videoAgo, setVideoAgo] = React.useState('');
    const getVideoUnder = async () => {
        try {
            const response = await axios.get(`http://10.0.2.2:8000/api/video/all`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json; charset=utf-8',
                }
            })

            setVideosUnder(response.data.videos)

            setIsLoading(false);
        } catch (error) {
            console.log(error)
        }
    }
    React.useEffect(() => {
        getVideoUnder()
    }, [])
    return (
        <SafeAreaView style={{backgroundColor: "#141414"}}>
            {isLoading ? <ActivityIndicator size="large" color="#fff" style={{marginTop: 100}}/> :
                <FlatList data={videosUnder} keyExtractor={({id}, index) => id} renderItem={({item}) => (
                    <VideoListItem video={item} videoAgo={videoAgo}/>)}
                          ListHeaderComponent={VideoScreen}

                />}
        </SafeAreaView>
    )
}

export default videoUnderScreen;
