import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native';

interface Filters {
  openNow: boolean;
  petFriendly: boolean;
  wheelchairAccessible: boolean;
  distance: number;
}

const Filters: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    openNow: true,
    petFriendly: false,
    wheelchairAccessible: false,
    distance: 5, // Default distance in miles
  });

  const toggleSwitch = (key: keyof Filters) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleApplyFilters = () => {
    console.log('Applied Filters:', filters);
    // You can pass filters back to your shelter list screen
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Customize Shelter Search</Text>

      {/* Open Now Filter */}
      <View style={styles.filterGroup}>
        <Text style={styles.filterLabel}>Open Now</Text>
        <Switch
          value={filters.openNow}
          onValueChange={() => toggleSwitch('openNow')}
        />
      </View>

      {/* Pet Friendly Filter */}
      <View style={styles.filterGroup}>
        <Text style={styles.filterLabel}>Pet Friendly</Text>
        <Switch
          value={filters.petFriendly}
          onValueChange={() => toggleSwitch('petFriendly')}
        />
      </View>

      {/* Wheelchair Accessible Filter */}
      <View style={styles.filterGroup}>
        <Text style={styles.filterLabel}>Wheelchair Accessible</Text>
        <Switch
          value={filters.wheelchairAccessible}
          onValueChange={() => toggleSwitch('wheelchairAccessible')}
        />
      </View>

      {/* Distance Filter */}
      <View style={styles.filterGroup}>
        <Text style={styles.filterLabel}>Distance</Text>
        <View style={styles.distanceOptions}>
          {[1, 5, 10, 20].map((distance) => (
            <TouchableOpacity
              key={distance}
              style={[
                styles.distanceOption,
                filters.distance === distance && styles.selectedDistance,
              ]}
              onPress={() => setFilters((prev) => ({ ...prev, distance }))}
            >
              <Text
                style={[
                  styles.distanceText,
                  filters.distance === distance && styles.selectedDistanceText,
                ]}
              >
                {distance} miles
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Apply Filters Button */}
      <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
        <Text style={styles.applyButtonText}>Apply Filters</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  filterGroup: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  distanceOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  distanceOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedDistance: {
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
  },
  distanceText: {
    fontSize: 14,
  },
  selectedDistanceText: {
    color: '#fff',
  },
  applyButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Filters;
