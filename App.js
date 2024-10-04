import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRegistry } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomePage';
import DiseaseClassification from './src/screens/services/DiseaseClassification';
import ChatbotScreen from './src/screens/services/ChatbotScreen';
import MarketplaceScreen from './src/screens/services/MarketplaceScreen';
import WaterResourceScreen from './src/screens/services/WaterResourceScreen';
import CropSuggestionScreen from './src/screens/services/CropSuggestionScreen'; 
import SoilQualityTesting from './src/screens/services/SoilQualityTesting'; 


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DiseaseClassification" component={DiseaseClassification} />
        <Stack.Screen name="ChatbotScreen" component={ChatbotScreen} />
        <Stack.Screen name="MarketplaceScreen" component={MarketplaceScreen} />
        <Stack.Screen name="WaterResourceScreen" component={WaterResourceScreen} />
        <Stack.Screen name="CropSuggestionScreen" component={CropSuggestionScreen} />
        <Stack.Screen name="SoilQualityTesting" component={SoilQualityTesting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Ensure App is registered
import { name as appName } from './app.json';
AppRegistry.registerComponent(appName, () => App);
