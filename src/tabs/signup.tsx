import React from 'react'
import { Button, Text, TextInput, useTheme, Snackbar, IconButton } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSignUp } from '@clerk/clerk-expo'
import { useNavigation } from '@react-navigation/native'

export default function Signup() {
    const { isLoaded, signUp, setActive } = useSignUp()
    const navigation = useNavigation();
    const theme = useTheme();

    const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')


  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setPendingVerification(true)
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      handleError(err);
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        navigation.navigate('Start');
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2))
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      handleError(err);
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const handleError = (err: any) => {
    console.error(JSON.stringify(err, null, 2));
    if (err.errors && err.errors.length > 0) {
      setErrorMessage(err.errors[0].message);
    } else {
      setErrorMessage('An unexpected error occurred.');
    }
    setSnackbarVisible(true);
  };

  const onDismissSnackbar = () => {
    setSnackbarVisible(false);
  };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.surface, justifyContent: 'center', padding: 16 }}>
      {!pendingVerification ? (
        <>
          <TextInput
            label="Email"
            value={emailAddress}
            onChangeText={setEmailAddress}
            style={{ marginBottom: 16 }}
          />
          <TextInput
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={{ marginBottom: 16 }}
          />
          <Button mode="contained" onPress={onSignUpPress}>
            Sign Up
          </Button>
        </>
      ) : (
        <>
          <TextInput
            label="Verification Code"
            value={code}
            onChangeText={setCode}
            style={{ marginBottom: 16 }}
          />
          <Button mode="contained" onPress={onPressVerify}>
            Verify Email
          </Button>
        </>
      )}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={onDismissSnackbar}
        action={{
            icon: () => (
                <IconButton
                  icon={() => (
                    <MaterialCommunityIcons
                      name="alert-decagram"
                      size={24}
                      color={theme.colors.onError}
                    />
                  )}
                />
              ),
          label: 'Close',
          onPress: onDismissSnackbar,
        }}>
        {errorMessage}
      </Snackbar>
    </SafeAreaView>
  );
}

