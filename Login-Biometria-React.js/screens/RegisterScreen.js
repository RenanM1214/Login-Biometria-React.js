// RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native'; // Corrigido: Importando Text e Image
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const newUser = { name, surname, email, username, password };
      let users = await AsyncStorage.getItem('users');
      users = users ? JSON.parse(users) : [];
      users.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(users));
      navigation.navigate('List');
    } catch (error) {
      console.error('Failed to register user', error);
      alert('Ocorreu um erro ao registrar o usuário.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro Vingador</Text>
      <Image
        source={require('../assets/VingadoresR.jpg')} 
        style={styles.image} // Corrigido: Adicionado estilo para a imagem
      />
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor = "#f1af09"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Sobrenome"
        placeholderTextColor = "#f1af09"
        value={surname}
        onChangeText={setSurname}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor = "#f1af09"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        placeholderTextColor = "#f1af09"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor = "#f1af09"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Cadastrar" onPress={handleRegister} />
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
    color: '#f1af09',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
     borderColor: '#A020F0',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: '#000', // Adicionado um fundo branco para os campos de entrada
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default RegisterScreen;

