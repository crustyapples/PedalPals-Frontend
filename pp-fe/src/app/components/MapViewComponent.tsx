import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapViewComponent = ({ region, routeCoordinates, routePoints, showBicycleRacks, showWaterPoint, routePlanned }) => {
  const [heading, setHeading] = useState(0);
  const [currentLocation, setCurrentLocation] = useState(region); // Default to the initial region

  useEffect(() => {
    let headingSubscription;
    let locationSubscription;

    const subscribeToHeading = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        headingSubscription = await Location.watchHeadingAsync((data) => {
          setHeading(data.magHeading);
        });
      }
    };

    const subscribeToLocationUpdates = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 1,
          },
          (location) => {
            setCurrentLocation({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          }
        );
      }
    };

    subscribeToHeading();
    subscribeToLocationUpdates();

    return () => {
      if (headingSubscription) {
        headingSubscription.remove();
      }
      if (locationSubscription) {
        locationSubscription.remove();
      }
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
        region={currentLocation}
        zoomEnabled={true}
        scrollEnabled={true}
        rotateEnabled={true}
        pitchEnabled={true}
        camera={{
          center: currentLocation,
          pitch: 0,
          heading: heading,
          altitude: 1000,
          zoom: 16,
        }}
      >
        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            title="My Location"
          />
        )}
        {routePlanned && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#000"
            strokeColors={['#7F0000']}
            strokeWidth={3}
          />
        )}
        {routePoints.map((point) => (
          point.type === "WaterPoint" && routePlanned && showWaterPoint && (
            <Marker
              key={point._id}
              coordinate={parseCoordinates(point.coordinates)}
              title={point.name}
              description={point.description}
              pinColor={getMarkerColor(point.type)}
            />
          )
        ))}
        {routePoints.map((point) => (
          point.type === "bikeRack" && showBicycleRacks && routePlanned && (
            <Marker
              key={point._id}
              coordinate={parseCoordinates(point.coordinates)}
              title={point.name}
              description={point.description}
              pinColor={getMarkerColor(point.type)}
            />
          )
        ))}
      </MapView>
    </View>
  );
};

export default MapViewComponent;
