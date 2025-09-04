// import React, { useEffect } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RouteProp } from '@react-navigation/native';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../firebase/firebaseConfig'; 

// // Define your route types
// type RootStackParamList = {
//   Splash: undefined;
//   Preloader: undefined;
//   Login: undefined;
//   Register: undefined;
//   Home: undefined;
// };

// // Define the navigation prop type for SplashScreen
// type SplashScreenNavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   'Splash'
// >;

// type Props = {
//   navigation: SplashScreenNavigationProp;
// };

// const SplashScreen: React.FC<Props> = ({ navigation }) => {
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       navigation.replace('Login');
//     }, 2000);

//     return () => clearTimeout(timeout);
//   }, [navigation]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>MyMeds</Text>
//       <ActivityIndicator size="large" color="#0a74da" />
//     </View>
//   );
// };

// export default SplashScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#0a74da',
//   },
// });
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

type RootStackParamList = {
  Splash: undefined;
  Preloader: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Splash'
>;

type Props = {
  navigation: SplashScreenNavigationProp;
};

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        navigation.replace('Home');
      } else {
        // Not signed in
        navigation.replace('Login');
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MyMeds</Text>
      <ActivityIndicator size="large" color="#0a74da" />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0a74da',
  },
});
