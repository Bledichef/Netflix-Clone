import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfileManager = () => {
  const [profiles, setProfiles] = useState([]);
  const [newProfileName, setNewProfileName] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const loadProfiles = async () => {
      const savedProfiles = await AsyncStorage.getItem('profiles');
      if (savedProfiles) {
        setProfiles(JSON.parse(savedProfiles));
      }
    };
    loadProfiles();
  }, []);

  const handleAddProfile = async () => {
    if (newProfileName.trim()) {
      const updatedProfiles = [...profiles, { name: newProfileName }];
      setProfiles(updatedProfiles);
      await AsyncStorage.setItem('profiles', JSON.stringify(updatedProfiles));
      setNewProfileName('');
    }
  };

  const handleSelectProfile = (profile) => {
    navigation.navigate('Home', { profile }); // Passer le profil lors de la navigation
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a Profile</Text>
      <FlatList
        data={profiles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectProfile(item)}>
            <Text style={styles.profileItem}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <TextInput
        value={newProfileName}
        onChangeText={setNewProfileName}
        placeholder="Enter profile name"
        style={styles.input}
      />
      <Button title="Add Profile" onPress={handleAddProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  header: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
  profileItem: {
    color: '#fff',
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default ProfileManager;
