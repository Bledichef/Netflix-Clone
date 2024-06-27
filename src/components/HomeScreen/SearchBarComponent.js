import React from 'react';
import { SearchBar } from 'react-native-elements';

const SearchBarComponent = ({ search, handleSearch }) => (
  <SearchBar
    placeholder="Search Movies..."
    onChangeText={handleSearch}
    value={search}
    containerStyle={{ backgroundColor: 'transparent', borderBottomColor: 'transparent', borderTopColor: 'transparent', padding: 0, marginBottom: 20 }}
    inputContainerStyle={{ backgroundColor: '#333' }}
  />
);

export default SearchBarComponent;
