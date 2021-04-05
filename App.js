import React from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import HomeStack from './src/component/navigation/HomeStack'
import { NavigationContainer } from '@react-navigation/native';

const styles = StyleSheet.create({  
});

const App = () => {
  return (
      <NavigationContainer>
        <HomeStack/>
      </NavigationContainer>
  );
  }
export default App;