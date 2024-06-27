import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import styles from '../../styles/HomeScreenStyles';

const MovieSection = ({ title, movies, renderMovieItem, loadMoreMovies }) => (
  <View>
    <Text style={styles.header}>{title}</Text>
    <FlatList
      horizontal
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderMovieItem}
      onEndReached={loadMoreMovies}
      onEndReachedThreshold={0.5}
      showsHorizontalScrollIndicator={false}
    />
  </View>
);

export default MovieSection;
