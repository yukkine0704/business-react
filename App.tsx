import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/rootNavigator';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';


export default function App() {

  const colorScheme = useColorScheme();
  const {theme} = useMaterial3Theme({fallbackSourceColor: '#FF6214'})

  const paperTheme = useMemo(
    () =>
      colorScheme === 'dark' ? { ...MD3DarkTheme, colors: theme.dark } : { ...MD3LightTheme, colors: theme.light },
    [colorScheme, theme]
  );

  return (
  <PaperProvider theme={paperTheme}>
  <NavigationContainer>
    <Navigator/>
  </NavigationContainer>
  </PaperProvider>
  );
}


