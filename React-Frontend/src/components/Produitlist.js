import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductService from '../services/ProductService';
import '../styles.css';
import HeaderComponent from './Header';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
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

    useEffect(() => {
        ProductService.getProducts()
            .then((res) => {
                setProducts(res.data);
            })
            .catch((error) => console.error('Error fetching products: ', error));
    }, []);

    const deleteProduct = (id) => {
        ProductService.deleteProduct(id)
            .then(() => {
                setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
            })
            .catch((error) => console.error('Error deleting product: ', error));
    };

    
    const filterProductsByName = () => {
        return products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

   
    const filterProductsByCategory = () => {
        if (!selectedCategory) {
            return products; 
        }
        return products.filter((product) =>
            product.category.toLowerCase() === selectedCategory.toLowerCase()
        );
    };

    return (
        <div>
            <br />
            <h2 className="text-center digistyle">Product List</h2>
            <div className="row">
                <Link to="/add-product" className="btn btn-primary">
                    Add Product
                </Link>
            </div>
            <br />
            <div className="row">
              
                <input
                    type="text"
                    placeholder="Rechercher"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
              
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="search-input"
                >
                    <option value="">Select Category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <br />
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterProductsByName()
                            .filter((product) =>
                                selectedCategory
                                    ? product.category.toLowerCase() === selectedCategory.toLowerCase()
                                    : true
                            )
                            .map((product) => (
                                <tr key={product.id}>
                                    <td>{product.category}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    
                                    <td>
                                        <Link to={`/edit-product/${product.id}`} className="btn btn-info">
                                            Edit
                                        </Link>
                                        <button
                                            style={{ marginLeft: '10px' }}
                                            onClick={() => deleteProduct(product.id)}
                                            className="btn btn-info delete-button"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductList;
