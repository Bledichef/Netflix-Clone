import AsyncStorage from '@react-native-async-storage/async-storage';

export const getFavorites = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@favorites');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const addFavorite = async (movie) => {
  try {
    const favorites = await getFavorites();
    const newFavorites = [...favorites, movie];
    await AsyncStorage.setItem('@favorites', JSON.stringify(newFavorites));
  } catch (e) {
    console.error(e);
  }
};

export const removeFavorite = async (movieId) => {
  try {
    const favorites = await getFavorites();
    const newFavorites = favorites.filter(movie => movie.id !== movieId);
    await AsyncStorage.setItem('@favorites', JSON.stringify(newFavorites));
  } catch (e) {
    console.error(e);
  }
};
