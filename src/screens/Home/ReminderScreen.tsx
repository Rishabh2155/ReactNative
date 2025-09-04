// // // import React, { useEffect, useState } from 'react';
// // // import { View, Text, FlatList, Image, Linking, StyleSheet } from 'react-native';
// // // import { Card, Button } from 'react-native-paper';
// // // import { Buffer } from 'buffer';

// // // const dummyPrescriptions = [
// // //   {
// // //     id: '1',
// // //     name: 'Prescription_1.pdf',
// // //     type: 'pdf',
// // //     uploadedOn: 'Jul 24, 2025',
// // //     source: 'File',
// // //     url: 'https://res.cloudinary.com/demo/image/upload/sample.pdf',
// // //   },
// // //   {
// // //     id: '2',
// // //     name: 'Prescription_photo.jpg',
// // //     type: 'image',
// // //     uploadedOn: 'Jul 23, 2025',
// // //     source: 'Link',
// // //     url: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
// // //   },
// // // ];

// // // // 🔧 Replace these with your own Cloudinary credentials
// // // const cloudName = 'dbydr8c5p';
// // // const apiKey = '576661243913843';
// // // const apiSecret = 'I1j72YDknkPgw2gcqdIE2JU2TSY';
// // // const folder = 'prescriptions';

// // // export default function ReminderScreen() {
// // //   const [allPrescriptions, setAllPrescriptions] = useState(dummyPrescriptions);

// // //   const fetchFromCloudinary = async () => {
// // //     try {
// // //       const base64Credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

// // //       const response = await fetch(
// // //         `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload?prefix=${folder}/&max_results=50`,
// // //         {
// // //           headers: {
// // //             Authorization: `Basic ${base64Credentials}`,
// // //           },
// // //         }
// // //       );

// // //       if (!response.ok) {
// // //         const text = await response.text();
// // //         throw new Error(`Error: ${response.status} - ${text}`);
// // //       }

// // //       const data = await response.json();

// // //       const realPrescriptions = data.resources.map((item: any, index: number) => {
// // //         const extension = item.public_id.split('.').pop()?.toLowerCase();
// // //         const isPDF = item.format === 'pdf' || extension === 'pdf';

// // //         return {
// // //           id: `cloud-${index}`,
// // //           name: item.public_id.split('/').pop(),
// // //           type: isPDF ? 'pdf' : 'image',
// // //           uploadedOn: new Date(item.created_at).toDateString(),
// // //           source: 'Cloudinary',
// // //           url: item.secure_url,
// // //         };
// // //       });

// // //       setAllPrescriptions([...realPrescriptions, ...dummyPrescriptions]);
// // //     } catch (error) {
// // //       console.error('Cloudinary fetch error:', error);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchFromCloudinary();
// // //   }, []);

// // //   const handleView = (url: string) => {
// // //     Linking.openURL(url);
// // //   };

// // //   const renderItem = ({ item }: { item: typeof allPrescriptions[0] }) => (
// // //     <Card style={styles.card}>
// // //       <Card.Content>
// // //         <Text style={styles.title}>{item.name}</Text>
// // //         <Text style={styles.subtitle}>
// // //           Uploaded: {item.uploadedOn} | Source: {item.source}
// // //         </Text>
// // //         {item.type === 'image' ? (
// // //           <Image source={{ uri: item.url }} style={styles.image} resizeMode="cover" />
// // //         ) : (
// // //           <Text style={styles.pdfNotice}>[PDF Preview Not Available]</Text>
// // //         )}
// // //         <Button mode="contained" onPress={() => handleView(item.url)}>
// // //           View
// // //         </Button>
// // //       </Card.Content>
// // //     </Card>
// // //   );

