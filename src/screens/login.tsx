import { View, Text, TextInput, ActivityIndicator, Button, Alert, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import { FIREBASE_APP } from "../../FirebaseConfig";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import LinearGradient from 'react-native-linear-gradient';
import { styles } from "../styles/Styles";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const auth = getAuth(FIREBASE_APP);

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) {
            console.log(error);
            setError("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) {
            console.log(error);
            setError("Error creating account");
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient 
            colors={["#FF9A9E", "#FAD0C4"]} 
            style={styles.backgroundContainer}
        >
            <View
                style={styles.gap}    
            >
                <Text style={styles.title}>
                    METEO
                </Text>
                <Text style={styles.infos}>
                    Welcome to your new meteo app, where you will see the current meteo based on OpenWeather's data
                </Text>
            </View>
            <KeyboardAvoidingView 
                behavior="padding"
                style={styles.gap}
            >
                <View>
                    {/* Email */}
                    <TextInput
                        value={email}
                        style={styles.input}
                        placeholder="Email"
                        autoCapitalize="none"
                        onChangeText={(text) => setEmail(text)}
                    />
                    {/* Password */}
                    <TextInput
                        value={password}
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Password"
                        autoCapitalize="none"
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>
                
                {/* Error message */}
                {error ? <Text style={styles.error}>{error}</Text> : null}
                {/* Login button dependant on loading */}
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <View style={styles.smallGap}>
                        <Button title="Login" onPress={signIn} />
                        <Button title="Create Account" onPress={signUp} />
                    </View>
                )}
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};

export default Login;
