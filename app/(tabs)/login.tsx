import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";

export default function ShelterSearch() {
  const [filters, setFilters] = useState({
    openNow: true,
    healthServices: true,
    petFriendly: true,
    allGenders: true,
    womenOnly: false,
    menOnly: false,
    families: false,
    youth: false,
    adults: true,
    children: false,
    youngAdults: false,
    seniors: false,
    driving: true,
    biking: false,
    walking: true,
    withinBlocks: false,
  });

  const toggleFilter = (key: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderSwitch = (label: string, key: keyof typeof filters) => {
    return (
      <View style={styles.filterRow} key={key}>
        <Text style={styles.filterLabel}>{label}</Text>
        <Switch
          value={filters[key]}
          onValueChange={() => toggleFilter(key)}
          thumbColor={filters[key] ? "#34C759" : "#ddd"}
          trackColor={{ false: "#ddd", true: "#34C759" }}
        />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Find an Open Shelter</Text>
      <Text style={styles.subHeader}>
        Enter your city name to find the closest shelter.
      </Text>

      <Text style={styles.title}>Book a Shelter Spot Now</Text>
      <Text style={styles.subtitle}>
        Real-Time Shelter Availability at Your Fingertips!
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.filterButton}>
        <Text style={styles.filterButtonText}>Customize Shelter Search</Text>
      </TouchableOpacity>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={[styles.actionButton, styles.cleanButton]}>
          <Text style={styles.actionButtonText}>Clean</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.searchButton]}>
          <Text style={styles.actionButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Suggested</Text>
      {renderSwitch("Open Now", "openNow")}
      {renderSwitch("Health Services Available", "healthServices")}
      {renderSwitch("Pet Friendly", "petFriendly")}

      <Text style={styles.sectionTitle}>Community Focus</Text>
      {renderSwitch("All Genders", "allGenders")}
      {renderSwitch("Women-Only", "womenOnly")}
      {renderSwitch("Men-Only", "menOnly")}
      {renderSwitch("Families", "families")}
      {renderSwitch("Youth", "youth")}
      {renderSwitch("Adults", "adults")}

      <Text style={styles.sectionTitle}>Age Group Support</Text>
      {renderSwitch("Children (0-17 years)", "children")}
      {renderSwitch("Young Adults (18-24 years)", "youngAdults")}
      {renderSwitch("Adults (25-64 years)", "adults")}
      {renderSwitch("Seniors (65+ years)", "seniors")}

      <Text style={styles.sectionTitle}>Distance</Text>
      {renderSwitch("Driving (5 mi.)", "driving")}
      {renderSwitch("Biking (2 mi.)", "biking")}
      {renderSwitch("Walking (1 mi.)", "walking")}
      {renderSwitch("Within 4 Blocks", "withinBlocks")}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  filterButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignSelf: "center",
  },
  filterButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cleanButton: {
    backgroundColor: "#6c757d",
  },
  searchButton: {
    backgroundColor: "#007bff",
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 10,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  filterLabel: {
    fontSize: 14,
    color: "#333",
  },
});