// // //   return (
// // //     <View style={styles.container}>
// // //       <Text style={styles.header}>Your Prescriptions</Text>
// // //       <FlatList
// // //         data={allPrescriptions}
// // //         keyExtractor={(item) => item.id}
// // //         renderItem={renderItem}
// // //         ListEmptyComponent={
// // //           <Text style={styles.emptyText}>
// // //             No prescriptions found. Upload from Pharmacy tab.
// // //           </Text>
// // //         }
// // //       />
// // //     </View>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     padding: 16,
// // //     backgroundColor: 'white',
// // //   },
// // //   header: {
// // //     fontSize: 22,
// // //     fontWeight: 'bold',
// // //     marginBottom: 12,
// // //   },
// // //   card: {
// // //     marginBottom: 16,
// // //   },
// // //   title: {
// // //     fontSize: 18,
// // //     fontWeight: '600',
// // //     marginBottom: 4,
// // //   },
// // //   subtitle: {
// // //     fontSize: 14,
// // //     color: '#6b7280',
// // //     marginBottom: 8,
// // //   },
// // //   image: {
// // //     width: '100%',
// // //     height: 160,
// // //     borderRadius: 8,
// // //     marginBottom: 8,
// // //   },
// // //   pdfNotice: {
// // //     fontSize: 14,
// // //     color: '#2563eb',
// // //     marginBottom: 8,
// // //   },
// // //   emptyText: {
// // //     fontSize: 14,
// // //     color: '#9ca3af',
// // //     textAlign: 'center',
// // //     marginTop: 20,
// // //   },
// // // });
// // import React, { useEffect, useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   FlatList,
// //   TouchableOpacity,
// //   Linking,
// //   StyleSheet,
// // } from 'react-native';
// // import { Ionicons } from '@expo/vector-icons';
// // import * as FileSystem from 'expo-file-system';
// // import * as Sharing from 'expo-sharing';
// // import * as MediaLibrary from 'expo-media-library';
// // import * as Permissions from 'expo-permissions';
// // import { database, auth } from '../../firebase/firebaseConfig';
// // import { ref, onValue } from 'firebase/database';

// // const RemindersScreen = () => {
// //   const [allPrescriptions, setAllPrescriptions] = useState<any[]>([]);

// //   const fetchFromFirebase = () => {
// //     const userId = auth.currentUser?.uid;
// //     if (!userId) {
// //       console.warn('User not logged in.');
// //       return;
// //     }

// //     const userRef = ref(database, `/prescriptions/${userId}`);

// //     onValue(userRef, (snapshot) => {
// //       const data = snapshot.val();
// //       if (!data) {
// //         setAllPrescriptions([]);
// //         return;
// //       }

// //       const firebasePrescriptions = Object.entries(data).map(([key, value]: [string, any]) => {
// //         const url = typeof value === 'string' ? value : value.url;
// //         const isPDF = url.toLowerCase().endsWith('.pdf');
// //         const uploadedOn = value.uploadedAt
// //           ? new Date(value.uploadedAt).toDateString()
// //           : new Date().toDateString();

// //         return {
// //           id: key,
// //           name: isPDF ? 'Prescription.pdf' : 'Prescription Image',
// //           type: isPDF ? 'pdf' : 'image',
// //           uploadedOn,
// //           source: 'Firebase',
// //           url,
// //         };
// //       });

// //       setAllPrescriptions(firebasePrescriptions);
// //     });
// //   };

// //   const handleDownload = async (url: string, filename: string) => {
// //     try {
// //       const downloadResumable = FileSystem.createDownloadResumable(
// //         url,
// //         FileSystem.documentDirectory + filename
// //       );

// //       const { uri } = await downloadResumable.downloadAsync();
// //       if (!(await Sharing.isAvailableAsync())) {
// //         alert('Sharing is not available on your platform');
// //         return;
// //       }
// //       await Sharing.shareAsync(uri);
// //     } catch (error) {
// //       console.error('Error downloading file:', error);
// //     }
// //   };

// //   const renderItem = ({ item }: { item: any }) => (
// //     <View style={styles.prescriptionItem}>
// //       <View style={styles.prescriptionInfo}>
// //         <Ionicons
// //           name={item.type === 'pdf' ? 'document' : 'image'}
// //           size={24}
// //           color="#333"
// //         />
// //         <View style={{ marginLeft: 10 }}>
// //           <Text style={styles.prescriptionName}>{item.name}</Text>
// //           <Text style={styles.prescriptionDate}>Uploaded: {item.uploadedOn}</Text>
// //           <Text style={styles.prescriptionSource}>Source: {item.source}</Text>
// //         </View>
// //       </View>
// //       <View style={styles.actions}>
// //         <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
// //           <Ionicons name="open-outline" size={24} color="#007AFF" />
// //         </TouchableOpacity>
// //         <TouchableOpacity onPress={() => handleDownload(item.url, item.name)}>
// //           <Ionicons name="download-outline" size={24} color="#007AFF" />
// //         </TouchableOpacity>
// //       </View>
// //     </View>
// //   );

