import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { getFavorites } from '../services/favorites';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favs = await getFavorites();
        console.log('Favorites:', favs); 
        setFavorites(favs);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { movie: item })}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }} style={styles.poster} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Favorites</Text>
      {favorites.length === 0 ? (
        <Text style={styles.noFavorites}>No favorites added yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovieItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  header: {
    color: '#fff',
    fontSize: 24,
    marginVertical: 10,
  },
  poster: {
    width: 120,
    height: 180,
    margin: 5,
    borderRadius: 10,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
  },
  noFavorites: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FavoritesScreen;
