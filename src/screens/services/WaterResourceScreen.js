import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const WaterResourceScreen = () => {
  const [waterResourceData, setWaterResourceData] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = 'https://api.maptiler.com/tiles/terrain-rgb/{z}/{x}/{y}.png?key=8snDRoOxEMhir3L1qx64'; // Replace with your API

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setWaterResourceData(data);
      } catch (error) {
        console.error('Error fetching water resource data:', error);
        const demoData = [
            { latitude: 23.6850, longitude: 90.3563, value: 50 }, // Dhaka
            { latitude: 22.3569, longitude: 91.7832, value: 60 }, // Chittagong
            { latitude: 24.9045, longitude: 91.8611, value: 55 }, // Sylhet
            { latitude: 25.7439, longitude: 89.2752, value: 45 }, // Rangpur
            { latitude: 23.8103, longitude: 90.4125, value: 65 }, // Gazipur
            { latitude: 24.3636, longitude: 88.6241, value: 70 }, // Rajshahi
            { latitude: 22.8456, longitude: 89.5403, value: 75 }, // Khulna
            { latitude: 21.4282, longitude: 92.0058, value: 80 }, // Cox's Bazar
            { latitude: 22.7976, longitude: 89.5458, value: 68 }, // Mongla
            { latitude: 24.5100, longitude: 91.1235, value: 55 }, // Habiganj
            { latitude: 25.7466, longitude: 89.2395, value: 40 }, // Kurigram
            { latitude: 22.4966, longitude: 90.7123, value: 58 }, // Barisal
            { latitude: 22.3240, longitude: 91.0973, value: 65 }, // Feni
            { latitude: 23.2706, longitude: 91.3631, value: 72 }, // Comilla
            { latitude: 24.0183, longitude: 90.4077, value: 62 }, // Narayanganj
            { latitude: 23.4958, longitude: 91.1410, value: 48 }, // Brahmanbaria
            { latitude: 23.9322, longitude: 89.1231, value: 66 }, // Manikganj
            { latitude: 23.4225, longitude: 89.5863, value: 52 }, // Faridpur
            { latitude: 24.7242, longitude: 90.3899, value: 49 }, // Mymensingh
            { latitude: 22.9350, longitude: 89.2157, value: 70 }, // Satkhira
            { latitude: 25.2887, longitude: 89.3306, value: 43 }, // Lalmonirhat
            { latitude: 25.7904, longitude: 88.8487, value: 41 }, // Thakurgaon
            { latitude: 23.4607, longitude: 91.1793, value: 62 }, // Lakshmipur
            { latitude: 25.6260, longitude: 88.6410, value: 37 }, // Panchagarh
            { latitude: 24.6850, longitude: 88.1286, value: 58 }, // Naogaon
            { latitude: 23.5952, longitude: 89.8415, value: 60 }, // Madaripur
            { latitude: 24.4944, longitude: 88.1686, value: 72 }, // Natore
            { latitude: 22.9668, longitude: 91.4549, value: 76 }, // Noakhali
            { latitude: 23.0798, longitude: 89.6469, value: 64 }, // Gopalganj
            { latitude: 25.0249, longitude: 88.9172, value: 53 }, // Dinajpur
            { latitude: 23.6805, longitude: 88.6555, value: 67 }, // Kushtia
            { latitude: 22.8925, longitude: 89.4970, value: 74 }, // Bagerhat
            { latitude: 24.0974, longitude: 90.9844, value: 66 }, // Kishoreganj
            { latitude: 23.1586, longitude: 89.5442, value: 63 }, // Magura
            { latitude: 23.5408, longitude: 90.1415, value: 59 }, // Munshiganj
            { latitude: 23.3833, longitude: 91.4011, value: 68 }, // Chandpur
            { latitude: 22.2242, longitude: 89.5250, value: 77 }, // Patuakhali
            { latitude: 22.7100, longitude: 90.3736, value: 61 }, // Jhalokati
            { latitude: 24.4113, longitude: 90.6200, value: 55 }, // Jamalpur
            { latitude: 23.3334, longitude: 88.9833, value: 72 }, // Meherpur
            { latitude: 24.0132, longitude: 88.9937, value: 66 }, // Chuadanga
            { latitude: 24.8103, longitude: 90.6566, value: 48 }, // Sherpur
            { latitude: 23.0084, longitude: 89.1406, value: 60 }, // Narail
            { latitude: 25.7834, longitude: 89.2225, value: 44 }, // Gaibandha
            { latitude: 24.1065, longitude: 89.4047, value: 68 }  // Pabna
      
        
        ];
        setWaterResourceData(demoData);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const initialRegion = {
    latitude: 23.6850,
    longitude: 90.3563,
    latitudeDelta: 5,
    longitudeDelta: 5,
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <MapView style={styles.map} initialRegion={initialRegion}>
          {waterResourceData.map((data, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: data.latitude, longitude: data.longitude }}
              title={`Water Resource Value: ${data.value}`}
              pinColor="#FFA500"
            />
          ))}
        </MapView>
      )}
      <View style={styles.legend}>
        <Text style={styles.legendText}>Legend:</Text>
        <View style={styles.legendItem}>
          <View style={[styles.colorBox, { backgroundColor: '#FFA500' }]} />
          <Text>Water Resource Data</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { ...StyleSheet.absoluteFillObject },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  legend: {
    position: 'absolute', bottom: 30, left: 10, backgroundColor: 'white', padding: 10,
    borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, shadowRadius: 3, elevation: 5,
  },
  legendText: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  colorBox: { width: 20, height: 20, marginRight: 10, borderRadius: 3 },
});

export default WaterResourceScreen;
