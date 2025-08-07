import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>🏺 Welcome to Pottery World!</Text>

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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
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
});
