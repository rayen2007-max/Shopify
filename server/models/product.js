const connection = require('../db/connection');

const Product = {
    create: (product, callback) => {
        const sql = 'INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)';
        connection.query(sql, [product.name, product.price, product.description, product.image], callback);
    },
    getAll: (callback) => {
        const sql = 'SELECT * FROM products';
        connection.query(sql, callback);
    },
    update: (id, product, callback) => {
        const sql = 'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?';
        connection.query(sql, [product.name, product.price, product.description, id], callback);
    },
    delete: (id, callback) => {
        const sql = 'DELETE FROM products WHERE id = ?';
        connection.query(sql, [id], callback);
    }
};

module.exports = Product; 