import React, { useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator, View, Text, Image, TouchableOpacity, StyleSheet, Button } from 'react-native'; // Ajout de View, Text, Image, TouchableOpacity, StyleSheet, Button
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import SearchBarComponent from '../components/HomeScreen/SearchBarComponent';
import ButtonComponent from '../components/HomeScreen/ButtonComponent';
import MovieSection from '../components/HomeScreen/MovieSection';
import styles from '../styles/HomeScreenStyles';

const API_KEY = '89e802175d8ccb6b4549eef6f85c78ec';

const HomeScreen = ({ navigation }) => {
  const route = useRoute();
  const { profile } = route.params;
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async (page) => {
    try {
      const popularResponse = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`);
      const upcomingResponse = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${page}`);
      const topRatedResponse = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`);
      
      setPopularMovies(prevMovies => [...prevMovies, ...popularResponse.data.results]);
      setUpcomingMovies(prevMovies => [...prevMovies, ...upcomingResponse.data.results]);
      setTopRatedMovies(prevMovies => [...prevMovies, ...topRatedResponse.data.results]);
      setTotalPages(popularResponse.data.total_pages);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const loadMoreMovies = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (query.length > 2) {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
        setSearchResults(response.data.results);
      } catch (error) {
        console.error(error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { movie: item, profile })}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }} style={styles.poster} />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ButtonComponent navigation={navigation} profile={profile} />
      <SearchBarComponent search={search} handleSearch={handleSearch} />
      {search.length > 2 ? (
        <MovieSection title="Search Results" movies={searchResults} renderMovieItem={renderMovieItem} loadMoreMovies={() => {}} />
      ) : (
        <>
          <MovieSection title="Popular Movies" movies={popularMovies} renderMovieItem={renderMovieItem} loadMoreMovies={loadMoreMovies} />
          <MovieSection title="Upcoming Movies" movies={upcomingMovies} renderMovieItem={renderMovieItem} loadMoreMovies={loadMoreMovies} />
          <MovieSection title="Top Rated Movies" movies={topRatedMovies} renderMovieItem={renderMovieItem} loadMoreMovies={loadMoreMovies} />
        </>
      )}
    </ScrollView>
  );
};

export default HomeScreen;
