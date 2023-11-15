import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import Swiper from "react-native-swiper";

const GetStarted = ({ onPressGsButton }) => {
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer);
  }, [currentIndex]);

  const slides = [
    {
      image: require("@/src/assets/images/cycle-5.jpg"),
      caption: "New Paths, New Friendships",
    },
    {
      image: require("@/src/assets/images/cycle-6.jpg"),
      caption: "Socialise with other cyclists",
    },
    { image: require("@/src/assets/images/cycle-7.jpg"), 
      caption: "Find the best cycling routes in Singapore" 
    },
  ];

  return (
    <View className="h-screen">
      <View className="flex-1 flex-col">
        <Swiper
          loop={false}
          showsButtons={false}
          showsPagination={true}
          
        >
          {slides.map((slide, index) => (
            <View key={index}>
              <View className="h-3/4">
                <View>
                  {/* <Text className='font-bold text-5xl text-center mb-12'>PedalPals</Text> */}
                  <Image
                    className="object-cover w-full h-full"
                    source={slide.image}
                  />
                </View>
              </View>

              <View
                className="h-1/4 items-center justify-center"
                key={`${index}-caption`}
              >
                <Text className="text-center font-Poppins_Bold text-xl mb-4">{slide.caption}</Text>
              </View>
            </View>
          ))}
        </Swiper>
      </View>

      <View className="ml-4 mr-4">
        <Pressable onPress={onPressGsButton}>
          <View className="bg-gray-200 h-16 w-full items-center justify-center mb-16 rounded-lg">
            <Text className="text-center font-bold text-2xl">Get Started</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default GetStarted;
