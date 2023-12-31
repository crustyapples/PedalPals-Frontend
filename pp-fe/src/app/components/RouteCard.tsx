import { Text, View, Image } from "react-native";
import polyline from "@mapbox/polyline";
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from "react-native-maps";
import { Pressable } from "react-native";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useDistanceUnit } from "../contexts/DistanceUnitContext";

type RouteCardProps = {
  start_coordinates?: string;
  end_coordinates?: string;
  route_difficulty: any;
  route_caption?: string;
  distance: number;
  route_geometry: string;
  date?: string;
  route_summary?: {
    start_point: string;
    end_point: string;
  };
};

const RouteCard: React.FC<RouteCardProps> = ({
  start_coordinates,
  end_coordinates,
  route_difficulty,
  route_caption,
  distance,
  route_geometry,
  date,
  route_summary,
}) => {
  const { distanceUnit, toggleDistanceUnit } = useDistanceUnit();
  // console.log("User specified unit", distanceUnit);

  const convertToMiles = (distanceInKm) => {
    // Conversion factor: 1 kilometer = 0.621371 miles
    return (distanceInKm * 0.621371).toFixed(2);
  };

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

  // console.log("This is the route geometry", route_geometry);

  return (
    <View className="flex-col items-start p-4 bg-white shadow-md rounded-lg m-3">
      <Text className="text-start font-bold text-lg text-black mb-2">
        {route_difficulty}
      </Text>

      {route_caption && (
        <Text className="text-start font-light text-sm text-black mb-2">
          {route_caption}
        </Text>
      )}

      {date && (
        <Text className="text-start font-light text-sm text-black mb-2">
          {date}
        </Text>
      )}

      <View className="flex-row items-center justify-center mb-3">
        <ShowMap />
      </View>

      {route_summary && (
        <View className="flex mt-2">
          <Text className="font-Poppins_Bold text-gray-600">
            START:{" "}
            <Text className="font-light text-sm text-gray-400">
              {route_summary?.start_point}
            </Text>
          </Text>
          <Text className="font-Poppins_Bold text-gray-600">
            END:{" "}
            <Text className="font-light text-sm text-gray-400">
              {route_summary?.end_point}
            </Text>
          </Text>
        </View>
      )}
      <View className="mt-2 flex-row items-center">
        <Text className="font-Poppins_Light text-sm text-gray-600">
          Distance
        </Text>
        <Text className="font-Poppins_Medium text-md text-gray-800">
          {distanceUnit === "miles"
            ? ` ${convertToMiles(distance)} mi`
            : ` ${Math.round(distance)} km`}
        </Text>
        <Pressable className="ml-48">
          <Link
            href={{
              pathname: "/mapTab",
              // /* 1. Navigate to the details route with query params */
              params: {
                start_coordinates: start_coordinates,
                end_coordinates: end_coordinates,
              },
            }}
          >
            <FontAwesome name="play-circle" size={25} color="black" />
          </Link>
        </Pressable>
      </View>
    </View>
  );
};

export default RouteCard;
