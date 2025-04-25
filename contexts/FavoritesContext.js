import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Создаем контекст
const FavoritesContext = createContext();

// Провайдер, оборачивает приложение
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Загружаем избранные из AsyncStorage при старте
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const stored = await AsyncStorage.getItem('favorites');
        if (stored) {
          setFavorites(JSON.parse(stored));
        }
      } catch (e) {
        console.error('Ошибка загрузки избранного:', e);
      }
    };
    loadFavorites();
  }, []);

  // Сохраняем избранные при изменении
  useEffect(() => {
    AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Добавляем статью в избранное
  const addToFavorites = (article) => {
    // проверка на дубликат по title + body
    const exists = favorites.find(
      (item) => item.title === article.title && item.body === article.body
    );
    if (!exists) {
      setFavorites((prev) => [...prev, article]);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Хук для использования
export const useFavorites = () => useContext(FavoritesContext);
