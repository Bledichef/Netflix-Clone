import React from 'react';
import { View, Button } from 'react-native';
import styles from '../../styles/HomeScreenStyles';

const ButtonComponent = ({ navigation, profile }) => (
  <View style={styles.buttonContainer}>
    <Button title="View Favorites" onPress={() => navigation.navigate('Favorites', { profile })} />
  </View>
);

export default ButtonComponent;
