import React, {useRef} from "react"
import { Dimensions, TouchableOpacity, View, Text } from "react-native";
import { NodeCameraView } from "react-native-nodemediaclient";

const { width, height } = Dimensions.get("window");

const config = {
  cameraConfig: {
    cameraId: 1,
    cameraFrontMirror: false
  },
  videoConfig: {
    preset: 4,
    bitrate: 2000000,
    profile: 2,
    fps: 30,
    videoFrontMirror: true,
  },
  audioConfig: {
    bitrate: 128000,
    profile: 1,
    samplerate: 44100,
  }
};

const BroadcastScreen = () => {

  const cameraViewRef = useRef(null);
  const streamKey = '71c93eda8-cd57-2b37-fa83-f193741195d0';
  const url = `rtmps://global-live.mux.com:443/app/${streamKey}`;
  const grabar = ()=>{
    cameraViewRef.current.start()
    console.warn(cameraViewRef.current.start())
  }
  
  return (
    <>
    <View style={{flex: 1}}>
      <NodeCameraView
        style={{width, height}}
        ref={cameraViewRef}
        outputUrl={url}
        camera={config.cameraConfig}
        audio={config.audioConfig}
        video={config.videoConfig}
        autopreview={true}
      />
    </View>
    <TouchableOpacity style={{flex: 0.2,borderWidth: 5, width: 50, height: 10, backgroundColor: 'red'}} onPress={grabar}>
      <Text>grabar</Text>
    </TouchableOpacity>
    </>
  );
};

export default BroadcastScreen;