import React, { useRef, useEffect } from 'react';
import { Animated, View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AnimatedMovieCard = ({ movie, navigation, profile }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => navigation.navigate('Details', { movie, profile })}
    >
      <Animated.View style={[styles.card, { transform: [{ scale: scaleValue }] }]}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }} style={styles.poster} />
        <Text style={styles.title}>{movie.title}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#333',
  },
  poster: {
    width: 120,
    height: 180,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    padding: 5,
  },
});

export default AnimatedMovieCard;
