import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function LandingPage() {
    const navigation = useNavigation();

    const goToLogin = () => {
        navigation.navigate('Login');
    };

    const goToCreateUser = () => {
        navigation.navigate('CreateUser');
    };

    const skipIntro = () => {
        
    };

    return (
        <ImageBackground
            source={require('../assets/bg3.png')}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to DIGIUP</Text>
                <Button title="Login" onPress={goToLogin} color="#00235B" />
                <View style={styles.buttonSpacing} />
                <Button title="Sign-Up" onPress={goToCreateUser} color="#00235B" />
                <TouchableOpacity onPress={skipIntro}>
                    <Text style={styles.skipButton}>Skip</Text>
                </TouchableOpacity>
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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff57',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginTop: -80,
        fontWeight: 'bold',
        color:'#00235B',
        marginBottom: 360,
    },
    buttonSpacing: {
        marginVertical: 5,
    },
    skipButton: {
        marginTop: -540,
        fontSize: 18,
        marginLeft: 300, 
        color: '#00235B',
        textDecorationLine: 'underline',
    },
});

export default LandingPage;
