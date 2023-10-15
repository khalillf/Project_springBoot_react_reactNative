import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

function LoginComponent({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://192.168.11.102:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Response JSON:', data);

                
                await AsyncStorage.setItem('@user_id', data.id.toString());

                navigation.navigate('Home'); 
            } else {
                alert('Invalid username or password');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <ImageBackground
            source={require('../assets/bg3.png')}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry
                />
                <Button title="Login" onPress={handleLogin} color="#00235B" />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff57',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: '#333', 
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#ccc', 
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
        backgroundColor: '#fff', 
    },
});

export default LoginComponent;
