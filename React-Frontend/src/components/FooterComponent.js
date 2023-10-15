import React from 'react';
import '../css/FooterComponent.css'; 

function FooterComponent() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <img src="/logod.png" alt="DigiUp Logo" />
                    <p>Thinking Outside The Box</p>
                </div>
                <div className="footer-links">
                    <ul>
                        <li><a href="/">Accueil</a></li>
                        <li><a href="/add-user">Sign Up</a></li>
                        <li><a href="/about">À propos</a></li>
                    </ul>
                </div>
                <div className="footer-contact">
                    <p>Contactez-nous :</p>
                    <p>Email : contact@digihub.com</p>
                    <p>Téléphone : +1234567890</p>
                </div>
            </div>
            <p className="footer-copyright">Droit d'auteur © 2023 DigiUp</p>
        </footer>
    );
}

export default FooterComponent;
