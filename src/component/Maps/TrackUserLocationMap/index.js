import React, {useState, useEffect} from 'react';
import {StyleSheet, Platform} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maps: {...StyleSheet.absoluteFillObject},
});

const TrackUserLocationMap = () => {
  const [locations, setLocations] = useState([]);
  let _watchId;
  useEffect(() => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('always');
    }
    _watchId = Geolocation.watchPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        setLocations([...locations, {latitude, longitude}]);
      },
      (error) => {
        console.warn('error', error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 100,
        interval: 5000,
        fastestInterval: 2000,
      },
    );
  }, [locations]);

  useEffect(() => {
    return () => {
      if (_watchId !== null) {
        Geolocation.clearWatch(_watchId);
      }
    };
  });
  return (
    <>
      {locations.length > 0 && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.maps}
          initialRegion={{
            latitude: locations[0].latitude,
            longitude: locations[0].longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {locations.map((location, index) => (
            <Marker
              key={`location-${index}`}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
            />
          ))}
        </MapView>
      )}
    </>
  );
};

export default TrackUserLocationMap;
