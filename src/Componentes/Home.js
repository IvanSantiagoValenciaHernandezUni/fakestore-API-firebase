import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    obtenerDatos();
  }, []);

  return (
    <ScrollView>
      <View style={styles.lista}>
        {data.map((producto) => (
          <View key={producto.id} style={styles.item}>
            <Text>{producto.id} - {producto.title}</Text>
            <Image
              source={{ uri: producto.images?.[0] }}
              style={styles.imagen}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  lista: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    justifyContent: 'space-between',
    padding: 10,
  },
  item: {
    backgroundColor: 'aliceblue',
    width: '48%',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  imagen: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  buscador: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
});
