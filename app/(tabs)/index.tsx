import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, FlatList, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';

export default function HomeScreen() {
  const router = useRouter();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [pots, setPots] = useState([]);
  const [hasNewPots, setHasNewPots] = useState(false);

  useEffect(() => {
    fetchPots();

    // 🔄 Poll every 5 seconds
    const interval = setInterval(() => {
      fetchPots();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchPots = async () => {
    try {
      const res = await fetch("http://192.168.160.242:5000/api/v1/getAllPots");
      const data = await res.json();
      if (data.success) {
        // Check if new pots are added
        if (pots.length && data.pots.length > pots.length) {
          setHasNewPots(true);
        }
        setPots(data.pots);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderHeader = () => (
    <View style={styles.container}>
      {/* Drawer */}
      <Modal visible={drawerVisible} animationType="slide" transparent>
        <View style={styles.drawerOverlay}>
          <View style={styles.drawer}>
            <Text style={styles.drawerTitle}>☰ Menu</Text>
            <TouchableOpacity onPress={() => { setDrawerVisible(false); router.push('/settings'); }}>
              <Text style={styles.drawerItem}>⚙️ Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setDrawerVisible(false); }}>
              <Text style={styles.drawerItem}>📞 Contact Us</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setDrawerVisible(false); }}>
              <Text style={styles.drawerItem}>🌙 Dark Mode</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDrawerVisible(false)}>
              <Text style={styles.drawerItem}>❌ Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setDrawerVisible(true)}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.title}>🏺 Pottery World</Text>

        {/* Notification Dot */}
        <TouchableOpacity onPress={() => {
          router.push('/notifications');
          setHasNewPots(false);
        }}>
          <Text style={{ fontSize: 24 }}>🔔</Text>
          {hasNewPots && <View style={styles.redDot} />}
        </TouchableOpacity>
      </View>

      {/* Search */}
      <TextInput placeholder="Search pottery..." style={styles.search} />

      {/* Categories */}
      <Text style={styles.subtitle}>Explore Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {/* category buttons */}
      </ScrollView>
    </View>
  );

  return (
    <FlatList
      style={styles.wrapper}
      data={pots}
      keyExtractor={(item) => item._id}
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.potItem}
          onPress={() => router.push({ pathname: '/buy', params: { id: item._id, name: item.name, price: item.price, image: item.image } })}
        >
          <Image
            source={{ uri: item.image || "https://i.imgur.com/OQ9qg5h.jpg" }}
            style={styles.image}
          />
          <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
          <Text>{item.category}</Text>
          <Text style={{ color: "green" }}>₹{item.price}</Text>
          <View style={{ marginTop: 8, backgroundColor: '#007bff', padding: 8, borderRadius: 6 }}>
            <Text style={{ color: '#fff', textAlign: 'center' }}>Buy Now</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#f3f0ea' },
  container: { padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  menuIcon: { fontSize: 28 },
  title: { fontSize: 24, fontWeight: 'bold' },
  search: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginVertical: 20 },
  subtitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  horizontalScroll: { marginBottom: 20 },
  potItem: { backgroundColor: '#fff', padding: 10, marginBottom: 10, borderRadius: 10 },
  image: { width: 100, height: 100, borderRadius: 8, marginBottom: 8 },
  redDot: {
    position: 'absolute',
    right: -2,
    top: -2,
    width: 10,
    height: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  drawerOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  drawer: { width: 250, backgroundColor: '#fff', padding: 20, height: '100%' },
  drawerTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  drawerItem: { fontSize: 16, paddingVertical: 10 }
});
