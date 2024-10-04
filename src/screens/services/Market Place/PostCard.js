import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function PostCard({ post }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: post.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{post.name}</Text>
        <Text style={styles.description}>
          {post.description.length > 60
            ? `${post.description.substring(0, 60)}...`
            : post.description}
        </Text>
        <Text style={styles.price}>Price: {post.price} per {post.unit}</Text>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.actionButton} onPress={() => alert('Message functionality coming soon!')}>
          <FontAwesome name="comment" size={16} color="#fff" />
          <Text style={styles.buttonText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => alert('Added to cart!')}>
          <FontAwesome name="cart-plus" size={16} color="#fff" />
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => alert('Proceeding to buy!')}>
          <FontAwesome name="shopping-cart" size={16} color="#fff" />
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    color: '#666',
    fontSize: 14,
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  actionButton: {
    backgroundColor: '#388E3C',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 14,
  },
});
