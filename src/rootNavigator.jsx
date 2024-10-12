import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from 'react-native-paper/lib/typescript/react-navigation'
import home from './tabs/home';
import about from './tabs/about';



const Stack = createStackNavigator();
const Tabs = createMaterialBottomTabNavigator(); // Mueve esta línea antes de usar Tabs

const TabNavigator = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name='Home' component={home} />
      <Tabs.Screen name='About' component={about} />
    </Tabs.Navigator>
  );
};

const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default Navigator;
