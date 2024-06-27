import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import DetailsScreen from '../screens/DetailsScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1c1c1c', // Harmoniser avec le reste de l'app
          },
          headerTintColor: '#fff', // Couleur du texte du header
          headerTitleStyle: {
            fontWeight: 'bold', // Texte en gras pour le titre du header
          },
          headerBackTitleVisible: false, // Masquer le texte du bouton de retour
          headerBackImage: () => (
            <Icon name="arrow-back" size={24} color="#fff" /> // Icône de retour personnalisée
          ),
        }}
      >
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: 'Movie Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
