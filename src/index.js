import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

import api from './services/api';

// Não possuem valor semântico (significado)
// Não possuem estilização própia
// Todos componentes possuem por padrão "display: flex"
// Não temos herancia de estilos

// View: dev, footer, header, main, aside, section
// Text: p, span, strong, h1, h2, h3

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  },[]);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <View style={styles.container}>
        {repositories.map(repositorie => (
          <Text key={repositorie.id} style={styles.repositorie}>{repositorie.title}</Text>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    justifyContent: 'center',
    alignItems: 'center',
  },

  repositorie: {
    color: '#fff',
    fontSize: 20,
  },
});