// //   useEffect(() => {
// //     fetchFromFirebase();
// //   }, []);

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Uploaded Prescriptions</Text>
// //       <FlatList
// //         data={allPrescriptions}
// //         keyExtractor={(item) => item.id}
// //         renderItem={renderItem}
// //         contentContainerStyle={{ paddingBottom: 100 }}
// //       />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     paddingTop: 50,
// //     paddingHorizontal: 20,
// //     backgroundColor: '#F5F5F5',
// //   },
// //   title: {
// //     fontSize: 22,
// //     fontWeight: 'bold',
// //     marginBottom: 20,
// //   },
// //   prescriptionItem: {
// //     backgroundColor: '#FFF',
// //     padding: 15,
// //     borderRadius: 10,
// //     marginBottom: 15,
// //     elevation: 2,
// //   },
// //   prescriptionInfo: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   prescriptionName: {
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// //   prescriptionDate: {
// //     fontSize: 14,
// //     color: '#666',
// //   },
// //   prescriptionSource: {
// //     fontSize: 14,
// //     color: '#888',
// //   },
// //   actions: {
// //     flexDirection: 'row',
// //     justifyContent: 'flex-end',
// //     marginTop: 10,
// //   },
// // });

// // export default RemindersScreen;
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Linking,
//   StyleSheet,
//   Alert,
//   PermissionsAndroid,
//   Platform,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import RNFS from 'react-native-fs';
// import Share from 'react-native-share';
// import { database, auth } from '../../firebase/firebaseConfig';
// import { ref, onValue } from 'firebase/database';

// const ReminderScreen = () => {
//   const [prescriptions, setPrescriptions] = useState<any[]>([]);

//   const fetchPrescriptions = async () => {
//     const userId = auth.currentUser?.uid;
//     if (!userId) return;

//     const prescriptionsRef = ref(database, `prescriptions/${userId}`);
//     onValue(prescriptionsRef, (snapshot) => {
//       const data = snapshot.val();
//       if (!data) {
//         setPrescriptions([]);
//         return;
//       }

//       const parsed = Object.entries(data).map(([key, value]: [string, any]) => {
//         const url = typeof value === 'string' ? value : value.url;
//         const isPDF = url.toLowerCase().endsWith('.pdf');
//         const uploadedOn = value.uploadedAt
//           ? new Date(value.uploadedAt).toDateString()
//           : new Date().toDateString();

//         return {
//           id: key,
//           name: url.split('/').pop() || (isPDF ? 'Prescription.pdf' : 'Prescription.jpg'),
//           type: isPDF ? 'pdf' : 'image',
//           uploadedOn,
//           source: 'Firebase',
//           url,
//         };
//       });

//       setPrescriptions(parsed.reverse());
//     });
//   };

//   const requestDownloadPermission = async () => {
//     if (Platform.OS === 'android') {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//         {
//           title: 'Storage Permission',
//           message: 'App needs access to storage to download files.',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         }
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     }
//     return true;
//   };

//   const handleDownload = async (url: string, filename: string) => {
//     const hasPermission = await requestDownloadPermission();
//     if (!hasPermission) {
//       Alert.alert('Permission denied');
//       return;
//     }

//     const path = `${RNFS.DocumentDirectoryPath}/${filename}`;
//     try {
//       const res = await RNFS.downloadFile({ fromUrl: url, toFile: path }).promise;
//       if (res.statusCode === 200) {
//         await Share.open({ url: 'file://' + path });
//       } else {
//         Alert.alert('Download failed', 'Could not download the file.');
//       }
//     } catch (err) {
//       console.error('Download error:', err);
//       Alert.alert('Error', 'Failed to download file.');
//     }
//   };

