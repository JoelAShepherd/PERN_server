const express = require('express')
const app = express();
const cors = require('cors');
const pool = require('./database/db');
const morgan = require('morgan')
const helmet = require('helmet')
const passport = require('passport');
const path = require('path')
require('dotenv').config();


//routes
const authRoutes = require('./routes/auth-routes');
const dashboard = require('./routes/dashboard');
const paymentRoutes = require('./routes/payment-routes');

const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))
app.use(helmet({contentSecurityPolicy: {
    useDefaults: false,
    directives: {
        defaultSrc: ["'self'", "'unsafe-inline'"],
        "script-src": ["'self'", "https://js.stripe.com/"],
        "style-src": ["'self'", "*"] 
    }
}}))



app.use(passport.initialize())
app.use(passport.session())

//ROUTES//
app.use('/auth', authRoutes);
app.use('/dashboard', dashboard);
app.use('/pay', paymentRoutes);
app.use('/public', express.static('public/images'))


if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "PERN_E-Commerce/dir")))

} else {
    app.get('/', (req, res) =>{
        res.sendFile(path.join(__dirname, '/index.html'));
    })
}

console.log("PROCESS: ", process.env.NODE_ENV)

app.get('/test', (req, res) => {
    res.send("This is a test")
})

//GET products info
app.get('/products', async(req, res) => {
    
    try{
        const allProducts = await pool.query("SELECT * FROM products");
        res.json(allProducts.rows)

    } catch(err) {
        res.status(500).send('Server error - failed to get products')
        console.log(err.message)
    }
})


app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});