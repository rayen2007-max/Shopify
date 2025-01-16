// App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import { FaShoppingCart } from 'react-icons/fa';
import AddProduct from './AddProduct';
import ManageProducts from './ManageProducts';
import Cart from './Cart';

function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const fetchProducts = () => {
        fetch('http://localhost:5000/api/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Router>
            <div>
                <nav className="navbar">
                    <h1 className="shop-title">
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <FaShoppingCart style={{ marginRight: '8px' }} /> Shopify
                        </Link>
                    </h1>
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="search-input" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Link to="/add-product" className="button">Add Product</Link>
                    <Link to="/manage-products" className="button">Manage Products</Link>
                    <Link to="/cart" className="cart-icon"><FaShoppingCart /></Link>
                </nav>
             
                <main className="product-list">
                    <Routes>
                        <Route path="/add-product" element={<AddProduct onProductAdded={fetchProducts} />} />
                        <Route path="/manage-products" element={<ManageProducts />} />
                        <Route path="/cart" element={<Cart cartItems={cart} />} />
                        <Route path="/" element={
                            <>
                                <h2>Featured Products</h2>
                                <div className="products">
                                    {filteredProducts.map(product => (
                                        <div key={product.id} className="product-card">
                                            <h3>{product.name}</h3>
                                            <p>Price: ${product.price}</p>
                                            <p>{product.description}</p>
                                            <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto' }} />
                                            <button className="button" onClick={() => addToCart(product)}>Add to Cart</button>
                                        </div>
                                    ))}
                                </div>
                            </>
                        } />
                    </Routes>
                </main>
                <footer className="footer">
                    <p>By Rayen 2025</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;