import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, ScrollView, FlatList } from 'react-native';
import Notification from '../components/Notification';


const dummyDataNotification = [
    {
        id: 1,
        profilePic: require("@/src/assets/images/favicon.png"),
        username: "the_man",
        update: "has requested to follow you",
    },
    {
        id: 2,
        profilePic: require("@/src/assets/images/favicon.png"),
        username: "the_myth",
        update: "liked your post",
    },
    {
        id: 3,
        profilePic: require("@/src/assets/images/favicon.png"),
        username: "the_legend",
        update: "commented 'Nice job!' on your post.",
    },
    {
        id: 4,
        profilePic: require("@/src/assets/images/favicon.png"),
        username: "the_man",
        update: " and 3 other liked your post",
    },
    {
        id: 5,
        profilePic: require("@/src/assets/images/favicon.png"),
        username: "the_myth",
        update: "has requested to follow you",
    },
    {
        id: 6,
        profilePic: require("@/src/assets/images/favicon.png"),
        username: "the_legend",
        update: "has requested to follow you",
    },
    {
        id: 7,
        profilePic: require("@/src/assets/images/favicon.png"),
        username: "the_legend",
        update: "has requested to follow you",
    },
    {
        id: 8,
        profilePic: require("@/src/assets/images/favicon.png"),
        username: "the_legend",
        update: "has requested to follow you",
    },
    {
        id: 9,
        profilePic: require("@/src/assets/images/favicon.png"),
        username: "the_legend",
        update: "has requested to follow you",
    },
    {
        id: 10,
        profilePic: require("@/src/assets/images/favicon.png"),
        username: "the_legend",
        update: "has requested to follow you",
    },
    {
        id: 11,
        profilePic: require("@/src/assets/images/favicon.png"),
        username: "the_legend",
        update: "has requested to follow you",
    },
    {
        id: 12,
        profilePic: require("@/src/assets/images/favicon.png"),
        username: "the_legend",
        update: "has requested to follow you",
    }


  ]

  



const NotificationPage: React.FC= () => {
    return(
        <View>
            <ScrollView>
      {dummyDataNotification.map((cycle, index) => (
        <Notification key={index} {...cycle} />
      ))}
    </ScrollView>

        </View>
    )

}


export default NotificationPage;