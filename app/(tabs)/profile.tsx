import { View, Text, StyleSheet, FlatList, Image, TextInput, Button, Alert } from 'react-native';
import { useState, useEffect } from 'react';

// Example email from login (should come from secure auth/session)
const loggedInEmail = "john@example.com";

export default function ProfileScreen() {
  const [user, setUser] = useState({
    name: '',
    email: loggedInEmail,
    role: 'Buyer',
  });

  const [orders, setOrders] = useState([
    {
      id: '1',
      item: 'Clay Pot',
      date: '2025-08-01',
      image: 'https://cdn.pixabay.com/photo/2020/06/14/21/45/clay-pot-5300004_1280.jpg',
    },
  ]);

  const handleSaveProfile = () => {
    // Here you would send user data to backend
    Alert.alert("Profile Saved", `Name: ${user.name}`);
    // Optionally: fetch or sync updated profile
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Profile</Text>

      <View style={styles.profileBox}>
        <Text style={styles.label}>Your Name</Text>
        <TextInput
          placeholder="Enter your name"
          style={styles.input}
          value={user.name}
          onChangeText={(name) => setUser({ ...user, name })}
        />

        <Text style={styles.label}>Email (not editable)</Text>
        <Text style={styles.readOnlyField}>{user.email}</Text>

        <Text style={styles.label}>Role</Text>
        <Text style={styles.readOnlyField}>{user.role}</Text>

        <Button title="Save Profile" onPress={handleSaveProfile} />
      </View>

      <Text style={styles.sectionTitle}>🛍️ Order History</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.orderList}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Image source={{ uri: item.image }} style={styles.orderImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.orderText}>{item.item}</Text>
              <Text style={styles.orderDate}>📅 {item.date}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#eef6f9', padding: 20,
  },
  title: {
    fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 20,
  },
  profileBox: {
    backgroundColor: '#fff', padding: 16, borderRadius: 10, marginBottom: 24, elevation: 3,
  },
  label: {
    fontSize: 16, fontWeight: '500', marginTop: 8,
  },
  input: {
    backgroundColor: '#f1f1f1', padding: 10, borderRadius: 8, marginTop: 4,
    marginBottom: 8,
  },
  readOnlyField: {
    backgroundColor: '#f9f9f9', padding: 10, borderRadius: 8, color: '#555',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20, fontWeight: '600', marginBottom: 12,
  },
  orderList: {
    paddingBottom: 100,
  },
  orderItem: {
    flexDirection: 'row', backgroundColor: '#fff', padding: 12,
    borderRadius: 10, marginBottom: 12, elevation: 2, alignItems: 'center',
  },
  orderImage: {
    width: 60, height: 60, borderRadius: 8, marginRight: 12,
  },
  orderText: {
    fontSize: 16, fontWeight: '500',
  },
  orderDate: {
    fontSize: 14, color: '#666',
  },
});
