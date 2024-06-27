import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorites';

export const getFavorites = async (profileName) => {
  try {
    const favorites = await AsyncStorage.getItem(`${FAVORITES_KEY}_${profileName}`);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return [];
  }
};

export const addFavorite = async (movie, profileName) => {
  try {
    const favorites = await getFavorites(profileName);
    const updatedFavorites = [...favorites, movie];
    await AsyncStorage.setItem(`${FAVORITES_KEY}_${profileName}`, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('Error adding favorite:', error);
  }
};

export const removeFavorite = async (movieId, profileName) => {
  try {
    const favorites = await getFavorites(profileName);
    const updatedFavorites = favorites.filter((fav) => fav.id !== movieId);
    await AsyncStorage.setItem(`${FAVORITES_KEY}_${profileName}`, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('Error removing favorite:', error);
  }
};
