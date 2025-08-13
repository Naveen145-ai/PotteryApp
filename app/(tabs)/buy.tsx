import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';




export default function BuyPage() {
  const { cart } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Your Cart</Text>
      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text>{item.name} - ₹{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  item: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  image: { width: 50, height: 50, marginRight: 10 }
});
