import React, {useState,useEffect} from 'react'
import {StyleSheet,View,Image, Text, Animated, TouchableOpacity, Modal} from 'react-native'
import {windowWidth,windowHeight} from '../../resource/Dimensions'
import Button from '../../component/button/Button'
import Footer from '../../component/footer/Footer'
import InputText from '../../component/inputText/InputText'
import * as ImagePicker from 'react-native-image-picker'
import Autocomplete from 'react-native-autocomplete-input'
import axios from 'axios'
import ModaMensajeExitoso from '../../component/modal/ModalMensajeExitoso'


const styles = StyleSheet.create({
    containerInit:{
        flex: 0.08,
        backgroundColor: '#2ec28a',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    containerCenter1:{
        flex: 0.32,
        alignItems: 'center',
        marginTop: windowWidth/15,
    },
    containerCenter:{
        flex: 0.60,
        alignItems: 'center',
        marginTop: windowWidth/15,
    },
    titulo:{
        fontSize: 20,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    TextoForm:{
        fontSize: 18,
        color: 'black',
        marginBottom: 10,
    },
    containerEnd:{
        flex: 0.10
    },
    fotoVideo:{
        flexDirection: 'column'
    },
    agregarFotoVideo:{
        borderWidth: 1,
        width: windowWidth/1.5,
        height: windowHeight/15,
        borderColor: 'black',
        flexDirection: 'row',
        borderRadius: 5,
        marginVertical: 20
    },
    agregarFotImage:{
        width: windowWidth/9,
        height: windowHeight/18,   
        marginLeft: windowWidth/15,
    },
    boton:{
        borderColor: 'black',
        backgroundColor: '#2ec28a',
    },
    textmensaje:{
        marginHorizontal: 20,
        marginVertical: 10,
        color: '#ffffff',
    },
    cardOption:{
        borderWidth: 1,
        marginBottom: 10
    },
    textoOption:{
        marginHorizontal:10,
        marginVertical: 5
    },
    otroInci:{
        marginVertical: 10
    },
    autocompleteContainer: {
        marginLeft: 1,
        marginRight: 1
    },
    itemText:{
        fontSize: 12,
    },
});  

const AddIncidence=({navigation, route})=>{
  console.log("AddIncidence",route.params)

    const [response, setResponse] = useState(null);
    const [imagen, setImagen] = useState('');
    const [visible, setVisible] = useState(false);
    const [opacado, setOpacado] = useState(1);
    const [visible1, setVisible1] = useState(false);

    
    const tomarFoto=()=>{
        ImagePicker.launchCamera(
            {
              mediaType: 'photo',
              //includeBase64: false,
              maxHeight: 2000,
              maxWidth: 2000,
            },
            (response) => {
              setResponse(response);
              setTipe(response.type)
              console.warn(response),
              setImagen(response.base64)
            },
          )
    }

    const filmarFoto=()=>{
        ImagePicker.launchCamera(
            {
                mediaType: 'video'
            },
            (response) => {
              setResponse(response);
              setTipe('video/quicktime')
              console.warn("video", response)
              setImagen(response.base64)
            },
          )
    }

    const agregarFoto=()=>{
        ImagePicker.launchImageLibrary(
            {
              mediaType: 'photo',
              includeBase64: true,
              maxHeight: 2000,
              maxWidth: 2000,
            },
            (response) => {
              setResponse(response);
              setTipe(response.type)
              setImagen(response.base64)
            },
          )
    }

    const agregarVideo=()=>{
        ImagePicker.launchImageLibrary(
            {
                mediaType: 'video'
            },
            (response) => {
              setResponse(response);
              setTipe('video/quicktime')
              setImagen(response.base64)
            },
          )
    }
    
    const lista=()=>{
        setVisible(true)
        setOpacado(0.5)
    }
    
    const [tipe, setTipe]=useState("");
    const [query, setQuery] = useState("");
    const [result, setResult] = useState(true);
    const [data, setData] = useState([
        {id:'1', name:'HURTO'},
        {id:'2', name: 'ROBO AGRABADO'},
        {id:'3', name: 'VEHICULO SOSPECHOSO'},
        {id:'4', name: 'DAÑO DE PROPIEDAD'},
        {id:'5', name: 'HOMICIDIO'},
        {id:'6', name: 'EXTERSION'},
        {id:'7', name: 'RIESGO ALTO'},
        {id:'8', name: 'SUICIDIO'},
        {id:'9', name: 'TOQUE DE QUEDA'}]);
    
        //console.warn(query)
      const datastatic = [
        {id:'1', name:'HURTO'},
        {id:'2', name: 'ROBO AGRABADO'},
        {id:'3', name: 'VEHICULO SOSPECHOSO'},
        {id:'4', name: 'DAÑO DE PROPIEDAD'},
        {id:'5', name: 'HOMICIDIO'},
        {id:'6', name: 'EXTERSION'},
        {id:'7', name: 'RIESGO ALTO'},
        {id:'8', name: 'SUICIDIO'},
        {id:'9', name: 'TOQUE DE QUEDA'}
      ]  
      useEffect(()=>{
        setData(datastatic.filter(e=>{return e.name.indexOf(query.name)>-1}))
      },[query])  

      const Enviar = async () => {

            
        if(response!=null){
            const archivoTotal= response;
            const cargaFoto= new FormData();
            cargaFoto.append('tipo_in',query)
            cargaFoto.append('foto_video',{uri: archivoTotal.uri,name: archivoTotal.fileName,type: tipe})
            cargaFoto.append('satisfaccion', Math.floor(Math.random() * (5 - 0)) + 0)
            cargaFoto.append('usuario', route.params.url)
            console.warn("archivo total",archivoTotal)
            console.warn("cargarfoto", cargaFoto)

          await axios.post('http://192.168.1.37:8000/api/token/',{
            "username": 'Vigilancia',
            "password": '123456'
          })
          .then(
          (res)=>{
            const auth="Bearer "+res.data.access
            axios.post('http://192.168.1.37:8000/Incidencias/',
            cargaFoto
            ,
            {              
              headers : {'Authorization': auth, 'Content-Type': 'multipart/form-data'}
            }
            )
            .then(
              (res)=>{
                console.warn('exito', res)
                setOpacado(0.2)
                setVisible1(true)
                setTimeout(()=>{navigation.navigate('MenuPrincipal')},
                3000)
                
              }
            )
            .catch(
              (res)=>{
                console.warn('Error:', res)
              }
            )
          }
          )
          .catch(
            (response)=>{
              response===404 ? console.warn('lo sientimos no tenemos servicios') :console.warn('Error:' ,response)
            }
          )       
        }else{
            console.warn("nohayfoto")
        }    
      }

    return(
        <>
        <ModaMensajeExitoso visible={visible1} label='Guardado Exitoso' setVisible={setVisible1} setOpacado={setOpacado} />
        <View style={styles.containerInit} opacity={opacado}>
            <Text style={styles.titulo}>Agregar Incidencia</Text>
        </View>
        <View style={styles.containerCenter1}>
        <Text style={styles.TextoForm}>Tipo de Incedencia</Text>
            <Autocomplete
                autoCapitalize="words"
                autoCorrect={false}
                hideResults={result}
                containerStyle={styles.autocompleteContainer}
                data={data}
                defaultValue={query}
                onChangeText={text => (setQuery({name: text}),setResult(false))}
                placeholder="Ingrese alguna Incidencia"
                renderItem={i => (
                    <TouchableOpacity onPress={() => (setQuery(i.item.name),setResult(true))} >
                    <Text style={styles.itemText}>
                        {i.item.name} 
                    </Text>
                    </TouchableOpacity>
                ) }
            />
        </View>
        <View style={styles.containerCenter} opacity={opacado}>
            <View style={styles.otroInci}>
            <InputText 
                label={'Coloque otro tipo de incidente'} 
                windowWidth={(windowWidth/1.5)} 
                windowHeight={(windowHeight/18)} 
                numberOfLines={1} 
                onChangeText={(e) => {(e)}}>
            </InputText>
            </View>
        <View style={styles.fotoVideo}>
                <Text style={styles.TextoForm}>Foto/Video</Text>
                <TouchableOpacity style={styles.agregarFotoVideo} onPress={()=>{lista()}}>
                    <Text style={{color: 'black', marginTop: 10, marginLeft: 5}}>Examinar o Activar Camara</Text>
                    <Image
                    style={styles.agregarFotImage}
                    source={require('../../resource/static/images/addImage.png')}
                    />
                </TouchableOpacity>
                <Modal visible={visible} transparent={true} animationType='fade' presentationStyle='overFullScreen'>
                <View style={{marginTop: windowHeight/3, alignItems: 'center'}}>
                    <View style={{margin: 20,padding: 35, alignItems: 'center',backgroundColor: 'white',shadowColor: '#000000', shadowOpacity: 1,shadowOffset: {width:0,height:2}, shadowRadius: 10, elevation: 5}}>
                    <TouchableOpacity style={styles.cardOption} onPress={()=>{tomarFoto()}}>
                        <Text style={styles.textoOption}>  Tomar Foto  </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cardOption} onPress={()=>{filmarFoto()}}>
                        <Text style={styles.textoOption}> Filmar Video </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cardOption} onPress={()=>{agregarFoto()}}>
                        <Text style={styles.textoOption}> Agregar Foto </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cardOption} onPress={()=>{agregarVideo()}}>
                        <Text style={styles.textoOption}>Agregar Video</Text>
                    </TouchableOpacity>                  
                    <TouchableOpacity style={styles.boton} onPress={()=>(setVisible(false),setOpacado(1))}>
                        <Text style={styles.textmensaje}>Cerrar</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                </Modal>
        </View>    
            <Button label={'Enviar'} windowWidth={windowWidth/1.5} windowHeight={windowHeight/16} onPress={Enviar}></Button>
        </View>
        <View style={styles.containerEnd} opacity={opacado}>
            <Footer navigation={navigation} route={route.params}></Footer>
        </View>
        </>
    )
}

export default AddIncidence;