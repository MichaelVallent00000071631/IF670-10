import React, { useState } from 'react';
import { Button, Platform, StyleSheet, Text, View, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as FileSystem from 'expo-file-system';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [coords, setCoords] = useState(null);

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Izin ditolak', 'Aplikasi memerlukan izin lokasi.');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setCoords(location.coords);

    const log = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}, Time: ${new Date().toISOString()}\n`;

    const fileUri = `${FileSystem.documentDirectory}geolocation_log.txt`;

    try {
      await FileSystem.writeAsStringAsync(fileUri, log, { encoding: FileSystem.EncodingType.UTF8, append: true });
      console.log('Lokasi disimpan ke:', fileUri);
    } catch (error) {
      console.error('Gagal menyimpan lokasi:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Tekan tombol untuk menyimpan lokasi ke file.</Text>
      <Button title="Dapatkan Lokasi" onPress={getLocation} />
      {coords && (
        <Text>
          Lokasi: {coords.latitude}, {coords.longitude}
        </Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

// import React, { useState, useEffect } from 'react';
// import {
//   PermissionsAndroid,
//   Platform,
//   StyleSheet,
//   Text,
//   View,
//   Button,
// } from 'react-native';
// import Geolocation from '@react-native-community/geolocation';
// import RNFS from 'react-native-fs';
// import { StatusBar } from 'expo-status-bar';

// export default function App() {
//   const [coords, setCoords] = useState(null);

//   const getLocation = async () => {
//     const hasPermission = await hasLocationPermission();
//     const hasWritePermission = await hasWriteStoragePermission();

//     if (!hasPermission || !hasWritePermission) {
//       return;
//     }

//     Geolocation.getCurrentPosition(
//       async (position) => {
//         setCoords(position.coords);
//         const log = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}, Time: ${new Date().toISOString()}\n`;

//         const path = `${RNFS.DownloadDirectoryPath}/geolocation_log.txt`;

//         try {
//           await RNFS.appendFile(path, log, 'utf8');
//           console.log('Location saved to:', path);
//         } catch (err) {
//           console.error('Failed to write file:', err);
//         }
//       },
//       (error) => {
//         console.error(`Code ${error.code}`, error.message);
//       },
//       {
//         accuracy: {
//           android: 'high',
//         },
//         enableHighAccuracy: true,
//         timeout: 15000,
//         maximumAge: 10000,
//         distanceFilter: 0,
//         forceRequestLocation: true,
//         forceLocationManager: true,
//         showLocationDialog: true,
//       }
//     );
//   };

//   const hasLocationPermission = async () => {
//     if (Platform.OS === 'android' && Platform.Version < 23) {
//       return true;
//     }

//     const hasPermission = await PermissionsAndroid.check(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//     );

//     if (hasPermission) {
//       return true;
//     }

//     const status = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//     );

//     return status === PermissionsAndroid.RESULTS.GRANTED;
//   };

//   const hasWriteStoragePermission = async () => {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//       {
//         title: 'Izin Penyimpanan',
//         message: 'Aplikasi ini memerlukan akses ke penyimpanan untuk menyimpan file lokasi.',
//         buttonNeutral: 'Tanya Nanti',
//         buttonNegative: 'Tolak',
//         buttonPositive: 'Izinkan',
//       }
//     );

//     return granted === PermissionsAndroid.RESULTS.GRANTED;
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Tekan tombol untuk menyimpan lokasi ke Download folder.</Text>
//       <Button title="Dapatkan Lokasi" onPress={getLocation} />
//       {coords && (
//         <Text>
//           Lokasi: {coords.latitude}, {coords.longitude}
//         </Text>
//       )}
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
// });
