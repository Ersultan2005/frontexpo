import { View, Text, StyleSheet, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useFavorites } from '../../contexts/FavoritesContext';

export default function DetailScreen() {
  const { title, body, id } = useLocalSearchParams();
  const router = useRouter();
  const { addToFavorites } = useFavorites();

  return (
    <View style={styles.container}>
      <Button title="← Назад" onPress={() => router.back()} />
      <Button
        title="★ В избранное"
        onPress={() => addToFavorites({ id, title, body })}
      />
      <Text style={styles.title}>{title}</Text>
      <Text>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
});
