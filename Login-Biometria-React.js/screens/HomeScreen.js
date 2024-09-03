// HomeScreen.js
import React from 'react';
import { View, Button, StyleSheet, Text, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Vingador</Text>
      <Image
        source={require('../assets/VingadoresR.jpg')}
        style={styles.image}
      />
      <View style={styles.buttonContainer}>
        <Button title="Cadastrar" onPress={() => navigation.navigate('Register')} />
        <Button title="Lista de Cadastros" onPress={() => navigation.navigate('List')} />
      </View>
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
    fontWeight: 'bold',
    color: '#f1af09',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default HomeScreen;

