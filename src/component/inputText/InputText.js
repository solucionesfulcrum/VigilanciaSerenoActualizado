import React from 'react';
import {
  StyleSheet,
  TextInput
} from 'react-native';



const InputText = ({label,windowWidth,windowHeight,numberOfLines,onChangeText,keyboardType}) => {
    const styles = StyleSheet.create({
        border:{
          borderRadius: 5,
          backgroundColor: '#ffffff',
          width: windowWidth,
          height: windowHeight,
          justifyContent: 'center',
          alignItems: 'center',
        },
      });  
  return (
    <TextInput keyboardType={keyboardType} placeholder={label} style={styles.border} numberOfLines={numberOfLines} onChangeText={onChangeText}></TextInput> 
  )
};


export default InputText;