import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const PopupNotification = ({ message }) => {
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();

        
        const hideTimeout = setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }, 2000); 

        
        return () => clearTimeout(hideTimeout);
    }, [fadeAnim, message]); 

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <Text style={styles.message}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'green', 
        paddingVertical: 10,
        alignItems: 'center',
    },
    message: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default PopupNotification;