//   const renderItem = ({ item }: { item: any }) => (
//     <View style={styles.prescriptionItem}>
//       <View style={styles.prescriptionInfo}>
//         <Ionicons
//           name={item.type === 'pdf' ? 'document-text-outline' : 'image-outline'}
//           size={24}
//           color="#333"
//         />
//         <View style={{ marginLeft: 10 }}>
//           <Text style={styles.prescriptionName}>{item.name}</Text>
//           <Text style={styles.prescriptionDate}>Uploaded: {item.uploadedOn}</Text>
//           <Text style={styles.prescriptionSource}>Source: {item.source}</Text>
//         </View>
//       </View>
//       <View style={styles.actions}>
//         <TouchableOpacity onPress={() => Linking.openURL(item.url)} style={{ marginRight: 12 }}>
//           <Ionicons name="open-outline" size={24} color="#007AFF" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => handleDownload(item.url, item.name)}>
//           <Ionicons name="download-outline" size={24} color="#007AFF" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   useEffect(() => {
//     fetchPrescriptions();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Your Prescriptions</Text>
//       <FlatList
//         data={prescriptions}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         ListEmptyComponent={
//           <Text style={styles.emptyText}>No prescriptions found.</Text>
//         }
//         contentContainerStyle={{ paddingBottom: 80 }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 50,
//     paddingHorizontal: 20,
//     backgroundColor: '#F9F9F9',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   prescriptionItem: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 10,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   prescriptionInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   prescriptionName: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   prescriptionDate: {
//     fontSize: 14,
//     color: '#666',
//   },
//   prescriptionSource: {
//     fontSize: 14,
//     color: '#999',
//   },
//   actions: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     marginTop: 12,
//   },
//   emptyText: {
//     textAlign: 'center',
//     color: '#888',
//     marginTop: 40,
//     fontSize: 16,
//   },
// });

// export default ReminderScreen;
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { database, auth } from '../../firebase/firebaseConfig';
import { ref, onValue } from 'firebase/database';

const ReminderScreen = () => {
  const [prescriptions, setPrescriptions] = useState<any[]>([]);

  useEffect(() => {
    const fetchPrescriptions = () => {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      const prescriptionsRef = ref(database, `prescriptions/${userId}`);
      onValue(prescriptionsRef, (snapshot) => {
        const data = snapshot.val();
        if (!data) {
          setPrescriptions([]);
          return;
        }

        const parsed = Object.entries(data).map(([key, value]: [string, any]) => {
          const url = typeof value === 'string' ? value : value.url;
          const isPDF = url.toLowerCase().endsWith('.pdf');
          const uploadedOn = value.uploadedAt
            ? new Date(value.uploadedAt).toDateString()
            : new Date().toDateString();

          return {
            id: key,
            name: url.split('/').pop() || (isPDF ? 'Prescription.pdf' : 'Prescription.jpg'),
            type: isPDF ? 'pdf' : 'image',
            uploadedOn,
            source: 'Firebase',
            url,
          };
        });

        setPrescriptions(parsed.reverse());
      });
    };

    fetchPrescriptions();
  }, []);

  const requestDownloadPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const handleDownload = async (item: any) => {
    const hasPermission = await requestDownloadPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Storage permission is required to download files.');
      return;
    }

    const fileName = item.name;
    const path = `${RNFS.DownloadDirectoryPath}/${fileName}`;

    try {
      const result = await RNFS.downloadFile({ fromUrl: item.url, toFile: path }).promise;
      if (result.statusCode === 200) {
        Alert.alert('Success', `File downloaded to: ${path}`);
      } else {
        throw new Error('Download failed');
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to download file.');
    }
  };

  const handleShare = async (item: any) => {
    try {
      await Share.open({ url: item.url });
    } catch (err) {
      Alert.alert('Error', 'Failed to share the file.');
    }
  };

  const handleOpen = (item: any) => {
    Linking.openURL(item.url).catch(() => {
      Alert.alert('Error', 'Failed to open link.');
    });
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.subtitle}>Uploaded: {item.uploadedOn}</Text>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleOpen(item)} style={styles.button}>
          <Text>Open</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDownload(item)} style={styles.button}>
          <Text>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleShare(item)} style={styles.button}>
          <Text>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {prescriptions.length === 0 ? (
        <Text style={styles.noData}>No prescriptions found.</Text>
      ) : (
        <FlatList
          data={prescriptions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default ReminderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 14,
    marginBottom: 12,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    color: '#666',
    fontSize: 13,
    marginVertical: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#ddd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  noData: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
});
