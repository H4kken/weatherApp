import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, PermissionsAndroid, Platform, Image, Dimensions } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { storage } from '../App';
import { styles } from '../styles/Styles';
import NetInfo from '@react-native-community/netinfo';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';

const { width, height } = Dimensions.get('window');

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const API_KEY = '8cfe2efbcc0ae4915b803edcdb2c8f71';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Function to save the JSON to storage
export const saveMeteoJson = (meteoJson: JSON) => {
  storage.set('meteoJson', JSON.stringify(meteoJson));
};

// Function to retrieve JSON object from MMKV storage
export const getMeteoJson = () => {
  const meteoJsonString = storage.getString('meteoJson');
  if (meteoJsonString) {
    // JSON object already exists in storage, return it
    return JSON.parse(meteoJsonString);
  } else {
    // JSON object does not exist in storage, return null or fetch it from API
    return null;
  }
};

export const getBackgroundColor = (weatherDescription: string, iconCode: string, temperature: number) => {
  const maxTemp = 40;
  const minTemp = -10;
  const tempRatio = (temperature - minTemp) / (maxTemp - minTemp);

  let startColor1, endColor1, startColor2, endColor2;

  switch (weatherDescription.toLowerCase()) {
    case 'clear sky':
    case 'few clouds':
    case 'scattered clouds':
    case 'broken clouds':
      if (iconCode.endsWith('d')) {
        // sunny or has sun
        startColor1 = '#fa85b2'; // pink
        endColor1 = '#ff00b1'; // peach
        startColor2 = '#ffd900'; // orange
        endColor2 = '#ff7f00'; // yellow
      } else {
        // at night
        startColor1 = '#9232ff'; // purple
        endColor1 = '#fa85b2'; // peach
        startColor2 = '#03007a'; // dark blue
        endColor2 = '#9232ff'; // purple
      }
      break;
    case 'shower rain':
    case 'rain':
    case 'thunderstorm':
      if (iconCode.endsWith('d')) {
        // rain during the day
        startColor1 = '#313036'; // darker grey
        endColor1 = '#444444'; // dark grey
        startColor2 = '#1b155d'; // dark blue
        endColor2 = '#035aa6'; // lighter blue
      } else {
        // rain at night
        startColor1 = '#1b155d'; // dark blue
        endColor1 = '#035aa6'; // lighter blue
        startColor2 = '#313036'; // darker grey
        endColor2 = '#444444'; // dark grey
      }
      break;
    default:
      startColor1 = '#fa85b2'; // pink
      endColor1 = '#ff00b1'; // peach
      startColor2 = '#ffd900'; // orange
      endColor2 = '#ff7f00'; // yellow
  }

  const r1 = parseInt(startColor1.slice(1, 3), 16);
  const g1 = parseInt(startColor1.slice(3, 5), 16);
  const b1 = parseInt(startColor1.slice(5, 7), 16);
  const r2 = parseInt(endColor1.slice(1, 3), 16);
  const g2 = parseInt(endColor1.slice(3, 5), 16);
  const b2 = parseInt(endColor1.slice(5, 7), 16);

  const r1_ = parseInt(startColor2.slice(1, 3), 16);
  const g1_ = parseInt(startColor2.slice(3, 5), 16);
  const b1_ = parseInt(startColor2.slice(5, 7), 16);
  const r2_ = parseInt(endColor2.slice(1, 3), 16);
  const g2_ = parseInt(endColor2.slice(3, 5), 16);
  const b2_ = parseInt(endColor2.slice(5, 7), 16);

  const r = Math.round(r1 + (r2 - r1) * tempRatio);
  const g = Math.round(g1 + (g2 - g1) * tempRatio);
  const b = Math.round(b1 + (b2 - b1) * tempRatio);

  const r_ = Math.round(r1_ + (r2_ - r1_) * tempRatio);
  const g_ = Math.round(g1_ + (g2_ - g1_) * tempRatio);
  const b_ = Math.round(b1_ + (b2_ - b1_) * tempRatio);

  return [`rgb(${r}, ${g}, ${b})`, `rgb(${r_}, ${g_}, ${b_})`];
};

export async function fetchWeatherData(latitude: number, longitude: number): Promise<any> {
  const url = `${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export function useInternetConnection() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      state.isConnected != null ? setIsConnected(state.isConnected) : null;
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return isConnected;
}

export async function requestLocationPermission() {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
        return true;
      } else {
        console.log('Location permission denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    Geolocation.requestAuthorization();
    return true;
  }
}

export async function fetchCurrentLocationWeatherData(): Promise<any> {
  const hasLocationPermission = await requestLocationPermission();
  if (!hasLocationPermission) {
    throw new Error('Location permission denied');
  }

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        fetchWeatherData(latitude, longitude)
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      },
      error => {
        reject(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  });
}

const Home = ({ navigation }: RouterProps) => {
  const [meteoJson, setMeteoJson] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const isConnected = useInternetConnection();

  const date = new Date();
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;

  useEffect(() => {
    // If the device is connected to the internet
    if (isConnected) {
      // Fetch the meteo data from the API
      fetchCurrentLocationWeatherData()
        .then(data => {
          setMeteoJson(data);
          saveMeteoJson(data);
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    } else {
      // If the device is not connected to the internet, fetch the meteo data from the storage
      const meteo = getMeteoJson();
      if (meteo) {
        setMeteoJson(meteo);
        setLoading(false);
      } else {
        // If the storage is empty, return an empty page with a text indicating that the meteo data cannot be fetched
        setLoading(false);
      }
    }
  }, [isConnected]);

  const { name, weather, main } = meteoJson || {};
  const { description, icon } = weather?.[0] || {};
  const { temp } = main || {};

  const [backgroundColor1, backgroundColor2] = meteoJson ? getBackgroundColor(description, icon, temp) : ['#D3D3D3', '#D3D3D3'];

  return (
    <LinearGradient
      colors={[backgroundColor1, backgroundColor2]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.view}>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.subtext}>{day}/{month}</Text>

          <Image
            source={{ uri: `https://openweathermap.org/img/wn/${icon}@4x.png` }}
            style={{ width: width * 0.9, height: width * 0.9 }}
          />

          <Text style={styles.subtext}>{description}</Text>
          <Text style={styles.text}>{temp}°C</Text>

          <Button onPress={() => FIREBASE_AUTH.signOut()} title="Log out" />
        </View>
      )}
    </LinearGradient>
  );
};

export default Home;
