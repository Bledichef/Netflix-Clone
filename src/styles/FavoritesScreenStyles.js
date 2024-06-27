import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  header: {
    color: '#fff',
    fontSize: 24,
    marginVertical: 10,
  },
  genreContainer: {
    marginBottom: 20,
  },
  genreHeader: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10,
  },
  poster: {
    width: 120,
    height: 180,
    margin: 5,
    borderRadius: 10,
  },
  titleContainer: {
    width: 120,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
  },
  noFavorites: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default styles;
