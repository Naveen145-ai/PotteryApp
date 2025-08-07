import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function ClayPotsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🟫 Clay Pots</Text>
      {/* Example Image Section */}
      <Image source={require('@/assets/images/clay1.png')} style={styles.image} />
      
      {/* Add more images as needed */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20, backgroundColor: '#fff',
  },
  title: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 16,
  },
  image: {
    width: '100%', height: 200, borderRadius: 12, marginBottom: 12,
  },
});
