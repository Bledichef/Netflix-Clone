import { StyleSheet, Dimensions } from 'react-native';

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
  bottomSpacer: {
    height: 20, // Add space at the bottom
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
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

export default styles;
