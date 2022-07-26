import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    ScrollView,
    FlatList,
    ActivityIndicator,
    Pressable
} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from "axios";
import base64 from 'react-native-base64'
import moment from "moment";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import VideoListItem from "./VideoListItem";
import styles from "./styles";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import BottomSheet, {BottomSheetModal, BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import VideoComments from "../Commentaire/VideoComments";
import {useRoute} from "@react-navigation/native";

const VideoScreen = () => {
    const route = useRoute();
    const id = route.params.id;
    const encode = base64.encode(String(id));
    const [video, setVideo] = useState([]);
    const [videoAgo, setVideoAgo] = useState('');
    const [username, setUsername] = useState('');
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [subscribers, setSubscribers] = useState(0);
    const [userImage, setUserImage] = useState('');
    const [avatarName, setAvatarName] = useState("");
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
    const getVideo = async (encode) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_REQUEST_SERVER}/api/video/${encode}/get`, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "application/json; charset=utf-8",
                    'Authorization': `Basic dGhsYzprZXk=`
                }
            })
            setVideo(response.data.video)
            let timeAgo = moment(response.data.video.created_at).local().startOf('seconds').fromNow();
            setVideoAgo(timeAgo)
            let encodedId = base64.encode(String(response.data.video.id));
            let encodedUserId = base64.encode(String(response.data.video.user_id));
            getSubscribers(encodedUserId)
            getUser(encodedUserId)
            getVideoStats(encodedId)

        } catch (error) {
            console.log(error, 'error')
        }
    }

    const getUser = async (userId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_REQUEST_SERVER}/api/user/${userId}/get`, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "application/json; charset=utf-8",
                    'Authorization': `Basic dGhsYzprZXk=`
                }
            })
            setAvatarName((response.data.user.first_name).substring(0, 1) + (response.data.user.last_name).substring(0, 1));
            setUsername(response.data.user.username);
            if (response.data.user.profile_image !== null) {
                setUserImage(response.data.user.profile_image)
            } else {
                setUserImage(response.data.user.color)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getSubscribers = async (userId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_REQUEST_SERVER}/api/user/${userId}/subscribers`, {
                headers: {
                    'Authorization': `Basic dGhsYzprZXk=`,
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "application/json; charset=utf-8",
                }
            })
            setSubscribers(response.data.subscribers)
        } catch (error) {
        }
    }


    const [nbrComments, setNbrComments] = useState(0);
    const [nbreLike, setNbreLike] = useState(0);
    const [nbreDislike, setNbreDislike] = useState(0);
    const [views, setViews] = useState(0);
    const getVideoStats = async (id) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_REQUEST_SERVER}/api/video/${id}/stats`,{
                headers: {
                    'Authorization': `Basic dGhsYzprZXk=`,
                }
            })
            setNbrComments(response.data.stats.comments)
            setNbreLike(response.data.stats.likes)
            setNbreDislike(response.data.stats.dislikes)
            setViews(response.data.stats.views)
        } catch (error) {
            console.log(error)
        }
    }
    const commentsRef = useRef(null);
    // variables
    const snapPoints = useMemo(() => ['68%'], []);
    // callbacks
    const openComments = () => {
        commentsRef.current.present();
    }

    useEffect(() => {
        getVideo(encode)
        getVideoStats(encode)
    }, [route.params.id])

    return (
        <View style={{backgroundColor: '#141414', flex: 1, marginBottom: 10}}>
            <VideoPlayer videoURI={`${process.env.REACT_APP_API_REQUEST_SERVER}/${video.video}`} thumbnailURI={video.thumbnail}/>
            <View style={{flex: 1}}>
                <View style={styles.videoInfoContainer}>
                    <Text style={styles.tags}>#ReactNativeApp #ReactNative > #Flutter
                        #WhyFlutterWhenReactNative</Text>
                    <Text style={styles.title}>{video.title}</Text>
                    <Text style={styles.subtitle}>{video.description}</Text>
                    <Text style={styles.subtitle}>Nombre de vues : {views}</Text>
                    <Text style={styles.subtitle}>{videoAgo}</Text>
                </View>

                {/*    Action list */}
                <View style={styles.actionListContainer}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.actionListItem}>
                            {liked ?
                                <AntDesign name="like1" size={20} onPress={handleLike} color={"lightgrey"}/> :
                                <AntDesign name={'like2'} size={20} onPress={handleLike} color={'lightgrey'}/>}
                            <Text style={styles.actionText}>{nbreLike}</Text>
                        </View>
                        <View style={styles.actionListItem}>
                            {disliked ?
                                <AntDesign name="dislike1" size={20} onPress={handleDislike}
                                           color={"lightgrey"}/> :
                                <AntDesign name={'dislike2'} size={20} onPress={handleDislike}
                                           color={'lightgrey'}/>}
                            <Text style={styles.actionText}>{nbreDislike}</Text>
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
                    <View style={{
                        backgroundColor: `${userImage}`,
                        elevation: 10,
                        width: 40,
                        height: 40,
                        borderRadius: 30,
                        alignItems: "center",
                        justifyContent: 'center'
                    }}>
                        <Text style={{color: '#fff'}}>{avatarName}
                        </Text>
                    </View>
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
                    borderColor: '#3d3d3d',
                }}>
                    <Text style={{color: 'grey', fontSize: 14, fontWeight: 'bold'}}>Comments : {nbrComments}</Text>
                </Pressable>
                {/*    All comments */}
                <BottomSheetModal
                    ref={commentsRef}
                    index={0}
                    enablePanDownToClose={true}
                    snapPoints={snapPoints}
                    backgroundComponent={({style}) => <View
                        style={[style, {backgroundColor: '#444444', borderRadius: 8, width: '100%'}]}/>}>
                    <VideoComments videoId={video.id}/>
                </BottomSheetModal>
            </View>
        </View>
    );
};

const VideoUnderScreen = () => {
    const [videosUnder, setVideosUnder] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [videoAgo, setVideoAgo] = React.useState('');
    const getVideoUnder = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_REQUEST_SERVER}/api/video/all`, {
                headers: {
                    'Authorization': `Basic dGhsYzprZXk=`,
                    "Content-Type": "application/json",

                }
            })
            // Object.keys(response.data.videos).map(function (key) {
            //         setVideosUnder(response.data.videos[key])
            // })
            setVideosUnder(Object.values(response.data.videos))
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
                <BottomSheetModalProvider>
                    <FlatList data={videosUnder} keyExtractor={(item) => item.id} renderItem={({item}) => (
                        <VideoListItem video={item} videoAgo={videoAgo}/>)}
                              ListHeaderComponent={VideoScreen}
                    />
                </BottomSheetModalProvider>}

        </SafeAreaView>
    )
}

export default VideoUnderScreen;
