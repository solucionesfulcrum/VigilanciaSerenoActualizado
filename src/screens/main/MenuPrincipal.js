import React from 'react'
import {StyleSheet,View,Image, Text, TouchableOpacity} from 'react-native'
import Button from '../../component/button/Button'
import {windowWidth,windowHeight} from '../../resource/Dimensions'
import CardMenu from '../../component/cardMenu/CardMenu'
import Footer from '../../component/footer/Footer'

const styles = StyleSheet.create({
  containerInit:{
    flex: 0.3,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  containerCenter:{
    flex: 0.6,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardMenu:{
    flexDirection: 'row',
    marginVertical: 10,
  },
  containerEnd:{
    flex: 0.1
  },
  logo:{
    width: windowWidth/4,
    height: windowHeight/8,
    marginBottom: 10
  },
  textTitle:{
    fontSize: windowWidth/20
  },
  });  

const MenuPrincipal=({navigation})=>{
    return(
      <>
        <View style={styles.containerInit}>
            <Image
              style={styles.logo}
              source={require('../../resource/static/images/Escudo.png')}
            />
            <Text style={styles.textTitle}>Municipalidad San Borja</Text>
        </View>
        <View style={styles.containerCenter}>
        <View style={styles.cardMenu}>
          <CardMenu label={"Registrar Incidencia"} 
          windowWidth={windowWidth/2.5} 
          windowHeight={windowHeight/10} 
          onPress={()=>navigation.navigate('AddIncidence')}></CardMenu>
          <CardMenu label={"Record de Incidencias"}
           windowWidth={windowWidth/2.5} 
           windowHeight={windowHeight/10}></CardMenu>
        </View>
        <View style={styles.cardMenu}>
          <CardMenu label={"Solicitar Apoyo"}
           windowWidth={windowWidth/2.5} 
           windowHeight={windowHeight/10}
           onPress={()=>navigation.navigate('SolApoyo')}></CardMenu>
          <CardMenu label={"Camaras de Vigilancia"} 
          windowWidth={windowWidth/2.5} 
          windowHeight={windowHeight/10} 
          onPress={()=>navigation.navigate('CamaraVigilancia')}></CardMenu>
        </View>
        <View style={styles.cardMenu}>
          <CardMenu label={"Registrar Apoyo"} 
          windowWidth={windowWidth/2.5} 
          windowHeight={windowHeight/10}
          onPress={()=>navigation.navigate('RegApoyo')}></CardMenu>
          <CardMenu label={"Resumen Estadistico"}
          windowWidth={windowWidth/2.5} 
          windowHeight={windowHeight/10}></CardMenu>
        </View>
      </View>
      <View style={styles.containerEnd}>
        <Footer></Footer>
      </View>
    </>  
    )
}

export default MenuPrincipal;