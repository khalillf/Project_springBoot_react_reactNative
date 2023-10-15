import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductService from '../services/ProductService';
import '../css/AddProductComponent.css';

function UpdateProductComponent() {
    const { id } = useParams();

    const [productData, setProductData] = useState({
        name: '',
        price: '',
        quantity: '',
        category: '',
        sous_category: '',
        description: '',
        photoData: '',
    });

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

    const [searchName, setSearchName] = useState(''); 
    const [searchedProduct, setSearchedProduct] = useState(null);

    useEffect(() => {
        if (id) {
            fetchProductData(id);
        }
    }, [id]);

    const fetchProductData = (productId) => {
        ProductService.getProductById(productId)
            .then((response) => {
                const data = response.data;
                setProductData(data);
            })
            .catch((error) => {
                if (error.response) {
                                        console.error('Server Error:', error.response.data);
                    alert('Server Error: ' + error.response.data);
                } else if (error.request) {
                                        console.error('No Response from Server:', error.request);
                    alert('No Response from Server');
                } else {
                                        console.error('Error:', error.message);
                    alert('Error: ' + error.message);
                }
            });
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const base64Image = event.target.result.split(',')[1];
                setProductData({
                    ...productData,
                    photoData: base64Image,
                });
            };

            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
                        const response = await ProductService.updateProduct(id, productData);
            console.log('Product updated:', response.data);
            alert('Product updated successfully!');
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Error updating product!');
        }
    };
    

    return (
        <div>
            <br />
            <div className="update-product-container">
                <h2>Edit Product</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Product Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Product Name"
                            value={productData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            placeholder="Price"
                            value={productData.price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            placeholder="Quantity"
                            value={productData.quantity}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Description"
                            value={productData.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="category">Category:</label>
                        <select
                            id="category"
                            name="category"
                            value={productData.category}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    {productData.category && (
                        <div>
                            <label htmlFor="sous_category">Sous Category:</label>
                            <select
                                id="sous_category"
                                name="sous_category"
                                value={productData.sous_category}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Sous Category</option>
                                {categorySousCategoryMap[productData.category].map((sousCategory, index) => (
                                    <option key={index} value={sousCategory}>
                                        {sousCategory}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <div>
                        <label htmlFor="photoData">Product Photo:</label>
                        <input
                            type="file"
                            id="photoData"
                            name="photoData"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    {productData.photoData && (
                        <div>
                            <img
                                src={`data:image/jpeg;base64,${productData.photoData}`}
                                alt="Product"
                                style={{ maxWidth: '100px', maxHeight: '100px' }}
                            />
                        </div>
                    )}
                    <button type="submit">Save Changes</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateProductComponent;