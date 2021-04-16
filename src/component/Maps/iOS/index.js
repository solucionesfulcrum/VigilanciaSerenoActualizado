import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maps: {...StyleSheet.absoluteFillObject},
});

const MapsIOS = () => {
  const [location, setLocation] = useState();
  useEffect(() => {
    Geolocation.requestAuthorization('always');
    Geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        setLocation({
          latitude,
          longitude,
        });
      },
      (error) => {
        console.warn(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);
  return (
    <>
      {location && (
        <MapView
          style={styles.maps}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChange={(region) => {
            setLocation({
              latitude: region.latitude,
              longitude: region.longitude,
            });
          }}
          onRegionChangeComplete={(region) => {
            setLocation({
              latitude: region.latitude,
              longitude: region.longitude,
            });
          }}>
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="this is a marker"
            description="this is a marker description"
          />
        </MapView>
      )}
    </>
  );
};

export default MapsIOS;
