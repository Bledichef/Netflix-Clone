import { StyleSheet } from 'react-native';

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

export default styles;
