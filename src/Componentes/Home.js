import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products?offset=0&limit=20");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    obtenerDatos();
  }, []);

  const manejarProductoVisto = async (producto) => {
    try {
      const historial = await AsyncStorage.getItem('historial');
      let historialActual = historial ? JSON.parse(historial) : [];

      // Evita duplicados por ID
      historialActual = historialActual.filter(p => p.id !== producto.id);
      historialActual.unshift(producto); // Lo más reciente al inicio

      if (historialActual.length > 10) {
        historialActual = historialActual.slice(0, 10); // máximo 10 productos
      }

      await AsyncStorage.setItem('historial', JSON.stringify(historialActual));
    } catch (error) {
      console.error('Error al guardar en historial:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.lista}>
        {data.map((producto) => (
          <TouchableOpacity
            key={producto.id}
            style={styles.item}
            onPress={() => {
              manejarProductoVisto(producto);
              navigation.navigate('ProductoDetalle', { producto });
            }}
          >
            <Text style={styles.texto}>{producto.title}</Text>
            <Image
              source={{ uri: producto.images?.[0] }}
              style={styles.imagen}
            />
          </TouchableOpacity>
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
    borderRadius: 8,
  },
  imagen: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginTop: 8,
    borderRadius: 8,
  },
  texto: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
