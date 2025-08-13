import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { CartContext } from '../../context/CartContext';

const BuyPage = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const handlePlaceOrder = (item) => {
    // ✅ Store in DB (API call placeholder)
    // Example: await fetch("http://your-api/orders", { method: "POST", body: JSON.stringify(item) })
    Alert.alert('Order placed successfully for', item.name);
    removeFromCart(item.id); // ✅ Remove from cart after placing order
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Cart</Text>

      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>₹{item.price}</Text>
              </View>

              {/* Place Order Button */}
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: 'green' }]}
                onPress={() => handlePlaceOrder(item)}
              >
                <Text style={styles.actionText}>Place Order</Text>
              </TouchableOpacity>

              {/* Remove Button */}
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: 'red' }]}
                onPress={() => removeFromCart(item.id)}
              >
                <Text style={styles.actionText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default BuyPage;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  emptyText: { fontSize: 16, color: 'gray', textAlign: 'center', marginTop: 20 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  image: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
  name: { fontSize: 16 },
  price: { fontSize: 14, color: 'gray' },
  actionBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  actionText: { color: '#fff', fontSize: 12 },
});
