import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReviewsList = ({ reviews }) => {
  return (
    <>
      {reviews.map((review) => (
        <View key={review.id} style={styles.review}>
          <Text style={styles.reviewAuthor}>{review.author}</Text>
          <Text style={styles.reviewContent}>{review.content}</Text>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
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
});

export default ReviewsList;
