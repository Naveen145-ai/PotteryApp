import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useEffect, useState } from 'react';

// Mock user data (replace this with real user context or props)
const mockUser = {
  name: "👤 John Doe",
  email: "john@example.com",
  role: "Buyer",
};

// Mock order history (replace with real API fetch later)
const mockOrders = [
  { id: '1', item: 'Clay Pot', date: '2025-08-01', image: 'https://cdn.pixabay.com/photo/2020/06/14/21/45/clay-pot-5300004_1280.jpg' },
  { id: '2', item: 'Color Pot', date: '2025-08-04', image: 'https://cdn.pixabay.com/photo/2016/09/18/21/28/clay-pot-1672064_1280.jpg' },
  { id: '3', item: 'Metal Pot', date: '2025-08-06', image: 'https://cdn.pixabay.com/photo/2022/07/07/15/13/pot-7306816_1280.jpg' },
];

export default function ProfileScreen() {
  const [user, setUser] = useState(mockUser);
  const [orders, setOrders] = useState(mockOrders);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Profile</Text>

      {/* User Info */}
      <View style={styles.profileBox}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>📧 {user.email}</Text>
        <Text style={styles.role}>🧑‍💼 Role: {user.role}</Text>
      </View>

      {/* Order History */}
      <Text style={styles.sectionTitle}>🛍️ Order History</Text>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
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
  name: {
    fontSize: 20, fontWeight: 'bold', marginBottom: 6,
  },
  email: {
    fontSize: 16, marginBottom: 4, color: '#333',
  },
  role: {
    fontSize: 16, color: '#555',
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
