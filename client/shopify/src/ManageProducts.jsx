import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ManageProducts() {
    const [products, setProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);
    const [editedProduct, setEditedProduct] = useState({ name: '', price: '', description: '' });
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleEdit = (product) => {
        setEditingProductId(product.id);
        setEditedProduct({ name: product.name, price: product.price, description: product.description });
    };

    const handleUpdate = (id) => {
        fetch(`http://localhost:5000/api/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedProduct),
        })
        .then(() => {
            setProducts(products.map(product => (product.id === id ? { ...product, ...editedProduct } : product)));
            setEditingProductId(null);
            console.log('Product updated');
        })
        .catch(error => console.error('Error updating product:', error));
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/api/products/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            setProducts(products.filter(product => product.id !== id));
            console.log('Product deleted');
        })
        .catch(error => console.error('Error deleting product:', error));
    };

    return (
        <div className="manage-products">
            <h2>Manage Products</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>
                                {editingProductId === product.id ? (
                                    <input 
                                        type="text" 
                                        value={editedProduct.name} 
                                        onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })} 
                                    />
                                ) : (
                                    product.name
                                )}
                            </td>
                            <td>
                                {editingProductId === product.id ? (
                                    <input 
                                        type="number" 
                                        value={editedProduct.price} 
                                        onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })} 
                                    />
                                ) : (
                                    `$${product.price}`
                                )}
                            </td>
                            <td>
                                {editingProductId === product.id ? (
                                    <textarea 
                                        value={editedProduct.description} 
                                        onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })} 
                                    />
                                ) : (
                                    product.description
                                )}
                            </td>
                            <td>
                                {editingProductId === product.id ? (
                                    <button onClick={() => handleUpdate(product.id)}>Save</button>
                                ) : (
                                    <>
                                        <button onClick={() => handleEdit(product)}>Edit</button>
                                        <button onClick={() => handleDelete(product.id)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/add-product">Add New Product</Link>
        </div>
    );
}

export default ManageProducts; 