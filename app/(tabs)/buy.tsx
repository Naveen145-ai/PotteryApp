import { View, Text, StyleSheet } from 'react-native';

export default function BuyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🛍 Browse and buy beautiful pottery!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fffaf3',
  },
  text: {
    fontSize: 18,
  },
});
