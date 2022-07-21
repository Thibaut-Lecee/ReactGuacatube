import React, {useEffect} from 'react';
import {FlatList, Text, View} from "react-native";
import axios from "axios";
import objects from "react-native-web/dist/exports/StyleSheet/ReactNativePropRegistry";
import moment from "moment";

const VideoComment = ({comments}) => {
    const [commentUser, setCommentUser] = React.useState([]);
    const [user, setUser] = React.useState([]);
    const [commentAgo, setCommentAgo] = React.useState('');
    useEffect(() => {
        Object.values(comments).map(comment => {
            let timeAgo = moment(comment.created_at).local().startOf('seconds').fromNow();
            setCommentAgo(timeAgo);
            // axios.get(`http://10.0.2.2:8000/api/user/${comment.user_id}/get`)
            //     .then(response => {
            //         // console.log(Object.assign(comment, {user: response.data.user}));
            //     })
        })

    }, []);
    return (
        <View style={{backgroundColor: "#141414"}}>


        </View>


    );
};

export default VideoComment;
