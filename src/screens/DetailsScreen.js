import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, Dimensions, Button } from 'react-native';
import axios from 'axios';
import { WebView } from 'react-native-webview';
import { addFavorite, removeFavorite, getFavorites } from '../services/favorites';

const API_KEY = '89e802175d8ccb6b4549eef6f85c78ec';

const DetailsScreen = ({ route }) => {
  const { movie } = route.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&append_to_response=credits,reviews,videos`);
        setDetails(response.data);
        const favorites = await getFavorites();
        const favorite = favorites.find(fav => fav.id === movie.id);
        setIsFavorite(!!favorite);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movie]);

  const handleFavoriteToggle = async () => {
    if (isFavorite) {
      await removeFavorite(movie.id);
      setIsFavorite(false);
    } else {
      await addFavorite(movie);
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
      <Text style={styles.header}>Cast</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.castContainer}>
        {details.credits.cast.map((castMember) => (
          <View key={castMember.id} style={styles.castMember}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w200/${castMember.profile_path}` }} style={styles.castImage} />
            <Text style={styles.castName}>{castMember.name}</Text>
          </View>
        ))}
      </ScrollView>
      <Text style={styles.header}>Reviews</Text>
      {details.reviews.results.map((review) => (
        <View key={review.id} style={styles.review}>
          <Text style={styles.reviewAuthor}>{review.author}</Text>
          <Text style={styles.reviewContent}>{review.content}</Text>
        </View>
      ))}
      <Text style={styles.header}>Trailer</Text>
      {videoUri ? (
        <View style={styles.trailerContainer}>
          <WebView
            source={{ uri: videoUri }}
            style={styles.video}
          />
        </View>
      ) : (
        <Text style={styles.noTrailerText}>No trailer available</Text>
      )}
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  poster: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 10,
  },
  overview: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  header: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  castContainer: {
    marginBottom: 20,
  },
  castMember: {
    marginRight: 10,
    alignItems: 'center',
  },
  castImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  castName: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
  },
  review: {
    marginBottom: 20,
  },
  reviewAuthor: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reviewContent: {
    color: '#fff',
  },
  trailerContainer: {
    marginBottom: 20,
  },
  video: {
    width: Dimensions.get('window').width - 20,
    height: (Dimensions.get('window').width - 20) * 9 / 16, // 16:9 aspect ratio
  },
  bottomSpacer: {
    height: 20, // Add space at the bottom
  },
  noTrailerText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

export default DetailsScreen;
