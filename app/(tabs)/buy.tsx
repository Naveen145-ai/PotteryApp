import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { CartContext } from '../../context/CartContext';

const BuyPage = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const handlePlaceOrder = async (item) => {
    try {
      // Prepare body to match your backend order model
      const orderBody = {
        userId: '64f8d8a1b2e3f7c5a1234567', // replace with logged-in userId
        items: [
          {
            potId: item.id, // Your frontend item id must match backend Pot _id
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1
          }
        ]
      };

      const response = await fetch('http://192.168.160.242:5000/api/v1/orders/place', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderBody)
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', `Order placed for ${item.name}`);
        removeFromCart(item.id); // Remove from cart after placing order
      } else {
        Alert.alert('Error', data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to place order');
    }
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
