import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function ProductoDetalle({ route }) {
  const { producto } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: producto.images?.[0] }}
        style={styles.image}
      />
      <Text style={styles.title}>{producto.title}</Text>
      <Text style={styles.price}>${producto.price}</Text>
      <Text style={styles.category}>
        Categoría: {producto.category?.name || 'Sin categoría'}
      </Text>
      <Text style={styles.description}>{producto.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    color: 'green',
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    marginBottom: 10,
    color: '#777',
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
  },
});
