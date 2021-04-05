import React from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  View,
} from 'react-native';

const {height, width} = Dimensions.get('window')

const ImageButton = ({icon,onPress}) => {
    const styles = StyleSheet.create({
    container: {
        width:width/4,
        alignItems:'center',
    },
    image: {
        height:30,
        width:30,
        marginVertical: 10
    }
    });  
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <Image style={styles.image} source={{uri: icon}}></Image>
            </TouchableOpacity> 
        </View>
        
  )
};


export default ImageButton;