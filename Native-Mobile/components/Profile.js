import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Navbar from './Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Profile() {
    const navigation = useNavigation();
    const route = useRoute();

    const [userData, setUserData] = useState({});
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem('@user_id')
            .then((id) => {
                if (id) {
                    setUserId(id);

                    fetch(`http://192.168.11.102:8080/api/user/${id}`)
                        .then((response) => response.json())
                        .then((data) => {
                            setUserData(data);
                        })
                        .catch((error) => console.error('Error fetching user data: ', error));
                }
            })
            .catch((error) => console.error('Error retrieving user ID: ', error));
    }, []);

    const handleUpdateProfile = async () => {
        try {
            const response = await fetch(`http://192.168.11.102:8080/api/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData), 
            });

            if (response.ok) {
                console.log('User data updated successfully');
                navigation.navigate('Home'); 
               } else {
                console.error('Failed to update user data');
            }
        } catch (error) {
            console.error('Error updating user data: ', error);
        }
    };

    return (
        <>
            <Navbar navigation={navigation} />
            <View style={styles.container}>
                <Text style={styles.title}>Modifier le Profile</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={userData.username}
                    onChangeText={(text) => setUserData({ ...userData, username: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={userData.password}
                    onChangeText={(text) => setUserData({ ...userData, password: text })}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    value={userData.num}
                    onChangeText={(text) => setUserData({ ...userData, phoneNumber: text })}
                    keyboardType="phone-pad"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={userData.email}
                    onChangeText={(text) => setUserData({ ...userData, email: text })}
                    keyboardType="email-address"
                />
                <Button title="Modifier" onPress={handleUpdateProfile} color={'black'} />
                <Button title="Annuler" onPress={() => navigation.navigate('Home')} color={'black'} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
    },
});

export default Profile;
