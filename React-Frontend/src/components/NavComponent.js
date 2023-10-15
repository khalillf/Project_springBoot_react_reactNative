import React, { useState } from 'react';
import '../css/HeaderComponent.css';

function NavComponent() {
    const [selectedCategory, setSelectedCategory] = useState(null);

        const categorySousCategoryMap = {
        'Mode homme': ['T-shirt', 'Chemise', 'Pantalon', 'Chaussures'],
        'Mode femme': ['Robe', 'Blouse', 'Jupe', 'Chaussures'],
        'Téléphones portables': ['Smartphones', 'Accessoires', 'Tablettes'],
        'Tvs': ['LED TVs', 'Smart TVs', '4K TVs', 'Accessoires'],
        'Informatique': ['Ordinateurs portables', 'PC de bureau', 'Accessoires', 'Imprimantes', 'Gaming laptop'],
        'Beauté & Santé': ['Maquillage', 'Soins de la peau', 'Parfums', 'Accessoires'],
        'Electroménager': ['Réfrigérateurs', 'Lave-linge', 'Cuisinières', 'Aspirateurs'],
        'Jeux vidéos & Consoles': ['Consoles', 'Jeux', 'Accessoires', 'Manettes'],
        'Bébé & Enfants': ['Vêtements', 'Jouets', 'Poussettes', 'Accessoires'],
        'Sports & Fitness': ['Vêtements de sport', 'Équipement de fitness', 'Chaussures de sport', 'Accessoires'],
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
            };

    return (
        <header className="header">
            <nav className="navb">
                <ul className="nav-list">
                    {Object.keys(categorySousCategoryMap).map((category) => (
                        <li key={category}>
                            <div
                                className={`nav-link ${selectedCategory === category ? 'active' : ''}`}
                                onClick={() => handleCategoryClick(category)}
                            >
                                <img src={categorySousCategoryMap[category].image} alt={category} />
                                <br />
                                {category}
                                {selectedCategory === category && (
                                    <ul className="sub-category-list">
                                        {categorySousCategoryMap[category].map((subcategory) => (
                                            <li key={subcategory}>{subcategory}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}

export default NavComponent;
