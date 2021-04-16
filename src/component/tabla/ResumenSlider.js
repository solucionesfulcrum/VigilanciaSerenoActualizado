import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {windowWidth,windowHeight} from '../../resource/Dimensions'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight/20,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: windowWidth / 1.2,
    flexDirection: 'row'
  },
  imageCalifiacion: {
    width: windowWidth / 25,
    height: windowHeight / 42,
  },
  itemTitle: {
    color: '#212121',
    fontSize: 13,
    width: windowWidth/5,
    fontWeight: '300',
  },
  itemPrice: {
    color: '#212121',
    fontSize: 13,
    fontWeight: '300',
    marginRight: 45,
    marginLeft: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});



const ProductSliderItem = ({item, onPress}) => {
    
    var estrellas = [];

    for (let x = 0; x < item.satisfaccion; x++){
        estrellas.push(<Image style={styles.imageCalifiacion} source={require('../../resource/static/images/estrella.png')} />)
    }
 
  return (
    <TouchableOpacity onPress={onPress}>   
        <View style={styles.container}>
            <Text style={styles.itemTitle}>{item.nombre}</Text>
            <Text style={styles.itemPrice}>{item.tRegistro}</Text>
            <Text style={styles.itemPrice}>{item.tAtencion}</Text>
            {estrellas}
        </View>
      </TouchableOpacity>
  );
};

export default ProductSliderItem;
