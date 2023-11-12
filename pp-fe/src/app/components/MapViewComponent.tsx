import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapViewComponent = ({ region, routeCoordinates, routePoints, showBicycleRacks, showWaterPoint, routePlanned }) => {
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

    // Helper function to parse coordinates from string to object
    const parseCoordinates = (coordinatesString) => {
      const [latitude, longitude] = coordinatesString.replace('(', '').replace(')', '').split(', ').map(Number);
      return { latitude, longitude };
    };

      // Helper function to determine marker color based on point type
    const getMarkerColor = (pointType) => {
      switch (pointType) {
        case 'WaterPoint':
          return 'blue';
        case 'bikeRack':
          return 'green';
        default:
          return 'red';
      }
    };

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
        {routePlanned && <Polyline
          coordinates={routeCoordinates}
          strokeColor="#000"
          strokeColors={['#7F0000']}
          strokeWidth={3}
        />}
        {routePoints.map((point) => (
          (point.type == "WaterPoint") && routePlanned && showWaterPoint && <Marker
            key={point._id}
            coordinate={parseCoordinates(point.coordinates)}
            title={point.name}
            description={point.description}
            pinColor={getMarkerColor(point.type)}
          />
        ))}
        {routePoints.map((point) => (
          (point.type == "bikeRack") && showBicycleRacks && routePlanned && <Marker
            key={point._id}
            coordinate={parseCoordinates(point.coordinates)}
            title={point.name}
            description={point.description}
            pinColor={getMarkerColor(point.type)}
          />
        ))}
      </MapView>
    </View>
  );
};

export default MapViewComponent;
