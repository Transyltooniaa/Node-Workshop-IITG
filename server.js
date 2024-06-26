const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

let products = [];

app.get('/', (req, res) => {
    res.render('index', { products });
});

app.post('/add-product', (req, res) => {
    const { name, price } = req.body;
    if (name && price && !isNaN(price)) {
        if (!products.some(product => product.name === name.toLowerCase()))
            products.push({ name:name.toLowerCase() , price: parseFloat(price).toFixed(2) });
    }
    res.redirect('/');
});

app.post('/delete-product/:index', (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < products.length) {
        products.splice(index, 1);
    }
    res.redirect('/');
});


app.use((req, res) => {
    res.status(404).render('error', { message: 'Page Not Found' });
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
