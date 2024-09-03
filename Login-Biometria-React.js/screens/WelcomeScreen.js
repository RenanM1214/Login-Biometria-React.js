// WelcomeScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';

const WelcomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Função para autenticação com usuário e senha
  const handleLogin = async () => {
    if (!username || !password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      let users = await AsyncStorage.getItem('users');
      users = users ? JSON.parse(users) : [];
      const user = users.find(u => u.username === username && u.password === password);

      if (user) {
        navigation.navigate('Home');
      } else {
        alert('Credenciais inválidas!');
      }
    } catch (error) {
      console.error('Failed to login', error);
      alert('Ocorreu um erro ao fazer login.');
    }
  };

  // Função para autenticação biométrica
  const handleBiometricLogin = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        alert('Seu dispositivo não suporta autenticação biométrica.');
        return;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        alert('Nenhuma biometria configurada. Configure sua biometria nas configurações do dispositivo.');
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Autentique-se para continuar',
        fallbackLabel: 'Usar senha',
      });

      if (result.success) {
        // Aqui, você pode incluir lógica adicional para verificar o usuário autenticado
        alert('Autenticação bem-sucedida!');
        navigation.navigate('Home');
      } else {
        alert('Falha na autenticação!');
      }
    } catch (error) {
      console.error('Erro ao tentar autenticação biométrica', error);
      alert('Ocorreu um erro ao tentar autenticação biométrica.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro Vingador</Text>
      <Image
        source={require('../assets/VingadoresR.jpg')} 
        style={styles.image}
      />
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        placeholderTextColor="#f1af09"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#f1af09"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Login com biometria"
        onPress={handleBiometricLogin}
        color="#007BFF"
      />
      <Button
        title="Registrar"
        onPress={() => navigation.navigate('Register')}
        color="#841584"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#f1af09'
  },
  image: {
    width: 180, 
    height: 180, 
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#A020F0',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    color: '#fff',
  },
});

export default WelcomeScreen;

