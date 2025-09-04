
import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { pick } from '@react-native-documents/picker';
import axios from 'axios';
import mime from 'react-native-mime-types';
import {database,auth} from '../../firebase/firebaseConfig';
import { ref, push } from 'firebase/database';
// import auth from 'firebase/auth';

export default function NearbyPharmacyScreen() {
  const [file, setFile] = useState<any>(null);
  const [link, setLink] = useState('');
  const [uploading, setUploading] = useState(false);

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const permissionToRequest =
          Platform.Version >= 33
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

        const granted = await PermissionsAndroid.request(permissionToRequest, {
          title: 'Storage Permission',
          message: 'App needs access to your storage to select a file.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        });

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Permission error:', err);
        return false;
      }
    }
    return true;
  };

  const handleFilePick = async () => {
    const permissionGranted = await requestStoragePermission();
    if (!permissionGranted) {
      Alert.alert('Permission Denied', 'Storage permission is required to select files.');
      return;
    }

    try {
      const [result] = await pick({
        allowMultiSelection: false,
        type: ['image/jpeg', 'image/png', 'application/pdf'],
      });

      const type = result.type || mime.lookup(result.name || '') || 'application/octet-stream';

      setFile({
        uri: result.uri,
        name: result.name || 'file',
        type,
      });
    } catch (err) {
      console.warn('File pick cancelled or failed:', err);
    }
  };

  // const saveToFirebase = async (url: string) => {
  //   const userId = auth.currentUser?.uid;
  //   if (!userId) {
  //     Alert.alert('Not logged in', 'You must be signed in to upload prescriptions.');
  //     return;
  //   }


  //   await database.ref(`/prescriptions/${userId}`).push(url);
  // };

  const saveToFirebase = async (url: string) => {
  const userId = auth.currentUser?.uid;
  if (!userId) {
    Alert.alert('Not logged in', 'You must be signed in to upload prescriptions.');
    return;
  }

  const userRef = ref(database, `/prescriptions/${userId}`);
  await push(userRef, url);
};

  const uploadToCloudinary = async (fileUri: string, fileName: string, type: string) => {
    const formData = new FormData();
    formData.append('file', {
      uri: fileUri,
      name: fileName,
      type: type,
    } as any);
    formData.append('upload_preset', 'pharmacy');
    formData.append('folder', 'prescriptions');

    setUploading(true);

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dbydr8c5p/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const uploadedUrl = res.data.secure_url;
      await saveToFirebase(uploadedUrl);

      Alert.alert('Upload Success', 'File uploaded and saved!');
    } catch (err: any) {
      console.error(err);
      Alert.alert('Upload failed', err.message || 'Unknown error');
    } finally {
      setUploading(false);
    }
  };

  const handleUpload = async () => {
    if (file) {
      await uploadToCloudinary(file.uri, file.name, file.type);
    } else if (link) {
      setUploading(true);
      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/dbydr8c5p/upload`,
          {
            file: link,
            upload_preset: 'pharmacy',
            folder: 'prescriptions',
          }
        );

        const uploadedUrl = res.data.secure_url;
        await saveToFirebase(uploadedUrl);

        Alert.alert('Link uploaded and saved!');
      } catch (err: any) {
        console.error(err);
        Alert.alert('Upload failed', err.message || 'Unknown error');
      } finally {
        setUploading(false);
      }
    } else {
      Alert.alert('Please select a file or paste a link.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Nearby Pharmacy</Text>

      <Button title="Upload Prescription (File)" onPress={handleFilePick} />
      <Text style={{ textAlign: 'center', marginVertical: 10 }}>OR</Text>

      <TextInput
        placeholder="Paste prescription link"
        value={link}
        onChangeText={setLink}
        style={{ borderWidth: 1, padding: 8, borderRadius: 5 }}
      />

      {file && (
        <View style={{ marginVertical: 10 }}>
          {file.type.includes('image') ? (
            <Image source={{ uri: file.uri }} style={{ width: 100, height: 100 }} />
          ) : (
            <Text>PDF Selected: {file.name}</Text>
          )}
        </View>
      )}

      {uploading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Submit" onPress={handleUpload} />
      )}
    </View>
  );
}
