import React, { useMemo } from 'react';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import Navigator from './src/rootNavigator';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { useColorScheme } from 'react-native';
import { adaptNavigationTheme, MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import merge from 'deepmerge';
import { ClerkProvider } from '@clerk/clerk-expo';

export default function App() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!publishableKey) {
    throw new Error(
      'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
    );
  }

  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme({ fallbackSourceColor: '#FF6214' });
  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const paperTheme = useMemo(
    () =>
      colorScheme === 'dark'
        ? { ...MD3DarkTheme, colors: theme.dark }
        : { ...MD3LightTheme, colors: theme.light },
    [colorScheme, theme]
  );

  const CombinedLightTheme = merge(MD3LightTheme, LightTheme);
  const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);



  return (
    <ClerkProvider publishableKey={publishableKey}>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer theme={colorScheme === 'dark' ? CombinedDarkTheme : CombinedLightTheme}>
          <Navigator />
        </NavigationContainer>
      </PaperProvider>
    </ClerkProvider>
  );
}