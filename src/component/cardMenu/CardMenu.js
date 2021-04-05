import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';



const CardMenu = ({label,windowWidth,windowHeight,onPress}) => {
    const styles = StyleSheet.create({
        border:{
          borderRadius: 5,
          backgroundColor: '#2ec28a',
          width: windowWidth,
          height: windowHeight,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 5,
        },
        texto:{
          color: '#fcfaf9',
          fontSize: 16,
          textAlign: 'center' 
        }
      });  
  return (
    <TouchableOpacity style={styles.border} onPress={onPress}>
      <Text style={styles.texto}>{label}</Text>
    </TouchableOpacity> 
  )
};


export default CardMenu;