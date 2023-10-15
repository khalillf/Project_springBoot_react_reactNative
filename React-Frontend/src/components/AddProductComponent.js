import React, { useState } from 'react';
import HeaderComponent from './Header';
import '../css/AddProductComponent.css';

function AddProductComponent() {
    const [productData, setProductData] = useState({
        name: '',
        price: '',
        quantity: '',
        category: '',
        sous_category: '',
        description: '',
        photoData: '', 
    });

    const [selectedFile, setSelectedFile] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

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
    

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        const reader = new FileReader();

        reader.onload = (event) => {
            const base64Image = event.target.result;
            console.log("base64Image :: "); 
            console.log(base64Image); 
            setProductData({
                ...productData,
                photoData: base64Image, 
            });
        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const productDataWithoutPrefix = {
                ...productData,
                photoData: productData.photoData.split(',')[1],
            };
    
            const response = await fetch('http://localhost:8080/api/products', {
                method: 'POST',
                body: JSON.stringify(productDataWithoutPrefix),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            alert('Product added successfully!');
        } catch (error) {
            console.error('Error adding product:', error);
    
            
            alert('Error adding product. Please try again later.');
        }
    };
    
    

    return (
        <div>
            <br/>
            <div className="update-product-container">
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div className='mt-10 '>
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
                        <label htmlFor="photo">Product Photo:</label>
                        <input
                            type="file"
                            id="photo"
                            name="photo"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                        />
                    </div>
                    {productData.photoData && (
                        <div>
                            <img
                                src={productData.photoData}
                                alt="Product"
                                style={{ maxWidth: '100px', maxHeight: '100px' }}
                            />
                        </div>
                    )}

                    <button type="submit">Add Product</button>
                </form>
            </div>
        </div>
    );
}

export default AddProductComponent;
