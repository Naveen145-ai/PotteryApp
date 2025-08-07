import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function HomeScreen() {
  const router = useRouter();
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <ScrollView style={styles.wrapper}>
      {/* Drawer Modal */}
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
        {/* Header with Menu Icon */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setDrawerVisible(true)}>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
          <Text style={styles.title}>🏺 Pottery World</Text>
        </View>

        {/* Search Bar */}
        <TextInput placeholder="Search pottery..." style={styles.search} />

        {/* Horizontal Pot Categories */}
        <Text style={styles.subtitle}>Explore Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          <TouchableOpacity style={styles.categoryBox} onPress={() => router.push('/Pots/clay-pots')}>
            <Text style={styles.emoji}>🟫</Text>
            <Text>Clay Pots</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryBox} onPress={() => router.push('/Pots/color-pots')}>
            <Text style={styles.emoji}>🟡</Text>
            <Text>Color Pots</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryBox} onPress={() => router.push('/Pots/decorative-pots')}>
            <Text style={styles.emoji}>🧡</Text>
            <Text>Decorative</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryBox} onPress={() => router.push('/Pots/metal-pots')}>
            <Text style={styles.emoji}>⚙️</Text>
            <Text>Metal Pots</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryBox} onPress={() => router.push('/Pots/glass-pots')}>
            <Text style={styles.emoji}>🔮</Text>
            <Text>Glass Pots</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryBox} onPress={() => router.push('/Pots/handmade-pots')}>
            <Text style={styles.emoji}>✋</Text>
            <Text>Handmade</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f3f0ea',
  },
  container: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  menuIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  search: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  horizontalScroll: {
    marginBottom: 20,
  },
  categoryBox: {
    width: 120,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    elevation: 3,
    marginRight: 12,
  },
  emoji: {
    fontSize: 28,
    marginBottom: 6,
  },
  drawerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
  },
  drawer: {
    backgroundColor: '#fff',
    padding: 20,
    width: '70%',
    height: '100%',
  },
  drawerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  drawerItem: {
    fontSize: 18,
    marginBottom: 16,
  },
});
