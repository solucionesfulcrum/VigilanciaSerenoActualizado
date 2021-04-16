import React from 'react';
import {StyleSheet, SafeAreaView, Text, View} from 'react-native';

import GoogleMaps from '../../component/Maps/Android/index';
import Footer from '../../component/footer/Footer';
import InputText from '../../component/inputText/InputText'
import Button from '../../component/button/Button'
import {windowWidth,windowHeight} from '../../resource/Dimensions'

const styles = StyleSheet.create({
  containerSafeArea: {
    flex: 0.7,
    backgroundColor: '#f9f9f9',
  },
  containerOption:{
    flex: 0.3,
    alignItems: 'center'
  },
  margin:{
    marginVertical: 5
  },
  textStyle:{
    fontSize: 20,
    fontWeight: 'bold'
  }
});

const SolApoyo = ({navigation, route}) => {
  const {title, image, id, price, description, category, collections} =
    route.params || {};
  return (
    <>
      <SafeAreaView style={styles.containerSafeArea}>
        <GoogleMaps />
      </SafeAreaView>
      <View style={styles.containerOption}>
        <View style={styles.margin}>
        <Text style={styles.textStyle}>Solicitar Apoyo</Text>
        </View>
        <View style={styles.margin}>
        <InputText 
        label={'cantidad'} 
        windowWidth={(windowWidth/1.5)} 
        windowHeight={(windowHeight/18)} 
        numberOfLines={10} 
        numberOfLines={1}
        keyboardType={'numeric'}></InputText>
        </View>
        <View style={styles.margin}>
        <InputText 
        label={'Incidencia'} 
        windowWidth={(windowWidth/1.5)} 
        windowHeight={(windowHeight/18)} 
        numberOfLines={10} 
        numberOfLines={1}
        keyboardType={'numeric'}></InputText>
        </View>
        <View style={styles.margin}>
        <Button label={'ENVIAR'} windowWidth={windowWidth/1.5} windowHeight={windowHeight/18}></Button>
        </View>
      </View>
      <Footer navigation={navigation}/>
    </>
  );
};

export default SolApoyo;
