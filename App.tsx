// // /**
// //  * Sample React Native App
// //  * https://github.com/facebook/react-native
// //  *
// //  * @format
// //  */

// // import { NewAppScreen } from '@react-native/new-app-screen';
// // import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';

// // function App() {
// //   const isDarkMode = useColorScheme() === 'dark';

// //   return (
// //     <View style={styles.container}>
// //       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
// //       <NewAppScreen templateFileName="App.tsx" />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //   },
// // });

// // export default App;
// import React from 'react';
// import { SafeAreaView, Text, StyleSheet } from 'react-native';

// const App = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.text}>👋 Welcome to FinalHappyApp</Text>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: '600',
//   },
// });

// export default App;
import React from 'react';
import RootNavigator from './src/navigation/RootNavigator'; // make sure path matches your actual file structure

const App = () => {
  return <RootNavigator />;
};

export default App;
