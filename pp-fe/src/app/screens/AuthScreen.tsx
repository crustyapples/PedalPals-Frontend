import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;

console.log('BASE_URL', BASE_URL);
// const BASE_URL = 'http://localhost:3000';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const { login } = useAuth();

  const authenticate = async () => {

    try {
      let response;
      if (isLogin) {
        const data = {
          email: email,
          password: password,
        };
        response = await axios.post(BASE_URL + '/login', data, {
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        const data = {
          username: username,
          name: name,
          email: email,
          password: password,
        };
        response = await axios.post(BASE_URL + '/signup', data, {
          headers: { 'Content-Type': 'application/json' },
        });
        
      }
  
      if (response.status === 201) {
        Alert.alert('Registration successful', 'Please login');
        setIsLogin(true);
        return;
      }
      else if (response.data && response.data.access_token) {
        console.log('Authentication successful!', response.data.access_token);
        login(response.data.access_token, email, response.data.user_id);
        console.log(response.data.user_id);
        console.log(email);
      } else {
        Alert.alert('Authentication failed', 'Please check your credentials');
      }
    } catch (error) {
      console.error('Authentication error', error);
      Alert.alert('Authentication error', 'Something went wrong');
    }
  };
  

  return (
    <View className='flex justify-center pt-64 px-4'>
      <Text className='font-bold text-5xl text-center mb-12'>Welcome to PedalPals!</Text>
      {!isLogin && (
        <>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
            placeholderTextColor={'gray'}
            className='border rounded p-2 mb-4'
            autoCapitalize="none"
          />
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Name"
            placeholderTextColor={'gray'}
            className='border rounded p-2 mb-4'
          />
        </>
      )}
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor={'gray'}
        className='border rounded p-2 mb-4'
        // style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={'gray'}
        className='border rounded p-2 mb-4'
        placeholder="Password"
        // style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
        secureTextEntry
      />
      <Button title={isLogin ? 'Login' : 'Register'} onPress={authenticate} />
      <Button
        title={`Switch to ${isLogin ? 'Register' : 'Login'}`}
        onPress={() => setIsLogin(!isLogin)}
        color="gray"
      />
    </View>
  );
};

export default AuthScreen;
