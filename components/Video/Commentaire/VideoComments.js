import React, {useEffect} from 'react';
import {ActivityIndicator, FlatList, Text, View, StyleSheet, Image, ScrollView, Pressable} from "react-native";
import axios from "axios";
import {BottomSheetFlatList} from "@gorhom/bottom-sheet";
import VideoComment from "./VideoComment";
import moment from "moment";
import base64 from "react-native-base64";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useState} from "react/cjs/react.production.min";
import {useRoute} from "@react-navigation/native";
import CustomInput from "../../Authentification/CustomInput";
import {useForm} from "react-hook-form";
import {Feather} from "@expo/vector-icons";


const VideoComments = ({videoId}) => {
    const [showInput, setShowInput] = useState(false)
    const [comments, setComments] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = React.useState([]);
    const encodedVideoId = base64.encode(String(videoId));
    const {control, handleSubmit, formState: {errors}} = useForm()

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
                console.log(response.data.comments)
            }
            setLoading(false)
        } catch (error) {
            console.log(error.response)
        }
    }
    const Reply = () => {
        setShowInput(true)
    }

    const getUser = async () => {
        try {
            const savedUser = await AsyncStorage.getItem("user");
            const currentUser = JSON.parse(savedUser);
            const userId = base64.encode(String(currentUser.id))
            const user = await axios.get(`${process.env.REACT_APP_API_REQUEST_SERVER}/api/user/${userId}/get`, {
                headers: {
                    'Authorization': `Basic dGhsYzprZXk=`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json; charset=utf-8',
                }
            })
            setUser(user.data.user)
        } catch (error) {
            console.log(error);
        }
    }
    const postComment = async (data) => {
        const userId = base64.encode(String(user.id))
        try {
            const comment = await axios.post(`${process.env.REACT_APP_API_REQUEST_SERVER}/api/user/${userId}/comment/${encodedVideoId}`, {
                headers: {
                    'Authorization': `Basic dGhsYzprZXk=`,
                },
                comment: data.commentaire,
                user: userId,
                video: encodedVideoId
            })
            getVideoComments()
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getVideoComments();
        getUser()
    }, [videoId]);
    return (
        <View>
            {loading ? <ActivityIndicator size="large" color="#fff"/> :
                <FlatList data={comments} keyExtractor={(item, index) => item.id + index}
                          renderItem={({item, index}) => {
                              return (
                                  <ScrollView showsVerticalScrollIndicator={false}
                                              showsHorizontalScrollIndicator={false}>
                                          <View style={{flexDirection: "row", marginVertical: 5, width: "100%"}}>
                                              <>
                                                  <View style={{justifyContent: "flex-start", marginVertical: 5}}>
                                                      {item.profile_image !== null ?
                                                          <Image
                                                              source={{uri: `${process.env.REACT_APP_API_REQUEST_SERVER}/${item.profile_image}`}}
                                                              style={{width: 35, height: 35}}/>
                                                          :
                                                          <View style={{
                                                              backgroundColor: `${item.color}`,
                                                              paddingVertical: 8,
                                                              elevation: 10,
                                                              width: 30,
                                                              height: 30,
                                                              borderRadius: 35,
                                                              alignItems: "center",
                                                              justifyContent: "flex-start"
                                                          }}>
                                                              <Text style={{
                                                                  color: '#fff',
                                                                  textAlign: 'center',
                                                              }}>{item.first_name.substring(0, 1) + item.last_name.substring(0, 1)}</Text>
                                                          </View>
                                                      }
                                                  </View>
                                              </>
                                              <Text style={{
                                                  color: "#fff",
                                                  marginVertical: 12,
                                                  marginHorizontal: 8
                                              }}>{item.username} - {item.comment} - {moment(item.created_at).local().startOf('second').fromNow()}
                                              </Text>
                                          </View>
                                  </ScrollView>
                              )
                          }}
                />}
            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                <CustomInput placeholder={"Ajouter un commentaire"} rules={{
                    maxLength: 191,
                    required: "Comment required"
                }} control={control} value={'commentaire'} name={"commentaire"}/>
                <Feather name={"send"} style={{backgroundColor: "#fff", justifyContent: 'center', alignItems: "center"}}
                         size={26} onPress={handleSubmit(postComment)}/>
            </View>
        </View>
    )
};


export default VideoComments;

