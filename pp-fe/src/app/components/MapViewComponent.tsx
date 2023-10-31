import React from 'react';
import { View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';

const MapViewComponent = ({ region, routeCoordinates }) => {
  return (
    <View className="flex-1">
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        region={region}
      >
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={['#7F0000']}
          strokeWidth={3}
        />
      </MapView>
    </View>
  );
};

export default MapViewComponent;
