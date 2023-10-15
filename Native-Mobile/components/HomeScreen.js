import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, Image, TextInput } from 'react-native';
import Navbar from './Navbar';
import PopupNotification from './PopupNotification';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        fetch('http://192.168.11.102:8080/api/products')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => console.error('Error fetching products: ', error));
    }, []);

    const addToCart = (product) => {
        if (!cartItems.some((item) => item.id === product.id)) {
            const newCartItems = [...cartItems, product];
            setCartItems(newCartItems);
            setNotificationMessage(`Added ${product.name} to cart`);
        }
    };

    const removeFromCart = (productId) => {
        const updatedCart = cartItems.filter((item) => item.id !== productId);
        setCartItems(updatedCart);
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Navbar navigation={navigation} />

            <View style={styles.rowContainer}>
                <TextInput
                    style={styles.filterInput}
                    placeholder="Find Product"
                    value={filterText}
                    onChangeText={(text) => setFilterText(text)}
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('Panier', { cartItems, removeFromCart })}
                    style={styles.addToCartButton}
                >
                    <Text style={styles.addToCartButtonText}>Go to Panier</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.productContainer}>
                {filteredProducts.map((product) => (
                    <View key={product.id} style={styles.productItem}>
                        <View style={styles.productFrame}>
                            <Image
                                source={{ uri: `data:image/jpeg;base64,${product.photoData}` }}
                                style={styles.productImage}
                            />
                            <Text style={styles.title}>{product.name}</Text>
                            <Text style={styles.price}>Price: {product.price} DH</Text>
                            <TouchableOpacity
                                onPress={() => addToCart(product)}
                                style={styles.addToCartButton}
                            >
                                <Icon name="plus-circle" size={20} color="white" />
                                <Text style={styles.addToCartButtonText}>Panier</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>

            {notificationMessage && (
                <PopupNotification message={notificationMessage} />
            )}

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#E3E3E3',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    filterInput: {
        flex: 1,
        paddingHorizontal: 10,
        height: 40,
        borderColor: 'white',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderRadius: 5,
    },
    productFrame: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
    },
    price: {
        color: '#356',
    },
    topRow: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 16,
        marginTop: 20,
        backgroundColor: '#000',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    digiupText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    button: {
        alignItems: 'center',
        margin: 10,
    },
    buttonText: {
        color: 'black',
        marginTop: 5,
    },
    productContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    productItem: {
        width: '32%',
        marginBottom: 10,
    },
    addToCartButton: {
        backgroundColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        borderRadius: 5,
        padding: 5,
    },
    addToCartButtonText: {
        color: 'white',
        marginLeft: 5,
    },
    productImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
    },
});

export default HomeScreen;
