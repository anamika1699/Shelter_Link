import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { db } from ''; // Adjust the path to firebase.js
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

interface Shelter {
  id: string;
  name: string;
  bedsAvailable: number;
}

export default function UpdateBeds() {
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'shelters'));
        const shelterData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Shelter[];
        setShelters(shelterData);
      } catch (error) {
        console.error('Error fetching shelters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShelters();
  }, []);

  const updateBedsCount = async (id: string, newCount: number) => {
    try {
      const docRef = doc(db, 'shelters', id);
      await updateDoc(docRef, { bedsAvailable: newCount });
      setShelters((prevShelters) =>
        prevShelters.map((shelter) =>
          shelter.id === id ? { ...shelter, bedsAvailable: newCount } : shelter
        )
      );
    } catch (error) {
      console.error('Error updating beds count:', error);
    }
  };

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
      <Text style={styles.title}>Update Beds Available</Text>
      <FlatList
        data={shelters}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>Beds Available: {item.bedsAvailable}</Text>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => updateBedsCount(item.id, item.bedsAvailable + 1)}
              >
                <Text style={styles.buttonText}>+ Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  updateBedsCount(item.id, Math.max(item.bedsAvailable - 1, 0))
                }
              >
                <Text style={styles.buttonText}>- Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
  },
  details: {
    flex: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
