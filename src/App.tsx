import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Home from './screens/Home';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_APP, FIREBASE_AUTH } from '../FirebaseConfig';
import Splash from './screens/Splash';
import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()
const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator screenOptions={{ headerShown: false }}>
      <InsideStack.Screen name='Home ' component={Home}/>
    </InsideStack.Navigator>
  );
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(FIREBASE_APP), (user) => {
      setUser(user);
      if (initializing){
        setInitializing(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Render the splash screen if the user's authentication state is still being checked
  if (initializing) {
    return <Splash />;
  }
  // Redirect the user to the login page if they are not authenticated
  else if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Login'
            component={Login}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  // If the user is authenticated
  else {
    return (
      <NavigationContainer>
        <InsideLayout/>
      </NavigationContainer>
    );
  }
}
