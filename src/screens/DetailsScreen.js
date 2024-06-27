import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, Button } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import CastList from '../components/DetailsScreen/CastList';
import ReviewsList from '../components/DetailsScreen/ReviewsList';
import Trailer from '../components/DetailsScreen/Trailer';
import { addFavorite, removeFavorite, getFavorites } from '../services/favorites';
import styles from '../styles/DetailsScreenStyles'; // Importation des styles

const API_KEY = '89e802175d8ccb6b4549eef6f85c78ec';

const DetailsScreen = () => {
  const route = useRoute();
  const { movie, profile } = route.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&append_to_response=credits,reviews,videos`);
        setDetails(response.data);
        const favorites = await getFavorites(profile.name); // Use profile name to fetch favorites
        const favorite = favorites.find(fav => fav.id === movie.id);
        setIsFavorite(!!favorite);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movie, profile]);

  const handleFavoriteToggle = async () => {
    if (isFavorite) {
      await removeFavorite(movie.id, profile.name); // Use profile name to remove favorite
      setIsFavorite(false);
    } else {
      await addFavorite(movie, profile.name); // Use profile name to add favorite
      setIsFavorite(true);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  const videoKey = details.videos && details.videos.results && details.videos.results.length > 0 ? details.videos.results[0].key : null;
  const videoUri = videoKey ? `https://www.youtube.com/embed/${videoKey}` : null;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${details.poster_path}` }} style={styles.poster} />
      <Text style={styles.title}>{details.title}</Text>
      <Text style={styles.overview}>{details.overview}</Text>
      <Button
        title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        onPress={handleFavoriteToggle}
      />
      <CastList cast={details.credits.cast} />
      <ReviewsList reviews={details.reviews.results} />
      <Trailer videoUri={videoUri} />
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};

export default DetailsScreen;
