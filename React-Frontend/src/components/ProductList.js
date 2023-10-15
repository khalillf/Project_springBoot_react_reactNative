import React, { useState, useEffect } from 'react';
import '../css/img.css';

function ProductList({ addToBasket, basket, openBasketPopup }) {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [productNameFilter, setProductNameFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [sousCategoryFilter, setSousCategoryFilter] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/api/products')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setFilteredProducts(data);
            })
            .catch((error) => console.error('Error fetching products: ', error));
    }, []);


    const handleFilterChange = () => {
        
        const filtered = products.filter((product) => {
            const productNameMatch =
                productNameFilter === '' || product.name.toLowerCase().includes(productNameFilter.toLowerCase());
            const categoryMatch = categoryFilter === '' || product.category === categoryFilter;
            const sousCategoryMatch = sousCategoryFilter === '' || product.sous_category === sousCategoryFilter;

            return productNameMatch && categoryMatch && sousCategoryMatch;
        });

        setFilteredProducts(filtered);
    };

    useEffect(() => {
        handleFilterChange();
    }, [productNameFilter, categoryFilter, sousCategoryFilter]);


    const categories = [
        'Mode homme',
        'Mode femme',
        'Téléphones portables',
        'Tvs',
        'Informatique',
        'Beauté & Santé',
        'Electroménager',
        'Jeux vidéos & Consoles',
        'Bébé & Enfants',
        'Sports & Fitness',
    ];

    const categorySousCategoryMap = {
        'Mode homme': ['T-shirt', 'Chemise', 'Pantalon', 'Chaussures'],
        'Mode femme': ['Robe', 'Blouse', 'Jupe', 'Chaussures'],
        'Téléphones portables': ['Smartphones', 'Accessoires', 'Tablettes'],
        'Tvs': ['LED TVs', 'Smart TVs', '4K TVs', 'Accessoires'],
        'Informatique': ['Ordinateurs portables', 'PC de bureau', 'Accessoires', 'Imprimantes','Gaming laptop'],
        'Beauté & Santé': ['Maquillage', 'Soins de la peau', 'Parfums', 'Accessoires'],
        'Electroménager': ['Réfrigérateurs', 'Lave-linge', 'Cuisinières', 'Aspirateurs'],
        'Jeux vidéos & Consoles': ['Consoles', 'Jeux', 'Accessoires', 'Manettes'],
        'Bébé & Enfants': ['Vêtements', 'Jouets', 'Poussettes', 'Accessoires'],
        'Sports & Fitness': ['Vêtements de sport', 'Équipement de fitness', 'Chaussures de sport', 'Accessoires'],
    };
    return (
        
        <div className="product-list">
            
            <div className="filters">
                <input
                    type="text"
                    placeholder="Filter by Product Name"
                    value={productNameFilter}
                    onChange={(e) => setProductNameFilter(e.target.value)}
                />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
            >
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
            <select
                value={sousCategoryFilter}
                onChange={(e) => setSousCategoryFilter(e.target.value)}
            >
                <option value="">All Sous-Categories</option>
                {categoryFilter &&
                    categorySousCategoryMap[categoryFilter].map((sousCategory) => (
                        <option key={sousCategory} value={sousCategory}>
                            {sousCategory}
                        </option>
                    ))}
            </select>
            </div>
            
            <div className="product-list">
                {filteredProducts.map((product, index) => (
                    <div key={index} className="product-frame">
                        <h3>{product.name}</h3>
                        <img
                            src={`data:image/jpeg;base64,${product.photoData}`}
                            alt={product.name}
                            className="product-image"
                        />
                        <p style={{ color: 'rgb(14 27 42)' }}>Prix : {product.price} DHs</p>

                        
                        <button
                            onClick={() => {
                                addToBasket(product);
                                openBasketPopup();
                            }}
                        >
                            Ajouter au panier
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
