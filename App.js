import {GestureHandlerRootView} from "react-native-gesture-handler";
import Navigation from "./components/Navigation/BottomTab";

export default function App() {
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <Navigation colorScheme={'dark'}/>
        </GestureHandlerRootView>
    );
}


