import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import Home from './tabs/home';
import About from './tabs/about';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const Stack = createStackNavigator();
const Tabs = createMaterialBottomTabNavigator(); // Mueve esta línea antes de usar Tabs

const TabNavigator = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name='Home' component={Home} options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" size={26} />
          ),
        }}
      />
      <Tabs.Screen name='About' component={About} options={{
        tabBarLabel: 'Info',
        tabBarIcon: () =>(
            <MaterialCommunityIcons name='information' size={26}/>
        ),
      }}
      />
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
