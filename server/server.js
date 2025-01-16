const express = require('express');
const app = express();
const PORT = 5000;
const connection = require('./db/connection');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes);

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
