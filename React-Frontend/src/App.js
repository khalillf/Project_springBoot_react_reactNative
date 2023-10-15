import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeComponent from './components/HomeComponent'; 
import UserList from './components/UserList';
import CreateUserComponent from './components/CreateUserComponent';
import AddProductComponent from './components/AddProductComponent';
import LoginComponent from './components/LoginComponent';
import UpdateProductComponent from './components/UpdateProductComponent';
import EditUserComponent from './components/EditUserComponent';
import Basket from './components/Basket';
import HeaderComponent from './components/Header'; 
import AboutComponent from './components/AboutComponent';
import AddUserAdmin from './components/adduseradmin';
import EditUserNormal from './components/updateusernormal';
import PaymentCardForm from './components/PaymentCardForm';
import ProductList from './components/Produitlist'

function App() {
  const [basket, setBasket] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showBasketPopup, setShowBasketPopup] = useState(false);

  useEffect(() => {
    const checkIfLoggedIn = () => {
      const token = localStorage.getItem('token');
      return !!token;
    };

    setLoggedIn(checkIfLoggedIn());
  }, []);

  const addToBasket = (product) => {
    if (!loggedIn) {
      alert('Veuillez vous inscrire et connecter pour ajouter des articles à votre panier.');
    } else {
      setBasket([...basket, product]);
      setShowBasketPopup(false); 
    }
  };
  
  const removeFromBasket = (index) => {
    const updatedBasket = [...basket];
    updatedBasket.splice(index, 1);
    setBasket(updatedBasket);
  };

  const calculateTotal = () => {
    return basket.reduce((total, product) => total + product.price, 0);
  };

  const handleLogin = (username) => {
    setLoggedIn(true);
    const storedId = localStorage.getItem('id');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    localStorage.removeItem('iduser');
    localStorage.removeItem('loggedin');
    localStorage.removeItem('isadmin');
    setLoggedIn(false);
  };

  return (
    <Router>
      <HeaderComponent loggedIn={loggedIn} isAdmin={localStorage.getItem('isadmin') === 'true'} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomeComponent addToBasket={addToBasket} basket={basket} removeFromBasket={removeFromBasket} showBasketPopup={showBasketPopup} toggleBasketPopup={() => setShowBasketPopup(!showBasketPopup)} />} />
        {loggedIn && (
          <>
            {localStorage.getItem('isadmin') === 'true' && (
              <>
                <Route path="/usersadmin" element={<AddUserAdmin />} />
                <Route path="/product" element={<ProductList />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/add-product" element={<AddProductComponent />} />
                <Route path="/edit-product/:id" element={<UpdateProductComponent />} />
              </>
            )}
            <Route path="/edit-user/:id" element={<EditUserComponent />} />
            <Route path="/add-user" element={<CreateUserComponent />} />
            <Route path="/update-user-normal" element={<EditUserNormal />} />
            <Route path="/payment" element={<PaymentCardForm />} />
            <Route
              path="/login"
              element={<LoginComponent onLogin={handleLogin} />}
            />
            <Route path="/basket"
              element={ <Basket basket={basket}removeFromBasket={removeFromBasket} calculateTotal={calculateTotal} loggedIn={loggedIn}onLogout={handleLogout}
                />
              }
            />
          </>
        )}
        <Route path="/about" element={<AboutComponent />} />
        {!loggedIn && (
          <Route
            path="/login"
            element={<LoginComponent onLogin={handleLogin} />}
          />
        )}
        {!loggedIn && <Route path="/add-user" element={<CreateUserComponent />} />}
      </Routes>
    </Router>
  );
}

export default App;
