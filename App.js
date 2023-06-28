import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VehiclesContext, VehiclesProvider } from "./AppContext/MarkersContext";

import Home from "./components/screens/Home"
import Map from "./components/screens/Map"
import Navbar from './components/Navbar';
import NewVehicle from './components/screens/NewVehicle';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <VehiclesProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
          <Stack.Screen name="Map" options={{ headerShown: false }} component={Map} />
          <Stack.Screen name="NewVehicle" options={{ headerShown: false }} component={NewVehicle} />
        </Stack.Navigator>
        <Navbar />
      </NavigationContainer>
    </VehiclesProvider>
  );
}
