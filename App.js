import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./components/screens/Home"
import Map from "./components/screens/Map"
import Navbar from './components/Navbar';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
        <Stack.Screen name="Map" options={{ headerShown: false }} component={Map} />
      </Stack.Navigator>
      <Navbar />
    </NavigationContainer>
  );
}
