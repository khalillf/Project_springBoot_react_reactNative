import React, { useState } from 'react';
import FooterComponent from './FooterComponent';
import ProductList from './ProductList';
import '../css/HomeComponent.css';
import NavComponent from './NavComponent';
import BasketPopup from './BasketPopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import Image4 from './image3';
import Swipper from './sliderwithadd';
function HomeComponent({ addToBasket, loggedIn, onLogout, basket,removeFromBasket }) {


  const containerStyles = {
    width: '700px',
    height: '450px',
    margin: '0 auto',
  };
  const [showBasketPopup, setShowBasketPopup] = useState(false);

  

  const openBasketPopup = () => {
    setShowBasketPopup(true);
  };

  
  const closeBasketPopup = () => {
    setShowBasketPopup(false);
  };
  return (
    <div>
      <Swipper />
      <div className="home-content ">
      <div className='digistyle'>
        </div>
        <ProductList addToBasket={addToBasket} basket={basket} openBasketPopup={openBasketPopup} />
        
        {}
        {showBasketPopup && (
          <BasketPopup removeFromBasket={removeFromBasket} basket={basket} onClose={closeBasketPopup} />
        )}
        <div>
      
       </div>

      </div>
      <FooterComponent />
    </div>
  );
}

export default HomeComponent;
