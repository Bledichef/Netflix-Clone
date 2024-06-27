import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const CastList = ({ cast }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.castContainer}>
      {cast.map((castMember) => (
        <View key={castMember.id} style={styles.castMember}>
          <Image source={{ uri: `https://image.tmdb.org/t/p/w200/${castMember.profile_path}` }} style={styles.castImage} />
          <Text style={styles.castName}>{castMember.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
});

export default CastList;
