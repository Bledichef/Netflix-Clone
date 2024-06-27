import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Button } from 'react-native';
import axios from 'axios';
import { SearchBar } from 'react-native-elements';

const API_KEY = '89e802175d8ccb6b4549eef6f85c78ec';

const HomeScreen = ({ navigation }) => {
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

  const renderMovieItem = (category) => ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { movie: item })}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }} style={styles.poster} />
    </TouchableOpacity>
  );

  const renderSectionHeader = (title) => (
    <Text style={styles.header}>{title}</Text>
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
      <View style={styles.buttonContainer}>
        <Button title="View Favorites" onPress={() => navigation.navigate('Favorites')} />
      </View>
      <SearchBar
        placeholder="Search Movies..."
        onChangeText={handleSearch}
        value={search}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInput}
      />
      {search.length > 2 ? (
        <>
          {renderSectionHeader('Search Results')}
          <FlatList
            horizontal
            data={searchResults}
            keyExtractor={(item) => `search-${item.id}`}
            renderItem={renderMovieItem('search')}
            showsHorizontalScrollIndicator={false}
          />
        </>
      ) : (
        <>
          {renderSectionHeader('Popular Movies')}
          <FlatList
            horizontal
            data={popularMovies}
            keyExtractor={(item) => `popular-${item.id}`}
            renderItem={renderMovieItem('popular')}
            onEndReached={loadMoreMovies}
            onEndReachedThreshold={0.5}
            showsHorizontalScrollIndicator={false}
          />

          {renderSectionHeader('Upcoming Movies')}
          <FlatList
            horizontal
            data={upcomingMovies}
            keyExtractor={(item) => `upcoming-${item.id}`}
            renderItem={renderMovieItem('upcoming')}
            onEndReached={loadMoreMovies}
            onEndReachedThreshold={0.5}
            showsHorizontalScrollIndicator={false}
          />

          {renderSectionHeader('Top Rated Movies')}
          <FlatList
            horizontal
            data={topRatedMovies}
            keyExtractor={(item) => `toprated-${item.id}`}
            renderItem={renderMovieItem('toprated')}
            onEndReached={loadMoreMovies}
            onEndReachedThreshold={0.5}
            showsHorizontalScrollIndicator={false}
          />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  contentContainer: {
    padding: 10,
    paddingBottom: 50, // Ajout d'un espace en bas pour mieux voir la dernière catégorie
  },
  buttonContainer: {
    marginVertical: 10,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    padding: 0,
    marginBottom: 20,
  },
  searchBarInput: {
    backgroundColor: '#333',
  },
});

export default HomeScreen;
