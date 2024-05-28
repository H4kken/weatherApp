import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Home = ({ navigation }: RouterProps) => {
    const [meteoJson, setMeteoJson] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        requestLocationPermission();
        fetchMeteoCurrentLocation()
            .then(data => {
                setMeteoJson(data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    async function requestLocationPermission() {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('Location permission granted');
                } else {
                    console.log('Location permission denied');
                }
            } catch (err) {
                console.warn(err);
            }
        } else {
            Geolocation.requestAuthorization();
        }
    }

    async function fetchMeteoCurrentLocation(): Promise<any> {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

                    const apiKey = '8cfe2efbcc0ae4915b803edcdb2c8f71';
                    const apiLink = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

                    fetch(apiLink)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            resolve(data);
                        })
                        .catch(error => {
                            console.error(error);
                            reject(error);
                        });
                },
                error => {
                    console.log(error);
                    reject(error);
                },
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        });
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <Text>{meteoJson && meteoJson.main.temp} degrès celsius</Text>
                    <Button onPress={() => navigation.navigate('Details')} title="Open Details" />
                    <Button onPress={() => FIREBASE_AUTH.signOut()} title="Log out" />
                </>
            )}
        </View>
    );
};

export default Home;
