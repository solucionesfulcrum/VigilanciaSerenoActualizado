import React, {useState, useRef, useEffect} from 'react';
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  PixelRatio,
} from 'react-native';

// Import Youtube Players
import YouTube from 'react-native-youtube';
import Footer from '../../component/footer/Footer'
import { windowHeight, windowWidth } from '../../resource/Dimensions';
import {InputAutoSuggest} from 'react-native-autocomplete-search';
import Autocomplete from 'react-native-autocomplete-input';

const CamaraVigilancia = ({navigation, route}) => {
  const youtubePlayerRef = useRef();
  const singleVideoId = 'dNSvbCd4KAU';
  const listVideoIds = [
    'dNSvbCd4KAU',
    '9M-CP2mZY3w',
    '-wO8ZrCd1H8'
  ];
  
  const [isReady, setIsReady] = useState(false);
  const [status, setStatus] = useState(null);
  const [quality, setQuality] = useState(null);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLooping, setIsLooping] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [containerMounted, setContainerMounted] = useState(false);
  const [containerWidth, setContainerWidth] = useState(null);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(false);
  const [data, setData] = useState([
    {id:'1', name:'Av. Aviacion 14'},
    {id:'2', name: 'Direccion 3'},
    {id:'3', name: 'Direccion 4'},
    {id:'4', name: 'Direccion 5'},
    {id:'5', name: 'Direccion 6'},
    {id:'6', name: 'Direccion 7'}]);

    //console.warn(query)
  const datastatic = [
    {id:'1', name:'Av. Aviacion 14'},
    {id:'2', name: 'Direccion 3'},
    {id:'3', name: 'Direccion 4'},
    {id:'4', name: 'Direccion 5'},
    {id:'5', name: 'Direccion 6'},
    {id:'6', name: 'Direccion 7'}
  ]  
  useEffect(()=>{
    setData(datastatic.filter(e=>{return e.name.indexOf(query.name)>-1}))
  },[query])  


  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={styles.container}
        onLayout={({
          nativeEvent: {
            layout: {width},
          },
        }) => {
          if (!containerMounted) setContainerMounted(true);
          if (containerWidth !== width) setContainerWidth(width);
        }}>
        <Text style={styles.titleText}>
          VIDEOS DE VIGILANCIA
        </Text>  
        <Autocomplete
           autoCapitalize="none"
           autoCorrect={false}
           hideResults={result}
           containerStyle={styles.autocompleteContainer}
           data={data}
           defaultValue={query}
           onChangeText={text => (setQuery({name: text},setResult(false)))}
           placeholder="Buscar Camara por Ubicación"
           renderItem={i => (
             <TouchableOpacity onPress={() => (setQuery(i.item.name),setResult(true))} >
               <Text style={styles.itemText}>
                 {i.item.name} 
               </Text>
             </TouchableOpacity>
           ) }
        />
        {/* Play specific video in a videoIds array by index */}
        {youtubePlayerRef.current &&
          youtubePlayerRef.current.props.videoIds &&
          Array.isArray(youtubePlayerRef.current.props.videoIds) && (
            <View style={styles.buttonGroup}>
              {youtubePlayerRef.current.props.videoIds.map(
                 (videoId, i) => (
                   <TouchableOpacity
                    key={i}
                    style={styles.button}
                    onPress={() =>
                      youtubePlayerRef.current &&
                      youtubePlayerRef.current.playVideoAt(i)
                    }>
                    <Text
                      style={[
                        styles.buttonText,
                        styles.buttonTextSmall,
                      ]}>{`Camara ${i+1}`}</Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          )}


        {containerMounted && (
          <YouTube
            ref={youtubePlayerRef}
            apiKey="AIzaSyCwaoZ1oprvpu8Ad6duiv5JJRYq0F3kiqg"
            videoIds={listVideoIds}
            play={isPlaying}
            loop={isLooping}
            fullscreen={fullscreen}
            controls={1}
            style={[
              {
                height: PixelRatio.roundToNearestPixel(
                  containerWidth / (16 / 9),
                ),
              },
              styles.player,
            ]}
            onError={(e) => setError(e.error)}
            onReady={(e) => setIsReady(true)}
            onChangeState={(e) => setStatus(e.state)}
            onChangeQuality={(e) => setQuality(e.quality)}
            onChangeFullscreen={(e) => setFullscreen(e.isFullscreen)}
            onProgress={(e) => {
              setDuration(e.duration);
              setCurrentTime(e.currentTime);
            }}
          />
        )}
        <View style={styles.controles}>
          {/* Playing / Looping */}
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsPlaying((isPlaying) => !isPlaying)}>
              <Text style={styles.buttonText}>
                {status == 'playing' ? 'Pause' : 'Play'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Previous / Next video */}
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                youtubePlayerRef.current &&
                youtubePlayerRef.current.previousVideo()
              }>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                youtubePlayerRef.current &&
                youtubePlayerRef.current.nextVideo()
              }>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Fullscreen */}
        {!fullscreen && (
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.buttonFS}
              onPress={() => setFullscreen(true)}>
              <Text style={styles.buttonTextFS}>Visualizar en pantalla Completa</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.instructions}>
          {isReady ? 'Reproduciendo' : 'Configuracion'}
        </Text>
        <Text style={styles.instructions}>Estado: {status}</Text>

        <Text style={styles.instructions}>
          {error ? 'Error: ' + error : ''}
        </Text>
      </ScrollView>
      <Footer navigation={navigation} route={route.params}></Footer>
    </SafeAreaView>
  );
};

export default CamaraVigilancia;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
    backgroundColor: '#2ec28a',
    color: '#ffffff',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  buttonText: {
    marginVertical: 10,
    fontSize: 18,
    color: '#131313',
  },
  buttonTextSmall: {
    fontSize: 15,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  player: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
  controles:{
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonFS:{
    paddingVertical: windowHeight/200,
    paddingHorizontal: windowWidth/10,
    alignSelf: 'center',
    backgroundColor: '#2ec28a',
    borderRadius: 10,
    marginVertical: 15,
  },
  buttonTextFS:{
    marginVertical: 10,
    fontSize: 18,
    color: '#ffffff',
  },
  itemText:{
    fontSize: 12
  },
  autocompleteContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15
  },
});