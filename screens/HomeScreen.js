import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const router = useRouter(); // ✅ здесь правильно
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => {
        const localized = data.slice(0, 20).map((item) => ({
          ...item,
          title: `Новость №${item.id}`,
          body: `Это пример описания для новости №${item.id}.`
        }));
        setArticles(localized);
      })
      .catch((error) => console.error('Fetch error:', error));
  }, []);
  

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() =>
        router.push(
          `/article/${item.id}?title=${encodeURIComponent(item.title)}&body=${encodeURIComponent(item.body)}`
        )
      }>
      <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        <Text numberOfLines={2}>{item.body}</Text>
      </View>
    </Pressable>
  );

  if (articles.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Загрузка новостей...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>News List</Text>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
});

export default HomeScreen;
