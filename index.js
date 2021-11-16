const express = require('express')
const app = express();
const cors = require('cors');
const pool = require('./database/db');
const morgan = require('morgan')
const helmet = require('helmet')
const passport = require('passport');
const cookieSession = require('cookie-session')
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
app.use(helmet())



app.use(passport.initialize())
app.use(passport.session())

//ROUTES//
app.use('/auth', authRoutes);
app.use('/dashboard', dashboard);
app.use('/pay', paymentRoutes);
app.use('/public', express.static('public/images'))


//GET products info
app.get('/products', async(req, res) => {
    
    try{
        const allProducts = await pool.query("SELECT * FROM products");
        res.json(allProducts.rows)

    } catch(err) {
        res.status(500).send('Server error')
        console.log(err.message)
    }
})


app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});