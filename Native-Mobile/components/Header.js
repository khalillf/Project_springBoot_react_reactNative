import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const Header = ({ title, navigation }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                style={styles.menuButton}
            >
                <Text style={styles.menuButtonText}>Menu</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#2196F3',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: '#FFF',
        fontWeight: 'bold',
    },
    menuButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
    },
    menuButtonText: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: 'bold',
    },
});
