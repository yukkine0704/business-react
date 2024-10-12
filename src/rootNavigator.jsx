import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import Home from './tabs/home';
import About from './tabs/about';



const Stack = createStackNavigator();
const Tabs = createMaterialBottomTabNavigator(); // Mueve esta línea antes de usar Tabs

const TabNavigator = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name='Home' component={Home} />
      <Tabs.Screen name='About' component={About} />
    </Tabs.Navigator>
  );
};

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
      <Stack.Screen name='Start' component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default Navigator;
