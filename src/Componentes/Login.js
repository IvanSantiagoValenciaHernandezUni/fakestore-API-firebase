import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');  // Estado para mensaje de error
  const navigation = useNavigation();

  const handleLogin = async () => {
    setError(''); // Limpiar error previo
    try {
      await signInWithEmailAndPassword(auth, correo, contrasena);
      navigation.replace('Home'); // Ir al Home después del login
    } catch (error) {
      console.log('Error en login:', error); // Para debugging
      setError('Credenciales de usuario y contraseña no válidos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Iniciar Sesión</Text>

      <TextInput
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Contraseña"
        value={contrasena}
        onChangeText={setContrasena}
        style={styles.input}
        secureTextEntry
      />

      <Button title="Ingresar" onPress={handleLogin} />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={{ marginTop: 10 }}>
        <Button title="¿No tienes cuenta? Regístrate" onPress={() => navigation.navigate('Registro')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  titulo: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});
