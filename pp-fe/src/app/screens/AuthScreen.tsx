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
        login(response.data.access_token);
      } else {
        Alert.alert('Authentication failed', 'Please check your credentials');
      }
    } catch (error) {
      console.error('Authentication error', error);
      Alert.alert('Authentication error', 'Something went wrong');
    }
  };
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      {!isLogin && (
        <>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
            autoCapitalize="none"
          />
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Name"
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
          />
        </>
      )}
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
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
