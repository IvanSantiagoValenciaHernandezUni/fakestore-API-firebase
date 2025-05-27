import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';

export default function HistorialCompras() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const res = await fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=10');
        const data = await res.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al cargar historial:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompras();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.images[0] }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.description}>{item.description.slice(0, 80)}...</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🧾 Historial de Compras</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={productos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    marginVertical: 8,
    padding: 10,
    borderRadius: 8,
    elevation: 2,
  },
  image: { width: 80, height: 80, marginRight: 10, borderRadius: 8 },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 14, color: 'green', marginVertical: 4 },
  description: { fontSize: 12, color: '#555' },
});
