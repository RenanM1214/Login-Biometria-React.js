//ListScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        let users = await AsyncStorage.getItem('users');
        users = users ? JSON.parse(users) : [];
        setUsers(users);
      } catch (error) {
        console.error('Failed to load users', error);
        alert('Ocorreu um erro ao carregar os usuários.');
      }
    };
    loadUsers();
  }, []);

  const showUsersJson = () => {
    const json = JSON.stringify(users, null, 2); // Format JSON with indentation
    Alert.alert("Dados dos Usuários", json);
  };

  const handleEdit = (index) => {
    navigation.navigate('Edit', { user: users[index], index });
  };

  const handleDelete = async (index) => {
    const newUsers = users.filter((_, i) => i !== index);
    setUsers(newUsers);
    await AsyncStorage.setItem('users', JSON.stringify(newUsers));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.userItem}>
            <Text>{item.name} {item.surname}</Text>
            <Text>{item.email}</Text>
            <Text>{item.username}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Editar" onPress={() => handleEdit(index)} />
              <Button title="Excluir" onPress={() => handleDelete(index)} />
            </View>
          </View>
        )}
      />
      <Button title="Exibir JSON" onPress={showUsersJson} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f44336',
  },
  userItem: {
    padding: 20,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ListScreen;
