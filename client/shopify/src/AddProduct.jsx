import { useState } from 'react';

function AddProduct({ onProductAdded }) {
    const [product, setProduct] = useState({ name: '', price: '', description: '', image: '' });
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProduct({ ...product, image: file });
        }
    };

    const uploadImage = () => {
        const data = new FormData();
        data.append("file", product.image);
        data.append("upload_preset", "ignmh24s");
        data.append("cloud_name", "dfbrjaxu7");

        return fetch("https://api.cloudinary.com/v1_1/dfbrjaxu7/image/upload", {
            method: "post",
            body: data
        })
        .then(resp => resp.json())
        .then(data => data.url)
        .catch(err => {
            console.log(err);
            throw err;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        uploadImage()
            .then(imageUrl => {
                const newProduct = { ...product, image: imageUrl };
                return fetch('http://localhost:5000/api/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newProduct),
                });
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to add product');
                }
            })
            .then(data => {
                console.log('Product added:', data);
                setSuccessMessage('Product added successfully!');
                setProduct({ name: '', price: '', description: '', image: '' });
                if (onProductAdded) {
                    onProductAdded();
                }
            })
            .catch(error => console.error('Error adding product:', error));
    };

    return (
        <div className="add-product-form">
            <h2>Add New Product</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required />
                <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} required />
                <input type="file" name="image" accept="image/*" onChange={handleImageChange} required />
                <button type="submit" className="button">Add Product</button>
            </form>
        </div>
    );
}

export default AddProduct;