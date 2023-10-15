import React, { useState } from 'react';
import '../css/HeaderComponent.css';
import NavComponent from './NavComponent';
import ProductList from './ProductList';

function MainComponent() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategoryClick = (category) => {
        
        setSelectedCategory(category);
    };

    return (
        <div>
            <NavComponent onCategoryClick={handleCategoryClick} />
            <ProductList selectedCategory={selectedCategory} />
        </div>
    );
}

export default MainComponent;
