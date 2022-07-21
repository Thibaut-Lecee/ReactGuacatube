import React from 'react';
import {TextInput, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

const SearchScreen = () => {
    const [search, setSearch] = React.useState("");
    //regarder pour chercher dans les titles de toutes les vidéos
    //Genre dans un if(value input === item.title)
    //Mais demande trop de précision sinon faire une route pour
    return (
        <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', backgroundColor: "#141414",elevation:5, padding: 5, alignItems: "center", justifyContent: "space-around"}}>
                <Ionicons name="chevron-back" size={24} color="#e1e1e1"/>
                <TextInput onChangeText={(text) => setSearch(text)}
                           style={{
                    backgroundColor: "#323232",
                    borderRadius: 2,
                    padding: 10,
                    margin: 10,
                    fontSize: 11,
                    color: "white",
                    width: "70%",
                    height: 35,
                           }}
                           placeholder="Rechercher sur Guacatube"
                           value={search}
                />

            </View>
        </View>
    );
};

export default SearchScreen;
