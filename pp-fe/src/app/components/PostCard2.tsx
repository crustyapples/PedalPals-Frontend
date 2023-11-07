import React from 'react';
import { View, Text, Image } from 'react-native';
// import { View, Text } from './Themed';

type PostCardProps = {
  caption: string;
  comments: any;
  likes: number;
  route: any;
  timestamp: any;
  user: any;
};

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;

// const PostCard2: React.FC<PostCardProps> = ({caption, comments, likes, route, timestamp, user }) => {

   
    
//   return (
//     <View className="bg-white p-4 rounded-lg shadow-md m-2">

//       <View className="flex flex-row items-center">
//         <Image source={profilePic} className="w-10 h-10 rounded-full" />
        
//         <Text className="ml-2">{username}</Text>
//       </View>
//       <Image source={mapImage} className="w-full h-40 mt-2 rounded-lg" />
//       <View className="flex flex-row mt-2">
//         <View className="flex-1">
//           <Text>Distance Travelled</Text>
//           <Text>{distance} km</Text>
//         </View>
//         <View className="flex-1">
//           <Text>Time Taken</Text>
//           <Text>{time}</Text>
//         </View>
//         <View className="flex-1">
//           <Text>Average Speed</Text>
//           <Text>{averageSpeed} km/h</Text>
//         </View>
//       </View>
//       <Text className="mt-2">{description}</Text>
//     </View>
//   );
// };

// export default PostCard2;
