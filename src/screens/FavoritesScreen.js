import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getFavorites } from '../services/favorites';
import { genres } from '../services/genresMapping';
import styles from '../styles/FavoritesScreenStyles'; // Importer les styles depuis le fichier de styles

const FavoritesScreen = ({ navigation }) => {
  const route = useRoute();
  const profile = route.params ? route.params.profile : null;
  const [favorites, setFavorites] = useState([]);
  const [groupedFavorites, setGroupedFavorites] = useState({});

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favs = await getFavorites(profile.name);
        setFavorites(favs);
        groupFavoritesByGenre(favs);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [profile]);

  const groupFavoritesByGenre = (favorites) => {
    const movieSet = new Set();
    const grouped = favorites.reduce((acc, movie) => {
      movie.genre_ids.forEach((genreId) => {
        const genreName = genres[genreId];
        if (!movieSet.has(movie.id)) {
          if (!acc[genreName]) {
            acc[genreName] = [];
          }
          acc[genreName].push(movie);
          movieSet.add(movie.id);
        }
      });
      return acc;
    }, {});
    setGroupedFavorites(grouped);
  };

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { movie: item, profile })}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }} style={styles.poster} />
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>My Favorites</Text>
      {Object.keys(groupedFavorites).length === 0 ? (
        <Text style={styles.noFavorites}>No favorites added yet.</Text>
      ) : (
        Object.keys(groupedFavorites).map((genre) => (
          <View key={genre} style={styles.genreContainer}>
            <Text style={styles.genreHeader}>{genre}</Text>
            <FlatList
              horizontal
              data={groupedFavorites[genre]}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderMovieItem}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default FavoritesScreen;
