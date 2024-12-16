import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { db } from ''; // Adjust the path to your firebase.js
import { doc, getDoc, updateDoc } from 'firebase/firestore';

interface Shelter {
  name: string;
  address: string;
  bedsAvailable: number;
  description: string;
  services: string[];
  image: string;
}

export default function ShelterDetails() {
  const { id } = useLocalSearchParams();
  const [shelter, setShelter] = useState<Shelter | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchShelter = async () => {
      if (!id) return;

      try {
        const docRef = doc(db, 'shelters', id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setShelter(docSnap.data() as Shelter);
        }
      } catch (error) {
        console.error('Error fetching shelter details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShelter();
  }, [id]);

  const handleBooking = async () => {
    if (!shelter || shelter.bedsAvailable <= 0) {
      Alert.alert('Error', 'No beds available for booking.');
      return;
    }

    try {
      const docRef = doc(db, 'shelters', id as string);
      await updateDoc(docRef, { bedsAvailable: shelter.bedsAvailable - 1 });

      setShelter((prev) => {
        if (prev) {
          return { ...prev, bedsAvailable: prev.bedsAvailable - 1 };
        }
        return prev;
      });

      // Navigate to the Booking Confirmation page
      router.push(`/bookingConfirmation?id=${id}`);
    } catch (error) {
      console.error('Error processing booking:', error);
      Alert.alert('Error', 'Could not process the booking. Please try again.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text>Loading Shelter Details...</Text>
      </View>
    );
  }

  if (!shelter) {
    return (
      <View style={styles.errorContainer}>
        <Text>Could not load shelter details. Please try again.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: shelter.image }} style={styles.image} />
      <Text style={styles.name}>{shelter.name}</Text>
      <Text style={styles.address}>{shelter.address}</Text>
      <Text style={styles.beds}>Beds Available: {shelter.bedsAvailable}</Text>
      <Text style={styles.description}>{shelter.description}</Text>
      <Text style={styles.servicesTitle}>Services:</Text>
      {shelter.services.map((service, index) => (
        <Text key={index} style={styles.service}>
          - {service}
        </Text>
      ))}

      {/* Book Now Button */}
      <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  address: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  beds: {
    fontSize: 14,
    color: '#007BFF',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  servicesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  service: {
    fontSize: 14,
    marginBottom: 4,
  },
  bookButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
