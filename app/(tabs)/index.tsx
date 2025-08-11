import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';

export default function HomeScreen() {
  const router = useRouter();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [pots, setPots] = useState([]);
  const [hasNewPots, setHasNewPots] = useState(false);

  useEffect(() => {
    fetchPots();
  }, []);

  const fetchPots = async () => {
    try {
      const res = await fetch("http://192.168.160.242:5000/api/v1/getAllPots"); // Replace YOUR_IP
      const data = await res.json();
      if (data.success) {
        setPots(data.pots);

        // 🔴 Mark that there are new pots (for notifications)
        setHasNewPots(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.wrapper}>
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

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setDrawerVisible(true)}>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
          <Text style={styles.title}>🏺 Pottery World</Text>

          {/* 🔴 Notification Dot */}
          <TouchableOpacity onPress={() => {
            router.push('/notifications');
            setHasNewPots(false); // remove dot after visiting notifications
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
          {/* ... your category buttons */}
        </ScrollView>

        {/* Pots List */}
        <FlatList
          data={pots}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.potItem}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text>{item.name}</Text>
              <Text>{item.category}</Text>
              <Text>₹{item.price}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
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
  }
});
