import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://192.168.11.102:8080/api/products')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => console.error('Error fetching products: ', error));
    }, []);

    const addToBasket = (product) => {
        
        console.log('Adding product to basket:', product);
    };

    return (
        <View style={styles.container}>
            {products.map((product, index) => (
                <View key={index} style={styles.product}>
                    <Image source={{ uri: `data:image/jpeg;base64,${product.imageBase64}` }} style={styles.image} />
                    <Text style={styles.title}>{product.name}</Text>
                    <Text style={styles.price}>Price: {product.price} DH</Text>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => addToBasket(product)}
                    >
                        <Text style={styles.buttonText}>Add to Basket</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    product: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 14,
    },
    addButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ProductList;