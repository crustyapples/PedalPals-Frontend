import { Text, View, Image } from "react-native";
import polyline from "@mapbox/polyline";
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from 'react-native-maps';

type RouteCardProps = {
  route_difficulty: any;
  distance: number;
  route_geometry: string;
};

const RouteCard: React.FC<RouteCardProps> = ({
  route_difficulty,
  distance,
  route_geometry,
}) => {
  const routeCoordinates = polyline
    .decode(route_geometry)
    .map((coordinate) => ({
      latitude: coordinate[0],
      longitude: coordinate[1],
    }));


  const calculateRegion = () => {
    if (routeCoordinates.length === 0) {
      return {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    }

    const latitudes = routeCoordinates.map((coordinate) => coordinate.latitude);
    const longitudes = routeCoordinates.map(
      (coordinate) => coordinate.longitude
    );

    const maxLatitude = Math.max(...latitudes);
    const minLatitude = Math.min(...latitudes);
    const maxLongitude = Math.max(...longitudes);
    const minLongitude = Math.min(...longitudes);

    const latitudeDelta = maxLatitude - minLatitude;
    const longitudeDelta = maxLongitude - minLongitude;

    return {
      latitude: (maxLatitude + minLatitude) / 2,
      longitude: (maxLongitude + minLongitude) / 2,
      latitudeDelta,
      longitudeDelta,
    };
  };

  const region = calculateRegion();

  const ShowMap = () => {
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        // style={{ flex: 1 }}
        className="w-full h-40 rounded-lg"
        region={{
          ...region,
          // latitudeDelta: 0.0922,
          // longitudeDelta: 0.0421,
        }}
        zoomEnabled={false}
        scrollEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        // Rotate the map according to the heading
      >
        {/* <Marker
        coordinate={{
          latitude: region.latitude,
          longitude: region.longitude,
        }}
        title="My Location"
      /> */}
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="#000"
          strokeColors={["#7F0000"]}
          strokeWidth={3}
        />
      </MapView>
    );
  };

  return (
    <View className="flex-col items-center p-4 bg-white shadow-md rounded-lg m-3">
      <Text className="text-center font-Poppins_Bold text-lg text-black mb-2">
        {route_difficulty}
      </Text>

      <View className="flex-row items-center justify-center mb-3">
        <ShowMap />              
      </View>

      <View className="flex-col items-center">
        <Text className="font-Poppins_Light text-sm text-gray-600">
          Distance
        </Text>
        <Text className="font-Poppins_Medium text-md text-gray-800">
          {`${distance} km`}
        </Text>
      </View>
    </View>
  );
};

export default RouteCard;
