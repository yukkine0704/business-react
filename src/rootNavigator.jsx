import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import Home from './tabs/home';
import About from './tabs/about';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Signup from './tabs/signup';
import { useAuth } from '@clerk/clerk-expo';



const Stack = createStackNavigator();
const Tabs = createMaterialBottomTabNavigator(); 



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
    const { isSignedIn } = useAuth();
const initialRouteName = isSignedIn ? 'Start' : 'Signup';
  return (
    <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name='Signup' component={Signup}/>
      <Stack.Screen name='Start' component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default Navigator;
