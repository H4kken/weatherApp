import { View, Text, ActivityIndicator } from "react-native"
import React from "react";
import { styles } from "../styles/Styles";
import LinearGradient from "react-native-linear-gradient";

function Splash() {
    return (
        <LinearGradient 
            colors={["#FF9A9E", "#FAD0C4"]} 
            style={styles.container}
        >
            <View>
                <Text>Loading Meteo</Text>
                <ActivityIndicator size="large" color="#001212" />
            </View>
        </LinearGradient>
    );
};

export default Splash;