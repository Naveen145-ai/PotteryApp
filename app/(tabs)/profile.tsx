import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>👤 Profile</Text>
      <Text style={styles.email}>Email: user@example.com</Text>
      <Text style={styles.role}>Role: Buyer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eef6f9',
  },
  name: {
    fontSize: 22, fontWeight: 'bold', marginBottom: 8,
  },
  email: {
    fontSize: 16, marginBottom: 4,
  },
  role: {
    fontSize: 16,
  },
});
