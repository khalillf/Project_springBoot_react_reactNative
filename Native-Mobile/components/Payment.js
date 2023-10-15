import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar from './Navbar';

function Payment() {
    const navigation = useNavigation();

    const [cardNumber, setCardNumber] = useState('8888 9999 7777 3333 4444');
    const [cardholderName, setCardHolder] = useState('Mr .Khalil Laafou');
    const [expirationDate, setExpiryDate] = useState('07/12');
    const [securityCode, setCvv] = useState('1234');

    const [showPaymentMessage, setShowPaymentMessage] = useState(false);

    
    const handlePayment = () => {
        setShowPaymentMessage(true);
    };

    useEffect(() => {
        
        fetch('http://192.168.11.102:8080/api/payment-cards')
            .then((response) => response.json())
            .then((data) => {
                if (data && data.length > 0) {
                    console.log('data :',data)
                    const firstCard = data[0]; 
                    setCardNumber(firstCard.cardNumber);
                    setCardHolder(firstCard.cardholderName);
                    setExpiryDate(firstCard.expirationDate);
                    setCvv(firstCard.securityCode);
                }
            })
            .catch((error) => console.error('Error fetching payment card data: ', error));
    }, []);


    useEffect(() => {
       
        if (showPaymentMessage) {
            const timer = setTimeout(() => {
                setShowPaymentMessage(false);
                navigation.navigate('Home');
            }, 2000);

            
            return () => clearTimeout(timer);
        }
    }, [showPaymentMessage, navigation]);

    return (
        <>
            <Navbar navigation={navigation} />
            <View style={styles.container}>
                <Text style={styles.title}>Payment Details</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Card Number"
                    value={cardNumber}
                    onChangeText={(text) => setCardNumber(text)}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Card Holder Name"
                    value={cardholderName}
                    onChangeText={(text) => setCardHolder(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Expiry Date (MM/YY)"
                    value={expirationDate}
                    onChangeText={(text) => setExpiryDate(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="CVV"
                    value={securityCode}
                    onChangeText={(text) => setCvv(text)}
                    keyboardType="numeric"
                />
                <Button
                    title="Save"
                    onPress={() => {
                        handlePayment();
                    }}
                    color="black"
                />
                {showPaymentMessage && (
                    <View style={styles.popup}>
                        <Text style={styles.popupText}>Payment Updated</Text>
                    </View>
                )}
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
    popup: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(134, 0, 0, 0.8)',
        padding: 10,
        borderRadius: 5,
    },
    popupText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default Payment;
