import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {windowWidth,windowHeight} from '../../resource/Dimensions'

const ResumenSlider = ({item, onPress, tiempo }) => {
  /*
  //fecha registro
  let fechaAM1 = item.reg.split('-')
  let fechaD1 = fechaAM1[2].split('T')
  let tiempoHM1 = fechaD1[1].split(':')
  //fecha cambio estado
  let fechaAM = item.reg_estado.split('-')
  let fechaD = fechaAM[2].split('T')
  let tiempoHM = fechaD[1].split(':')*/
  //console.log(fechaAM[0], "-", fechaAM[1],"-",fechaD[0], "-", tiempoHM[0], "-", tiempoHM[1])
  

  //console.log(tiempo)
    let EstadoLabel
    let EstadoColor

    if (item.estado==1){
      EstadoLabel= "Atendido"
      EstadoColor= "#2ec28a"
    }else if(item.estado==0){
      EstadoLabel= "pendiente"
      EstadoColor= "#A7541D"
    }else if(item.estado==2){
      EstadoLabel= "Espera"
      EstadoColor= "#D9D23B"
    }else if(item.estado==3){
      EstadoLabel= "Falsa"
      EstadoColor= "#DD3950"
    }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: windowHeight/20,
      backgroundColor: EstadoColor,
      marginBottom: 10,
      borderRadius: 10,
      alignItems: 'center',
      width: windowWidth / 1.1,
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
      marginRight: 40,
      marginLeft: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemStar: {
      color: '#212121',
      fontSize: 13,
      fontWeight: '300',
      marginRight: 1,
      marginLeft: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

    //console.log("cardIncidence",item)
    var estrellas = [];
    let c = 0
    for (let x = 0; x < item.satisfaccion; x++){
        estrellas.push(<Image key={c} style={styles.imageCalifiacion} source={require('../../resource/static/images/estrella.png')} />)
        c = c + 1
    }
 
  return (
    <TouchableOpacity onPress={onPress}>   
        <View style={styles.container}>
            <Text style={styles.itemTitle}>{item.datosUsuarios.nombres}</Text>
            <Text style={styles.itemPrice}>{tiempo}</Text>
            <Text style={styles.itemPrice}>{EstadoLabel}</Text>
            {EstadoLabel=='Atendido'?
            estrellas
            :null}
        </View>
      </TouchableOpacity>
  );
};

export default ResumenSlider;
