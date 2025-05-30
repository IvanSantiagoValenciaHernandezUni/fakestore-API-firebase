import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase/firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function Logout() {
  const navigation = useNavigation();

  useEffect(() => {
    const cerrarSesion = async () => {
      try {
        await signOut(auth);
        navigation.replace('Login');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    };
    cerrarSesion();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
