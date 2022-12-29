import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import { customStyleMap } from '../components/MapStyle.js';
import { hospitalInfo } from '../data/nakornhospital';
import { icons } from '../constants';

const Maps = () => {
  const [location, setLocation] = useState(null);
  const mapRef = React.createRef();

  const handleLocationPermission = async () => {
    let permissionCheck = '';

    if (Platform.OS === 'android') {
      permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (permissionCheck === RESULTS.DENIED) {
        const permissionRequest = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        permissionRequest === RESULTS.GRANTED
          ? console.warn('Location permission granted.')
          : console.warn('Location perrmission denied.');
      }
    }
  };

  useEffect(() => {
    handleLocationPermission();
  }, []);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      error => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, []);

  // Animate To Region
  const go = (latitude, longitude) => {
    mapRef.current.animateToRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
  };

  //Render Items For Flatlist
  const renderItem = ({ item }) => (
    <View style={styles.margin}>
      <View style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" , borderRadius: 10, shadowOpacity: 80,}}>
        <TouchableOpacity onPress={() => go(item.latitude, item.longitude)}>
          <Text style={styles.labelList}>
            {item.agency}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  // Check Items length of API Data
  if (hospitalInfo.length === 0) {
    return (
      <View>
        <Text>Loading....</Text>
      </View>
    );
  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {location && (
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          customMapStyle={customStyleMap}
          paddingAdjustmentBehavior="automatic"
          showsMyLocationButton={true}
          showsBuildings={true}
          maxZoomLevel={50}
          loadingEnabled={true}
          loadingIndicatorColor="#fcb103"
          loadingBackgroundColor="#242f3e">
          {hospitalInfo.map((item, index) => (
            <Marker
              key={item.id}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              title={item.agency}
              description={item.address}
            >
              <Image
                source={icons.hospital}
                style={{ width: 37, height: 37 }}
                resizeMode="contain"
              />
            </Marker>
          ))}
        </MapView>
      )}
      <View style={styles.listview}>
        <FlatList
          style={styles.flatList}
          data={hospitalInfo}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  listview: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 230,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  flatList: {
    flex: 1,
  },
  margin: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  labelList: {
    fontSize: 13,
    fontWeight: '600',
    color: '#f2f2f2',
    textAlign: 'center',
    margin: 6
  },
});

export default Maps;