import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const Trailer = ({ videoUri }) => {
  return (
    <>
      <Text style={styles.header}>Trailer</Text>
      {videoUri ? (
        <View style={styles.trailerContainer}>
          <WebView source={{ uri: videoUri }} style={styles.video} />
        </View>
      ) : (
        <Text style={styles.noTrailerText}>No trailer available</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  trailerContainer: {
    marginBottom: 20,
  },
  video: {
    width: Dimensions.get('window').width - 20,
    height: (Dimensions.get('window').width - 20) * 9 / 16, // 16:9 aspect ratio
  },
  noTrailerText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Trailer;
