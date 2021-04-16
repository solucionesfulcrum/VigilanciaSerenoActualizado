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
    flex: 0.1,
    alignItems: 'center'
  },
  margin:{
    marginVertical: 5
  },
  textStyle:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  containerFirst:{
      flex: 0.15,
      alignItems: 'center'
  },
  containerEnd:{
      flex: 0.05
  },
  marginStory:{
    marginVertical: 10,
    flexDirection: 'row'
  }
});

const RegApoyo = ({navigation, route}) => {
  const {title, image, id, price, description, category, collections} =
    route.params || {};
  return (
    <>
      <View style={styles.containerFirst}>
        <View style={styles.margin}>
            <Text style={styles.textStyle}>Registro de Apoyo</Text>
        </View>    
            <View style={styles.marginStory}>
                <Text>Cantidad de Serenos Notificados    </Text>
                <InputText 
                windowWidth={(windowWidth/4)} 
                windowHeight={(windowHeight/22)} 
                numberOfLines={10} 
                numberOfLines={1}
                keyboardType={'numeric'}></InputText>
            </View>
        
      </View>
      <SafeAreaView style={styles.containerSafeArea}>
        <GoogleMaps />
      </SafeAreaView>
      <View style={styles.containerOption}>
        <View style={styles.margin}>
        <Button label={'ENVIAR'} windowWidth={windowWidth/1.5} windowHeight={windowHeight/18}></Button>
        </View>
      </View>
      <View style={styles.containerEnd}>
      <Footer navigation={navigation}/>
      </View>
    </>
  );
};

export default RegApoyo;
