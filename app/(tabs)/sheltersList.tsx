import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { db } from '/Users/ayushsahni/Desktop/Documents/Projects/shelter_link/ShelterLink/firebase.js'; // Adjust the path to firebase.js
import { collection, getDocs } from 'firebase/firestore';

interface Shelter {
  id: string;
  name: string;
  address: string;
  bedsAvailable: number;
  isOpen: boolean;
  distance: number;
}

export default function ShelterList() {
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'shelters'));
        const fetchedShelters = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Shelter[];
        setShelters(fetchedShelters);
      } catch (error) {
        console.error('Error fetching shelters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShelters();
  }, []);

  const filteredShelters = shelters.filter((shelter) =>
    shelter.name.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text>Loading Shelters...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shelters Near You</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name or city"
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={filteredShelters}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/shelterDetails/${item.id}`)}
          >
            <Text style={styles.shelterName}>{item.name}</Text>
            <Text style={styles.address}>{item.address}</Text>
            <Text style={styles.distance}>{item.distance.toFixed(1)} miles away</Text>
            <View style={styles.cardFooter}>
              <Text
                style={[
                  styles.availability,
                  item.isOpen ? styles.open : styles.closed,
                ]}
              >
                {item.isOpen ? 'Open Now' : 'Closed'}
              </Text>
              <Text style={styles.beds}>Beds Available: {item.bedsAvailable}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.noShelters}>No shelters found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  shelterName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  distance: {
    fontSize: 12,
    color: '#007BFF',
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  availability: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  open: {
    color: '#28a745',
  },
  closed: {
    color: '#dc3545',
  },
  beds: {
    fontSize: 14,
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noShelters: {
    textAlign: 'center',
    color: '#555',
    fontSize: 16,
    marginTop: 20,
  },
});
