import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useFavorites } from '../contexts/FavoritesContext';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function DetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { addToFavorites } = useFavorites();

  const [title, setTitle] = useState(route.params.title || '');
  const [body, setBody] = useState(route.params.body || '');
  const [image, setImage] = useState(null);

  const handleAddToFavorites = () => {
    addToFavorites({ id: route.params.id, title, body, image });
    Alert.alert('Добавлено в избранное!');
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Разрешение на доступ к галерее необходимо!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>← НАЗАД</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={handleAddToFavorites}>
        <FontAwesome name="star" size={16} color="#fff" />
        <Text style={styles.buttonText}> В ИЗБРАННОЕ</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={pickImage}>
        <FontAwesome name="image" size={16} color="#fff" />
        <Text style={styles.buttonText}> Загрузить изображение</Text>
      </Pressable>

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Введите заголовок"
      />
      <TextInput
        style={styles.textArea}
        value={body}
        onChangeText={setBody}
        placeholder="Введите описание"
        multiline
      />

      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: '100%', height: 200, marginTop: 16 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    padding: 10,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 6,
  },
  input: {
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    paddingBottom: 6,
    marginTop: 12,
  },
  textArea: {
    fontSize: 16,
    marginTop: 8,
    borderWidth: 1,
    padding: 8,
    borderRadius: 6,
    height: 100,
    textAlignVertical: 'top',
  },
});
