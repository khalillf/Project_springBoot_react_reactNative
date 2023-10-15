import axios from 'axios';

const PRODUCT_API_BASE_URL = "http://localhost:8080/api/products"; 

class ProductService {
    getProducts() {
        return axios.get(PRODUCT_API_BASE_URL);
    }

    createProduct(product) {
        return axios.post(PRODUCT_API_BASE_URL, product);
    }

    getProductById(productId) {
        return axios.get(`${PRODUCT_API_BASE_URL}/up/${productId}`);
    }

    updateProduct(productId, productData) {
        return axios.put(`${PRODUCT_API_BASE_URL}/${productId}`, productData);
    }
    
    deleteProduct(productId) {
        return axios.delete(`${PRODUCT_API_BASE_URL}/${productId}`);
    }
}

const productService = new ProductService(); 

export default productService; 
