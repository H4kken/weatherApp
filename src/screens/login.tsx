import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, Alert, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import { FIREBASE_APP } from "../../FirebaseConfig";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { styles } from "../styles/Styles";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const auth = getAuth(FIREBASE_APP);

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error : any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const signUp = async () => {
        // Add regex for email and password
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error : any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.backgroundContainer}>
            <KeyboardAvoidingView behavior="padding">
                {/* Email */}
                <TextInput 
                    value={email}
                    style={styles.input} 
                    placeholder="Email" 
                    autoCapitalize="none"
                    onChangeText={(text) => setEmail(text)}
                ></TextInput>
                {/* Password */}
                <TextInput 
                    value={password}
                    style={styles.input} 
                    secureTextEntry={true}
                    placeholder="Password" 
                    autoCapitalize="none"
                    onChangeText={(text) => setPassword(text)}
                ></TextInput>
                {/* Login button dependant on loading */}
                { loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <>
                        <Button title="Login" onPress={signIn} />
                        <Button title="Create Account" onPress={signUp} />
                    </>
                )}
            </KeyboardAvoidingView>
        </View>
    );
};

export default Login;
