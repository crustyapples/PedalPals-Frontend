import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapViewComponent = ({ region, routeCoordinates }) => {
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    let headingSubscription;

    // Request permission to access device heading
    const subscribeToHeading = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        // Subscribe to heading updates
        headingSubscription = await Location.watchHeadingAsync((data) => {
          setHeading(data.magHeading);
        });
      }
    };

    subscribeToHeading();

    return () => {
      // Unsubscribe from the heading updates when the component is unmounted
      headingSubscription && headingSubscription.remove();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        region={{
          ...region,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        zoomEnabled={true}
        scrollEnabled={true}
        rotateEnabled={true}
        pitchEnabled={true}
        // Rotate the map according to the heading
        camera={{
          center: {
            latitude: region.latitude,
            longitude: region.longitude,
          },
          pitch: 0,
          heading: heading,
          // Define altitude and zoom if necessary
          altitude: 1000,
          zoom: 16,
        }}
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          title="My Location"
        />
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="#000"
          strokeColors={['#7F0000']}
          strokeWidth={3}
        />
      </MapView>
    </View>
  );
};

export default MapViewComponent;
