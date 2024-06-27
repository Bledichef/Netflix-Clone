import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileManager from '../components/ProfileManager';
import CustomDrawerContent from '../components/customDrawerContent'; // Utilisation d'un contenu personnalisé

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#1c1c1c', // Couleur de fond du drawer
        },
        drawerLabelStyle: {
          color: '#fff', // Couleur du texte du drawer
        },
        headerStyle: {
          backgroundColor: '#1c1c1c', // Couleur de fond du header dans le drawer
        },
        headerTintColor: '#fff', // Couleur du texte du header dans le drawer
        headerTitleStyle: {
          fontWeight: 'bold', // Texte en gras pour le titre du header dans le drawer
        },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Favorites" component={FavoritesScreen} />
      <Drawer.Screen name="ProfileManager" component={ProfileManager} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
