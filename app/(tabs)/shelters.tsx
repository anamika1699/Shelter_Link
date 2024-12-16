import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface Shelter {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  bedsAvailable: number;
}

const sheltersMapsData: Shelter[] = [
  {
    id: '1',
    name: "Ruby's Place",
    latitude: 37.7797,
    longitude: -122.3912,
    address: 'San Francisco, CA',
    bedsAvailable: 5,
  },
  {
    id: '2',
    name: 'South Hayward Parish',
    latitude: 37.6688,
    longitude: -122.0808,
    address: 'Hayward, CA',
    bedsAvailable: 2,
  },
];

const sheltersMaps: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const filteredsheltersMaps = sheltersMapsData.filter((shelter) =>
    shelter.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search sheltersMaps"
        value={query}
        onChangeText={setQuery}
      />

      {/* Map View */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.7749,
          longitude: -122.4194,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {filteredsheltersMaps.map((shelter) => (
          <Marker
            key={shelter.id}
            coordinate={{ latitude: shelter.latitude, longitude: shelter.longitude }}
            title={shelter.name}
            description={`${shelter.address}\nBeds Available: ${shelter.bedsAvailable}`}
          />
        ))}
      </MapView>

      {/* Shelter List */}
      <FlatList
        data={filteredsheltersMaps}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.shelterCard}>
            <Text style={styles.shelterName}>{item.name}</Text>
            <Text>{item.address}</Text>
            <Text>Beds Available: {item.bedsAvailable}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  map: { width: Dimensions.get('window').width, height: 200, marginVertical: 10 },
  shelterCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  shelterName: { fontSize: 18, fontWeight: 'bold' },
});

export default sheltersMaps;
