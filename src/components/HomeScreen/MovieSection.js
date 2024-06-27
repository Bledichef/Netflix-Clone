import React from 'react';
import { View, Text, FlatList } from 'react-native';
import AnimatedMovieCard from './AnimatedMovieCard';
import styles from '../../styles/HomeScreenStyles';

const MovieSection = ({ title, movies, navigation, profile }) => (
  <View>
    <Text style={styles.header}>{title}</Text>
    <FlatList
      horizontal
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <AnimatedMovieCard movie={item} navigation={navigation} profile={profile} />
      )}
      showsHorizontalScrollIndicator={false}
    />
  </View>
);

export default MovieSection;
