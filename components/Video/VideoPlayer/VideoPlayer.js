import React from 'react';
import {ResizeMode, Video} from 'expo-av';
import {Dimensions, Text, View} from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
const VideoPlayer = ({videoURI, thumbnailURI}) => {
    // gérer le passage en full screen landscape ou le full screen portait en fonction de l'orientation de l'écran
    return (
        <View>
            <Video
                source={{uri: videoURI}}
                style={{width: Dimensions.get('window').width, aspectRatio: 16 / 9}}
                posterSource={{uri: thumbnailURI}}
                shouldPlay={true}
                posterStyle={{resizeMode: ResizeMode.COVER,}}
                resizeMode={ResizeMode.CONTAIN}
                usePoster={true}
                // onFullscreenUpdate={() => {
                //     if (Dimensions.get('window').height > Dimensions.get('window').width) {
                //         //Device is in portrait mode, rotate to landscape mode.
                //         ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
                //     }
                //     else {
                //         //Device is in landscape mode, rotate to portrait mode.
                //         ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
                //     }
                // }}
                useNativeControls={true}
            />
        </View>
    );
};

export default VideoPlayer;
