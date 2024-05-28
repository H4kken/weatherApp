import { View, Text, ActivityIndicator } from "react-native"
import React from "react";
import { styles } from "../styles/Styles";

function Splash() {
    return (
        <View style={styles.container}>
            <Text>Loading Meteo</Text>
            <ActivityIndicator size="large" color="#001212" />
        </View>
    );
};

export default Splash;