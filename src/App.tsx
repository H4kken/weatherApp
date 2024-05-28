import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/login';
import Home from './screens/Home';
import Details from './screens/details';
import Settings from './screens/Settings';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_APP, FIREBASE_AUTH } from '../FirebaseConfig';
import Splash from './screens/Splash';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name='Home ' component={Home}/>
      <InsideStack.Screen name='Details' component={Details}/>
      <InsideStack.Screen name='Settings' component={Settings}/>
    </InsideStack.Navigator>
  );
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(FIREBASE_APP), (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
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
