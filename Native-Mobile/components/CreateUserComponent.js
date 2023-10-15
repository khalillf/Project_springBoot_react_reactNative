import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';

function CreateUserComponent({ navigation }) {
    const [user, setUser] = useState({
        username: '',
        password: '',
        email: '',
        num: '',
        isadmin: 'false',
    });

    const changeUsernameHandler = (text) => {
        setUser({ ...user, username: text });
    };

    const changePasswordHandler = (text) => {
        setUser({ ...user, password: text });
    };

    const changeEmailHandler = (text) => {
        setUser({ ...user, email: text });
    };

    const changeNumHandler = (text) => {
        setUser({ ...user, num: text });
    };

    const saveUser = () => {
        console.log('data: ', user);
        fetch('http://192.168.11.102:8080/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((response) => {
                if (response.status === 201) {
                    setUser({
                        ...user,
                        isPopupVisible: true,
                        popupMessage: 'User created successfully!',
                    });
                    navigation.navigate('Home');
                } else {
                    setUser({
                        ...user,
                        isPopupVisible: true,
                        popupMessage: 'User created successfully! You can login',
                    });
                }
            })
            .catch((error) => {
                console.error('Error creating user:', error);
                setUser({
                    ...user,
                    isPopupVisible: true,
                    popupMessage: 'User created successfully! You can login',
                });
            });
    };

    const handlePopupClose = () => {
        setUser({
            ...user,
            isPopupVisible: false,
            popupMessage: '',
        });
        navigation.navigate('LandingPage'); 
    };

    const handlePopupRetry = () => {
        setUser({
            ...user,
            isPopupVisible: false,
            popupMessage: '',
        });
    };

    return (
        <ImageBackground
            source={require('../assets/bg3.png')}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Sign-Up</Text>
                <TextInput
                    placeholder="Username"
                    style={styles.input}
                    value={user.username}
                    onChangeText={changeUsernameHandler}
                />
                <TextInput
                    placeholder="Password"
                    style={styles.input}
                    value={user.password}
                    onChangeText={changePasswordHandler}
                />
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    value={user.email}
                    onChangeText={changeEmailHandler}
                />
                <TextInput
                    placeholder="Num"
                    style={styles.input}
                    value={user.num}
                    onChangeText={changeNumHandler}
                />
                <Button title="Save" onPress={saveUser} color="#094267" />
                {user.isPopupVisible && (
                    <View style={styles.popup}>
                        <Text>{user.popupMessage}</Text>
                        <Button title="OK" onPress={handlePopupClose} />
                        <Button title="Retry" onPress={handlePopupRetry} />
                    </View>
                )}
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
        padding: 16,
        justifyContent: 'center',
        backgroundColor: '#ffffff57',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: 'white', 
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
        backgroundColor: 'white', 
    },
    popup: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(12, 332, 0, 0.8)',
        padding: 10,
        borderRadius: 5,
    },
});

export default CreateUserComponent;
