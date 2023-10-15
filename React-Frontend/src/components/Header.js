import React, { useState } from 'react';
import '../css/HeaderComponent.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDollyFlatbed,
  faUser,
  faHome,
  faEdit,
  faSignInAlt,
  faStoreAlt,
  faUsers,
  faBoxOpen,
  faMoneyCheckAlt,
} from '@fortawesome/free-solid-svg-icons';

function HeaderComponent({ loggedIn, isAdmin, onLogout }) {
  const userInfoClass = loggedIn ? 'user-info show' : 'user-info hide';
  const username = localStorage.getItem('username');

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="imag">
          <img src="/logod.png" alt="DigiUp Logo" />
        </div>
        <ul className="nav-list">
          <li>
            <Link to="/" className="nav-link">
            <FontAwesomeIcon icon={faHome} style={{ marginRight: '5px'}} />
              Accueil
            </Link>
          </li>
         
          {!loggedIn && (
            <>
              <li>
                <Link to="/add-user" className="nav-link">
                <FontAwesomeIcon icon={faSignInAlt} style={{ marginRight: '5px'}} />
                  Sign up
                </Link>
              </li>
            </>
          )}
          {loggedIn && (
            <>
              {isAdmin && (
                <>
                  <li>
                  <FontAwesomeIcon icon={faUsers} style={{ marginRight: '5px'}} />
                    <Link to="/users" className="nav-link">
                      Utilisateurs
                    </Link>
                  </li>
                  <li>
                  <FontAwesomeIcon icon={faBoxOpen}  />
                  <Link to="/product" className="nav-link">Produits</Link>
                  </li>
                </>
              )}
               {!isAdmin && (
              <li>
                <Link to="/basket" className="nav-link">
                <FontAwesomeIcon icon={faDollyFlatbed} style={{ marginRight: '5px'}} />
                Panier
                </Link>
              </li> )}
            </>
          )}
           <li>
            {!loggedIn &&(
              <Link to="/login" className="nav-link">
                <FontAwesomeIcon icon={faUser} />
                Login
              </Link>
            )}
          </li>

          <li>
                <div className={userInfoClass}>
                {loggedIn  && (
                  <li className="produit-link">
                    <FontAwesomeIcon icon={faUser} />
                    <ul className="sub-nav">
                      <p style={{color: 'black'}}>Profile</p>
                      <li>
                      <Link to="/update-user-normal">
                          <FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px'}} />Modifier
                      </Link>
                      </li>
                      <Link to="/payment">
                          <FontAwesomeIcon icon={faMoneyCheckAlt} style={{ marginRight: '5px'}} />Payment 
                      </Link>
                    </ul>
                    
                  </li>
            )}
              <p>{username}</p>
              <a className="logout-button" onClick={onLogout}>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default HeaderComponent;
