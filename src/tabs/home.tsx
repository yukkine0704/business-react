import React from 'react';
import { Text, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
    const theme = useTheme();
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.surface}]}>
          <Text>Home</Text>
        </SafeAreaView>
      );
    }

const styles = StyleSheet.create({
  container: {
    flex: 1, // Asegura que SafeAreaView ocupe toda la pantalla
    justifyContent: 'center', // Centra el contenido verticalmente (opcional)
    alignItems: 'center', // Centra el contenido horizontalmente (opcional)
  },
});