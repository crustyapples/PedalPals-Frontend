import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, ScrollView } from 'react-native';

import UserDetails from '../components/UserDetails';
import UserStats from '../components/UserStats';
import UserPosts from '../components/UserPosts';


  
const dummyData_UserPosts = [
    {
      profilePic: require("@/src/assets/images/favicon.png"),
      username: 'thelegend27',
      mapImage: require("@/src/assets/images/favicon.png"),
      distance: 22.34,
      time: '20m 14s',
      averageSpeed: 66.23,
      description: 'First cycle of the week!'
    },
    {
      profilePic: require("@/src/assets/images/favicon.png"),
      username: 'thelegend27',
      mapImage: require("@/src/assets/images/favicon.png"),
      distance: 13.51,
      time: '1h 20m',
      averageSpeed: 10.13,
      description: ''
    },
    {
      profilePic: require("@/src/assets/images/favicon.png"),
      username: 'thelegend27',
      mapImage: require("@/src/assets/images/favicon.png"),
      distance: 22.34,
      time: '20m 14s',
      averageSpeed: 66.23,
      description: 'Second cycle of the week!'
    }
    // ... more dummy data
  ];
  
  


  // type ProfileScreenProps = {
  //   profilePic: any,
  //   username: string,
  //   numOfPals: number,
  // teleHandle: string,
  // instaHandle: string,
  // numOfReward1: number,
  // numOfReward2: number,
  // numOfReward3: number,
  // totalDistanceTravelled: number,
  // averageSpeed: number,
  // socialPostData: any
  // };




    



const ProfilePage: React.FC= () => {

  const profilePic= require("@/src/assets/images/favicon.png")
  const username= "thelegend27"
  const numOfPals= 5
  const teleHandle= "@thelegend27"
  const instaHandle = "@thelegend27"
  const numOfReward1= 5
  const numOfReward2= 2
  const numOfReward3= 23
  const totalDistanceTravelled= 22.34
  const averageSpeed= 66.23
  const socialPostData = dummyData_UserPosts




  // const UserData = 
  // {
  //     profilePic: require("@/src/assets/images/favicon.png"),
  //     username: "thelegend27",
  //     numOfPals: 5,
  //   teleHandle: "@thelegend27",
  //   instaHandle:"@thelegend27",
  //   numOfReward1: 5,
  //   numOfReward2: 2,
  //   numOfReward3: 23,
  //   totalDistanceTravelled: 22.34,
  //   averageSpeed: 66.23,
  //   socialPostData: dummyData_UserPosts
  // }

    return(
        <View>
            <UserDetails profilePic={profilePic} username={username} numOfPals={numOfPals} teleHandle = {teleHandle} instaHandle = {instaHandle} numOfReward1 = {numOfReward1} numOfReward2 = {numOfReward2} numOfReward3 = {numOfReward3} />
            <UserStats totalDistanceTravelled={totalDistanceTravelled} averageSpeed = {averageSpeed}/>
            <UserPosts socialPostData = {socialPostData}/>
        </View>


    


    );


};

export default ProfilePage;