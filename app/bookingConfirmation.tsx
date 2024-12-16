import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function BookingConfirmation() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Confirmed</Text>
      <Text style={styles.subtitle}>The Shelter Spot is Reserved!</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Booking Confirmed</Text>
        <Text style={styles.cardSubtitle}>
          Your booking has been successfully confirmed.
        </Text>
      </View>
      <Text style={styles.timer}>1:25:59</Text>
      <TouchableOpacity style={styles.directionsButton} onPress={() => {}}>
        <Text style={styles.directionsButtonText}>Get Directions</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.emergencyButton} onPress={() => {}}>
        <Text style={styles.emergencyButtonText}>Emergency Contact</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: '#fff',
    fontSize: 14,
  },
  timer: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 16,
  },
  directionsButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  directionsButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  emergencyButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  emergencyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
