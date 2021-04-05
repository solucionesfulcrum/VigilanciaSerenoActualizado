import React, {useRef, useEffect} from 'react';
import {
  SafeAreaView,
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';

const Splash = ({navigation}) => {
  const moveAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(moveAnim, {
        duration: 1000,
        toValue: Dimensions.get('window').width / 1.6,
        delay: 0,
        useNativeDriver: false,
      }),
      Animated.timing(moveAnim, {
        duration: 1000,
        toValue: 0,
        delay: 0,
        useNativeDriver: false,
      }),
    ]).start();
    Animated.timing(fadeAnim, {
      duration: 1000,
      toValue: 1,
      delay: 1000,
      useNativeDriver: false,
    }).start();
  }, [moveAnim, fadeAnim]);

  setTimeout(()=>{navigation.navigate('Login')}, 3000)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <TouchableOpacity onPress={()=>{}}>
        <Animated.Image
          style={[styles.image, {opacity: fadeAnim}]}
          source={require('../../resource/static/images/Escudo.png')}
        />
        </TouchableOpacity>
        <Animated.View style={[styles.logoContainer, {marginLeft: moveAnim}]}>
          <Text style={[styles.logoText]}>Municipalidad </Text>
          <Animated.Text style={[styles.logoTextSec, {opacity: fadeAnim}]}>
            San Borja
          </Animated.Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default Splash;





export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FEFEFE',
  },
  logoText: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 0,
    color: '#0484c4',
    fontWeight: '700',
  },
  logoTextSec:{
    textAlign: 'center',
    fontSize: 20,
    marginTop: 0,
    color: '#13b4ec',
    fontWeight: '700',
  },
  contentContainer: {
    top: '35%',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 150,
  },
  logoContainer: {
    flexDirection: 'row',
  },
});