import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Button, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Panier = ({ route }) => {
    const { cartItems, removeFromCart } = route.params;
    const [showBuyPopup, setShowBuyPopup] = useState(false);
    const navigation = useNavigation();
    if (!cartItems?.length) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Panier</Text>
                <Text>Your cart is empty.</Text>
            </View>
        );
    }
    const handleBuyButtonPress = () => {
        setShowBuyPopup(true);
    };

    const handleBuyPopupClose = () => {
        setShowBuyPopup(false);
        navigation.navigate('Home');
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Panier</Text>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.cartItem}>
                        <Image
                            source={{ uri: `data:image/jpeg;base64,${item.photoData}` }}
                            style={styles.productImage}
                        />
                        <View>
                            <Text>{item.name}</Text>
                            <Text>Price: {item.price} DH</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => removeFromCart(item.id)}
                            style={styles.removeButton}
                        >
                            <Text style={styles.removeButtonText}>Remove</Text>
                        </TouchableOpacity>

                    </View>
                )}
            />
            <Text style={styles.total}>Total: {calculateTotal().toFixed(2)} DH</Text>
            <Button
                title="BUY"
                onPress={handleBuyButtonPress}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={showBuyPopup}
                onRequestClose={handleBuyPopupClose}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Merci pour votre achat!</Text>
                        <Pressable
                            style={styles.modalButton}
                            onPress={handleBuyPopupClose}
                        >
                            <Text style={styles.modalButtonText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 15,
        textAlign: 'center',
    },
    modalButton: {
        backgroundColor: 'black',
        borderRadius: 5,
        padding: 10,
        elevation: 2,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    container: {
        margin: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 10,
    },
    productImage: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
        marginRight: 10,
    },
    removeButton: {
        backgroundColor: 'red',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    removeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    total: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Panier;
