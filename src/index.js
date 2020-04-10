import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  },[]);

  async function handleAddRepositorie() {
    const response = await api.post('repositories', {
      title: `Challenge ${Date.now()}`,
      url: 'https://github.com/onlyreynaldo/challenge-one',
      techs: ['Node', 'Express']
    });

    const repositorie = response.data;

    setRepositories([...repositories, repositorie]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

      <SafeAreaView style={styles.container}>
        <FlatList 
          data={repositories}
          keyExtractor={repositorie => repositorie.id}
          renderItem={({ item: repositorie }) => (
            <Text style={styles.repositorie}>{repositorie.title}</Text>
          )}
        />

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={handleAddRepositorie}
        >
          <Text style={styles.buttonText}>Adicionar repositorie</Text>
        </TouchableOpacity>
      </SafeAreaView>

      
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
  },

  repositorie: {
    color: '#fff',
    fontSize: 20,
  },

  button: {
    backgroundColor: '#fff',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});