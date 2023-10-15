import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text
                style={styles.digiupText}
                onPress={() => navigation.navigate('Home')} 
            >
                Digiup
            </Text>
            <View style={styles.iconGroup}>
                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Icon name="home" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => navigation.navigate('Profile')}
                >
                    <Icon name="user" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.iconContainer}
                >
                    <Icon name="shopping-cart" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => navigation.navigate('Payment')}
                >
                    <Icon name="credit-card" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#000',
        padding: 10,
    },
    iconGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        padding: 10,
    },
    digiupText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Navbar;
