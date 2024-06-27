import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getFavorites } from '../services/favorites';
import { genres } from '../services/genresMapping'; // Importation du mappage des genres

const FavoritesScreen = ({ navigation }) => {
  const route = useRoute();
  const { profile } = route.params; // Récupération du profil depuis les paramètres de navigation
  const [favorites, setFavorites] = useState([]);
  const [groupedFavorites, setGroupedFavorites] = useState({});

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favs = await getFavorites(profile.name); // Utilisation du nom du profil pour récupérer les favoris
        console.log('Favorites:', favs);
        setFavorites(favs);
        groupFavoritesByGenre(favs);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [profile]);

  const groupFavoritesByGenre = (favorites) => {
    const movieSet = new Set(); // Set pour éviter les duplications
    const grouped = favorites.reduce((acc, movie) => {
      movie.genre_ids.forEach((genreId) => {
        const genreName = genres[genreId];
        if (!movieSet.has(movie.id)) { // Vérifier si le film a déjà été ajouté
          if (!acc[genreName]) {
            acc[genreName] = [];
          }
          acc[genreName].push(movie);
          movieSet.add(movie.id); // Ajouter le film au Set
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
  genreContainer: {
    marginBottom: 20,
  },
  genreHeader: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10,
  },
  poster: {
    width: 120,
    height: 180,
    margin: 5,
    borderRadius: 10,
  },
  titleContainer: {
    width: 120,
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
