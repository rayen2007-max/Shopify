const Product = require('../models/product');

exports.createProduct = (req, res) => {
    console.log('Request body:', req.body);
    Product.create(req.body, (err, result) => {
        if (err) {
            console.error('Error creating product:', err);
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ id: result.insertId, ...req.body });
    });
};

exports.getProducts = (req, res) => {
    Product.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

exports.updateProduct = (req, res) => {
    Product.update(req.params.id, req.body, (err, result) => {
        if (err) return res.status(400).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Product not found' });
        res.status(200).json({ id: req.params.id, ...req.body });
    });
};

exports.deleteProduct = (req, res) => {
    Product.delete(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Product not found' });
        res.status(204).send();
    });
}; 